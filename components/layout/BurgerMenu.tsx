"use client"

import { useState } from "react";
import Link from "next/link";
import { LuAlignRight, LuX } from "react-icons/lu";
import LogoutButton from "../buttons/LogoutButton";

type BurgerMenuProps = {
    isLoggedIn?: boolean;
    className?: string;
}

const menuItems = [
    {
        href: "/",
        body: "Home",
    },
    {
        href: "/classes",
        body: "Popular Classes",
    },
    {
        href: "/search",
        body: "Search",
    }
]

export default function BurgerMenu({ isLoggedIn, className }: BurgerMenuProps) {
    const [open, setOpen] = useState(false);

    const handleMenu = () => {
        setOpen(!open)
    }

    const iconStyle = "size-6 text-app-grey-medium hover-none hover:text-app-black"

    return (
        <>
            {!open && <LuAlignRight className={iconStyle} onClick={handleMenu} />}

            {open && (
                <nav className="flex justify-center items-center fixed inset-0 z-9999 bg-app-bg text-app-black overflow-scroll">
                    <LuX className={`${iconStyle} absolute z-99999 top-default right-default`} onClick={handleMenu} />

                    <menu className="flex flex-col items-center gap-12 text-2xl text-center *:*:hover-75">
                        {menuItems.map((item, i: number) => (
                            <li key={i}>
                                <Link href={item.href}>
                                    {item.body}
                                </Link>
                            </li>
                        ))}
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <Link href="/profile">My Profile</Link>
                                </li>
                                <li>
                                    <LogoutButton />
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link href="/login">Log in</Link>
                            </li>
                        )}
                    </menu>
                </nav>
            )}
        </>
    )
}