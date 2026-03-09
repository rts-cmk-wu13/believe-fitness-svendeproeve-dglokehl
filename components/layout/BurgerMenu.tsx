"use client"

import { useState } from "react";
import Link from "next/link";
import { getMenuItems } from "@/utils/helpers";
import { LuAlignRight, LuX } from "react-icons/lu";

type BurgerMenuProps = {
    isLoggedIn?: boolean;
    className?: string;
}

export default function BurgerMenu({ isLoggedIn, className }: BurgerMenuProps) {
    const [open, setOpen] = useState(false);

    const handleMenu = () => {
        setOpen(!open)
    }

    const menuItems = getMenuItems(isLoggedIn)

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