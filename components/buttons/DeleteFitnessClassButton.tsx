"use client"

import { deleteFitnessClass } from "@/app/api/actions"

type DeleteFitnessClassButtonProps = {
    classId: string;
    className?: string;
}

export default function DeleteFitnessClassButton({ classId, className }: DeleteFitnessClassButtonProps) {
    return (
        <button className={`button-app-default ${className ? className : ""}`} onClick={async () => deleteFitnessClass(classId)}>
            Delete
        </button>
    )
}