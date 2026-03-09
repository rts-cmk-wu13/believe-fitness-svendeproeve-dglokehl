"use client"

import { useState } from "react";
import Link from "next/link";
import { LuAlignRight, LuX } from "react-icons/lu";

type BurgerMenuProps = {
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
    },
    {
        href: "/profile",
        body: "My Profile",
    },
    {
        href: "/auth/signout",
        body: "Log Out",
    },
]

export default function BurgerMenu({ className }: BurgerMenuProps) {
    const [open, setOpen] = useState(false);

    const handleMenu = () => {
        setOpen(!open)
    }
    return (
        <figure className={`*:first:size-6 *:first:hover-75 text-app-grey-medium ${className ? className : ""}`}>
            {!open ? <LuAlignRight onClick={handleMenu} /> : <LuX onClick={handleMenu} />}

            {open && (
                <nav className="pt-20 flex justify-center fixed inset-0 top-header z-9999 bg-app-bg text-app-black overflow-scroll">
                    <menu className="flex flex-col items-center gap-12">
                        {menuItems.map((item, i: number) => (
                            <li key={i}>
                                <Link href={item.href} className="text-2xl text-center hover-75">
                                    {item.body}
                                </Link>
                            </li>
                        ))}
                    </menu>
                </nav>
            )}
        </figure>
    )
}