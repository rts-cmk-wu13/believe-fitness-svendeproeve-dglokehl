"use client"

import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import type { FitnessClass } from "@/app/api/types";
import { addUserRating } from "@/app/api/actions";

type RatingFormProps = {
    fitnessClass: FitnessClass;
    userRating?: number;
    className?: string;
}

export default function RatingForm({ fitnessClass, userRating, className }: RatingFormProps) {
    const [currentRating, setCurrentRating] = useState(userRating ? userRating : 0);

    return (
        <div
            className="mx-12 py-6 px-8 space-y-6 absolute z-9999992 bg-app-white text-app-black text-center rounded-[18px]"
        >
            <p className="text-sm font-semibold">Rate the {fitnessClass.className} class</p>

            <div className="space-y-3">
                <div className="flex flex-row-reverse justify-center items-center group">
                    {[5,4,3,2,1].map((item) => (
                        <FaStar
                            className={`size-8 text-app-grey-light group-hover:text-app-grey-light ${item <= currentRating && "text-app-yellow"} peer peer-hover:text-app-yellow hover:text-app-yellow hover-none`}
                            onClick={() => setCurrentRating(item)}
                            data-star={item}
                            key={item}
                        />
                    ))}
                </div>
                <p className="text-xs font-medium">Your rating: {currentRating}</p>
            </div>

            <button className="button-app-default w-full" onClick={async () => addUserRating(fitnessClass.id, currentRating)}>Save Rating</button>
        </div>
    )
}