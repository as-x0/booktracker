import type {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch
} from "react-hook-form";

import type { WishlistFormData } from "../../../forms/WishlistForm/WishlistForm";

import TextInput from "../../common/TextInput";
import SelectInput from "../../common/SelectInput";

import useAvailability from "../../../hooks/useAvailability";

import "./WishlistInfoSection.css";

interface WishlistInfoSectionProps {
    register: UseFormRegister<WishlistFormData>;
    watch: UseFormWatch<WishlistFormData>;
    setValue: UseFormSetValue<WishlistFormData>;
}

export default function WishlistInfoSection({
                                                register,
                                                watch,
                                                setValue
                                            }: WishlistInfoSectionProps) {
    const availability = useAvailability();

    return (
        <section className="wishlist-info-section">
            <h3>Wishlist Information</h3>

            <div className="wishlist-info-grid">
                <SelectInput
                    label="Availability"
                    options={availability}
                    value={watch("availabilityId")}
                    onChange={(value)=>
                        setValue(
                            "availabilityId",
                            value
                        )
                    }
                />

                <TextInput
                    label="Recommended by"
                    {...register(
                        "recommendedBy"
                    )}
                />

                <TextInput
                    label="Notes"
                    {...register(
                        "notes"
                    )}
                />
            </div>
        </section>
    );
}