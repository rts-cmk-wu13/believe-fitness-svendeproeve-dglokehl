import { getToken } from "@/utils/cookies";
import BackArrow from "../buttons/BackArrow";
import BurgerMenuButton from "../buttons/BurgerMenuButton";

type HeaderProps = {
    title?: string;
    className?: string;
}

export default async function Header({ title, className }: HeaderProps) {
    const token = await getToken()

    return (
        <header className={`wrapper-default px-default h-header flex justify-between items-center gap-4 fixed top-0 inset-x-0 z-9999 pointer-events-none *:pointer-events-auto ${className ? className : ""}`}>
            <div className="flex items-center gap-6">
                <BackArrow />
                {title && <p className="text-2xl">{title}</p>}
            </div>
            <BurgerMenuButton isLoggedIn={token ? true : false}/>
        </header>
    )
}