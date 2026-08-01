import { useState } from "react";
import {useForm, type UseFormRegister, type UseFormSetValue, type UseFormWatch} from "react-hook-form";

import Button from "../../components/common/Button";
import BookInfoSection from "../../components/forms/BookInfoSection/BookInfoSection";

import { saveWishlist } from "../../services/saveWishlist";

import type { BookFormData } from "../../types/BookFormData.ts";

import "./WishlistForm.css";

export interface WishlistFormData extends BookFormData{
    availabilityId: string;
    recommendedBy: string;
    notes: string;
}

export default function WishlistForm() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset
    } = useForm<WishlistFormData>({
        shouldUnregister: false
    });

    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    async function onSubmit(
        data: WishlistFormData
    ) {

        console.log(
            "WISHLIST DATA:",
            data
        );

        try {
            const wishlistId =
                await saveWishlist(data);
            console.log(
                "Wishlist created:",
                wishlistId
            );
            setMessage({
                type:"success",
                text:"Book added to wishlist"
            });
            reset();
        }
        catch(error){
            console.error(error);
            setMessage({
                type:"error",
                text:"Error while saving book"
            });
        }
    }

    return (
        <form
            className="wishlist-form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2>New Book</h2>

            <BookInfoSection
                register={register as unknown as UseFormRegister<BookFormData>}
                watch={watch as unknown as UseFormWatch<BookFormData>}
                setValue={setValue as unknown as UseFormSetValue<BookFormData>}
            />

            {
                message && (
                    <p className={`form-message ${message.type}`}>
                        {message.text}
                    </p>
                )
            }

            <Button type="submit">
                Save
            </Button>

        </form>
    );
}