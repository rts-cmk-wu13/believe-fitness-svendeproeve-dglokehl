"use client"

import { authLogout } from "@/app/api/actions"

type LogoutButtonProps = {
    className?: string;
}

export default function LogoutButton({ className }: LogoutButtonProps) {
    return (
        <button className={className ? className : ""} onClick={async () => authLogout()}>
            Log Out
        </button>
    )
}