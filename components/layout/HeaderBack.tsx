"use client"

import { usePathname, useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";

type HeaderBackProps = {
    className?: string;
}

export default function HeaderBack({ className }: HeaderBackProps) {
    const pathname = usePathname()
    const pathnameArr = pathname.split("/")
    const router = useRouter()

    return (
        <figure className={`${className ? className : ""}`}>
            {(pathnameArr.length > 2 || pathnameArr[1] === "search") && <IoChevronBackOutline onClick={() => router.back()} />}
        </figure>
    )
}