"use client"

import { setSplashSession } from "@/app/api/actions"

type SplashSessionButtonProps = {
    className?: string;
}

export default function SplashSessionButton({ className }: SplashSessionButtonProps) {
    return (
        <button className={`button-app-default px-7 animate-fadein ${className ? className : ""}`} onClick={async () => setSplashSession()}>
            Start Training
        </button>
    )
}