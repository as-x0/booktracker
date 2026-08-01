import { useEffect, useState } from "react";

import { getAvailability } from "../services/availabilityService";

import type { Availability } from "../types/Availability";

export default function useAvailability(){
    const [availability, setAvailability] =
        useState<Availability[]>([]);

    useEffect(()=>{

        getAvailability()
            .then(setAvailability)
            .catch(console.error);

    },[]);

    return availability;
}