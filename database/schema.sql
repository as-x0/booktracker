```sql
--------------------------------------------------------------------------------
-- CREATE TABLES
--------------------------------------------------------------------------------

create table countries (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    latitude numeric,
    longitude numeric
);

create table languages (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    code text not null unique
);

create table genres (
    id uuid primary key default gen_random_uuid(),
    name text not null unique
);

create table reading_status (
    id uuid primary key default gen_random_uuid(),
    name text not null unique
);

create table availability (
    id uuid primary key default gen_random_uuid(),
    name text not null unique
);

create table series (
    id uuid primary key default gen_random_uuid(),
    name text not null unique
);

create table authors (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    birth_country_id uuid,
    constraint fk_birth_country
        foreign key (birth_country_id)
            references countries(id)
);

create table books (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    author_id uuid not null,
    genre_id uuid,
    publication_year integer,
    original_language_id uuid,
    series_id uuid,
    series_number integer,
    themes text,

    constraint fk_author
        foreign key (author_id)
            references authors(id),

    constraint fk_genre
        foreign key (genre_id)
            references genres(id),

    constraint fk_original_language
        foreign key (original_language_id)
            references languages(id),

    constraint fk_series
        foreign key (series_id)
            references series(id)
);

create table readings (
    id uuid primary key default gen_random_uuid(),
    book_id uuid not null,
    status_id uuid not null,
    reading_language_id uuid,
    cover_url text,
    pages_tot integer,
    pages_read integer,
    start_date date,
    finish_date date,
    rating numeric,
    review text,
    characters text,
    dnf_reason text,

    constraint fk_book
        foreign key (book_id)
            references books(id),

    constraint fk_status
        foreign key (status_id)
            references reading_status(id),

    constraint fk_reading_language
        foreign key (reading_language_id)
            references languages(id)
);

create table quotes (
    id uuid primary key default gen_random_uuid(),
    reading_id uuid not null,
    text text not null,
    page integer,
    notes text,

    constraint fk_quote_reading
        foreign key (reading_id)
            references readings(id)
            on delete cascade
);

create table wishlist (
    id uuid primary key default gen_random_uuid(),
    book_id uuid not null,
    recommended_by text,
    availability_id uuid,
    notes text,

    constraint fk_wishlist_book
        foreign key (book_id)
            references books(id),

    constraint fk_availability
        foreign key (availability_id)
            references availability(id)
);

create table monthly_goals (
    id uuid primary key default gen_random_uuid(),
    month text not null,
    title text not null default '',
    author text not null default '',
    completed boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


--------------------------------------------------------------------------------
-- ROW LEVEL SECURITY
--------------------------------------------------------------------------------

alter table countries enable row level security;
alter table languages enable row level security;
alter table genres enable row level security;
alter table reading_status enable row level security;
alter table availability enable row level security;
alter table series enable row level security;
alter table authors enable row level security;
alter table books enable row level security;
alter table readings enable row level security;
alter table quotes enable row level security;
alter table wishlist enable row level security;
alter table monthly_goals enable row level security;


--------------------------------------------------------------------------------
-- INSERT DATAS
--------------------------------------------------------------------------------

insert into genres (name)
values
    ('Adventure'),
    ('Bildungsroman'),
    ('Biography / Diary'),
    ('Crime / Thriller'),
    ('Dystopia / Sci-fi'),
    ('Essay'),
    ('Fantasy'),
    ('Historical'),
    ('Non-fiction'),
    ('Poetry'),
    ('Romance'),
    ('Short stories'),
    ('Theatre'),
    ('Others');

insert into reading_status (name)
values
    ('Read'),
    ('Re-read'),
    ('DNF'),
    ('Currently reading');

insert into availability (name)
values
    ('Shelved'),
    ('Library');

insert into languages (name, code)
values
    ('Italian', 'it'),
    ('English', 'en'),
    ('German', 'de'),
    ('French', 'fr'),
    ('Spanish', 'es'),
    ('Other', 'other');


--------------------------------------------------------------------------------
-- POLICIES
--------------------------------------------------------------------------------

create policy "Allow all countries"
on countries
for all
using (true)
with check (true);

create policy "Allow all languages"
on languages
for all
using (true)
with check (true);

create policy "Allow all genres"
on genres
for all
using (true)
with check (true);

create policy "Allow all statuses"
on reading_status
for all
using (true)
with check (true);

create policy "Allow all availability"
on availability
for all
using (true)
with check (true);

create policy "Allow all series"
on series
for all
using (true)
with check (true);

create policy "Allow all authors"
on authors
for all
using (true)
with check (true);

create policy "Allow all books"
on books
for all
using (true)
with check (true);

create policy "Allow all readings"
on readings
for all
using (true)
with check (true);

create policy "Allow all quotes"
on quotes
for all
using (true)
with check (true);

create policy "Allow all wishlist"
on wishlist
for all
using (true)
with check (true);

create policy "Allow read monthly goals"
on monthly_goals
for select
using (true);

create policy "Allow insert monthly goals"
on monthly_goals
for insert
with check (true);

create policy "Allow update monthly goals"
on monthly_goals
for update
using (true)
with check (true);

create policy "Allow delete monthly goals"
on monthly_goals
for delete
using (true);


--------------------------------------------------------------------------------
-- DATA API GRANTS
--
-- Required for tables created after the Supabase Data API grant change.
-- RLS policies above still determine which rows can actually be accessed.
--------------------------------------------------------------------------------

grant select, insert, update, delete
on table countries
to anon, authenticated;

grant select, insert, update, delete
on table languages
to anon, authenticated;

grant select, insert, update, delete
on table genres
to anon, authenticated;

grant select, insert, update, delete
on table reading_status
to anon, authenticated;

grant select, insert, update, delete
on table availability
to anon, authenticated;

grant select, insert, update, delete
on table series
to anon, authenticated;

grant select, insert, update, delete
on table authors
to anon, authenticated;

grant select, insert, update, delete
on table books
to anon, authenticated;

grant select, insert, update, delete
on table readings
to anon, authenticated;

grant select, insert, update, delete
on table quotes
to anon, authenticated;

grant select, insert, update, delete
on table wishlist
to anon, authenticated;

grant select, insert, update, delete
on table monthly_goals
to anon, authenticated;


--------------------------------------------------------------------------------
-- SERVICE ROLE GRANTS
--------------------------------------------------------------------------------

grant select, insert, update, delete
on table countries
to service_role;

grant select, insert, update, delete
on table languages
to service_role;

grant select, insert, update, delete
on table genres
to service_role;

grant select, insert, update, delete
on table reading_status
to service_role;

grant select, insert, update, delete
on table availability
to service_role;

grant select, insert, update, delete
on table series
to service_role;

grant select, insert, update, delete
on table authors
to service_role;

grant select, insert, update, delete
on table books
to service_role;

grant select, insert, update, delete
on table readings
to service_role;

grant select, insert, update, delete
on table quotes
to service_role;

grant select, insert, update, delete
on table wishlist
to service_role;

grant select, insert, update, delete
on table monthly_goals
to service_role;
```
