import { supabase } from "../supabase/client";


export async function getGenres() {

    const { data, error } = await supabase
        .from("genres")
        .select("*");


    if (error) {
        throw error;
    }


    return data;
}