"use client"

import Link from "next/link"
import type { UserRole } from "@/app/api/types"
import { addUserToClass, removeUserFromClass } from "@/app/api/actions"

type SignupButtonProps = {
    isSignedUp?: boolean;
    userRole: UserRole;
    classId: number;
    className?: string;
}

export default function SignupButton({ isSignedUp, userRole, classId, className }: SignupButtonProps) {
    return (
        <>
            {userRole === "default" && (
                <button className={className && className} onClick={async () => !isSignedUp ? addUserToClass(classId) : removeUserFromClass(classId)}>
                    {!isSignedUp ? "Sign Up" : "Leave"}
                </button>
            )}

            {userRole === "admin" && (
                <Link href={`/classes/${classId}/participants`} className={className && className}>Participants</Link>
            )}
        </>
    )
}