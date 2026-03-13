"use client"

import { usePathname, useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";

type BackArrowProps = {
    className?: string;
}

export default function BackArrow({ className }: BackArrowProps) {
    const pathname = usePathname()
    const pathnameArr = pathname.split("/")
    const router = useRouter()

    return (
        <>
            {(pathnameArr.length > 2 || pathnameArr[1] === "search") && (
                <LuArrowLeft className={`size-6 text-app-grey-medium hover-none hover:text-app-black ${className ? className : ""}`} onClick={() => router.back()} />
            )}
        </>
    )
}