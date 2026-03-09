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

    const iconStyle = "size-6 text-app-grey-medium hover-75"

    return (
        <>
            {!open && <LuAlignRight className={iconStyle} onClick={handleMenu} />}

            {open && (
                <nav className="flex justify-center items-center fixed inset-0 z-9999 bg-app-bg text-app-black overflow-scroll">
                    <LuX className={`${iconStyle} absolute z-99999 top-default right-default`} onClick={handleMenu} />

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
        </>
    )
}