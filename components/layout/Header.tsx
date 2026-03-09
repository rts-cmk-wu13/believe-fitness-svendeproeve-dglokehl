import { getToken } from "@/utils/cookies";
import HeaderBack from "./HeaderBack";
import BurgerMenu from "./BurgerMenu";

type HeaderProps = {
    className?: string;
}

export default async function Header({ className }: HeaderProps) {
    const token = await getToken()
    return (
        <header className={`px-default h-header flex justify-between items-center gap-4 fixed top-0 inset-x-0 z-99999 ${className ? className : ""}`}>
            <HeaderBack />
            <BurgerMenu isLoggedIn={token ? true : false} />
        </header>
    )
}