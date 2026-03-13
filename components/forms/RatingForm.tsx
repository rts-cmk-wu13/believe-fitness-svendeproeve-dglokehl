"use client"

import { useState, useActionState } from "react";
import Form from "next/form";
import { FaStar } from "react-icons/fa6";
import type { FitnessClass, FormState } from "@/app/api/types";
import { addUserRating } from "@/app/api/actions";

type RatingFormProps = {
    fitnessClass: FitnessClass;
    userRating?: number;
    className?: string;
}

export default function RatingForm({ fitnessClass, userRating, className }: RatingFormProps) {
    const [currentRating, setCurrentRating] = useState(userRating ? userRating : 0);

    const initialState: FormState = {
        message: "",
        errors: ""
    }

    const [state, formAction, pending] = useActionState(addUserRating, initialState)
    console.log("state:", state)

    return (
        <Form
            action={formAction}
            noValidate
            className="mx-12 py-6 px-8 space-y-3 absolute z-9999992 bg-app-white text-app-black text-center rounded-[18px]"
        >
            <p className="text-sm font-semibold">Rate the {fitnessClass.className} class</p>

            <div>
                <div className="flex flex-col items-center gap-3">
                    <div className="w-fit flex flex-row-reverse justify-center items-center group">
                        {[5,4,3,2,1].map((item) => (
                            <FaStar
                                className={`px-1 size-10 text-app-grey-light group-hover:text-app-grey-light ${item <= currentRating && "text-app-yellow"} peer peer-hover:text-app-yellow hover:text-app-yellow hover-none`}
                                onClick={() => setCurrentRating(item)}
                                data-star={item}
                                key={item}
                            />
                        ))}
                    </div>
                    <p className="text-xs font-medium">Your rating: {currentRating}</p>
                </div>
                <div>
                    <input type="hidden" name="classId" id="classId" value={fitnessClass.id} />
                    <input type="hidden" name="rating" id="rating" value={currentRating} />
                    {state.message && <p className={`mt-3 text-xs font-medium text-center ${state.errors ? "text-red-400" : "text-green-400"}`}>{state.message}</p>}
                </div>
            </div>

            <button disabled={pending} className="button-app-default w-full">Save Rating</button>
        </Form>
    )
}