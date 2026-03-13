"use client"

import { useState } from "react"
import type { FitnessClass } from "@/app/api/types";
import RatingForm from "../forms/RatingForm";

type RateButtonProps = {
    fitnessClass: FitnessClass;
    userRating?: number;
    className?: string;
}

export default function RateButton({ fitnessClass, userRating, className }: RateButtonProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <>
            <button
                className={`button-app-transparent px-10 ${className ? className : ""}`}
                onClick={handleOpen}
            >
                Rate
            </button>

            {open && (
                <div className="size-full flex justify-center items-center fixed inset-0 z-999999">
                    <RatingForm fitnessClass={fitnessClass} userRating={userRating} />
                    <div className="size-full relative z-9999991 bg-black/70" onClick={handleOpen}></div>
                </div>
            )}
        </>
    )
}