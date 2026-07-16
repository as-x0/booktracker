import {supabase} from "../supabase/client.ts";
import type {Status} from "../types/Status.ts";

export async function getStatuses(): Promise<Status[]> {
    const {data, error} = await supabase
        .from("reading_status")
        .select("*");

    if(error){
        throw error;
    }

    return data ?? [];
}