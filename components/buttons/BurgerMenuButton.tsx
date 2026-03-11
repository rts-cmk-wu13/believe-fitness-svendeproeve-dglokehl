"use client"

import { useState } from "react";
import { LuAlignRight, LuX } from "react-icons/lu";
import BurgerMenu from "../layout/BurgerMenu";

type BurgerMenuButtonProps = {
    isLoggedIn?: boolean;
    className?: string;
}

export default function BurgerMenuButton({ isLoggedIn, className }: BurgerMenuButtonProps) {
    const [open, setOpen] = useState(false);

    const handleMenu = () => {
        setOpen(!open)
    }

    const buttonStyle = `size-6 text-app-grey-medium hover-none hover:text-app-black ${className ? className : ""}`

    return (
        <div>
            {!open ? (
                <LuAlignRight className={buttonStyle} onClick={handleMenu} />
            ) : (
                <>
                    <LuX className={`${buttonStyle} fixed z-99999 top-default right-default`} onClick={handleMenu} />
                    <BurgerMenu isLoggedIn={isLoggedIn}/>
                </>
            )}
        </div>
    )
}