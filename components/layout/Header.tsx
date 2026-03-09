"use client"

import { usePathname, useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import BurgerMenu from "./BurgerMenu";

type HeaderProps = {
    className?: string;
}

export default function Header({ className }: HeaderProps) {
    const pathname = usePathname()
    const pathnameArr = pathname.split("/")
    const router = useRouter()

    return (
        <header className={`px-default h-header flex justify-between items-center gap-4 fixed top-0 inset-x-0 z-99999 ${className ? className : ""}`}>
            <div>
                {(pathnameArr.length > 2 || pathnameArr[1] === "search") && <IoChevronBackOutline onClick={() => router.back()} />}
            </div>
            <BurgerMenu />
        </header>
    )
}