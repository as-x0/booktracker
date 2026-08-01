import { supabase } from "../supabase/client";

import type { Availability } from "../types/Availability";

export async function getAvailability()
    : Promise<Availability[]> {

    const {data, error} =
        await supabase
            .from("availability")
            .select("*")
            .order("name");

    if(error){
        throw error;
    }

    return data;
}