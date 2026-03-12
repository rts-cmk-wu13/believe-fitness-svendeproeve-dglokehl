import Link from "next/link";
import LogoutButton from "../buttons/LogoutButton";

type BurgerMenuProps = {
    isLoggedIn?: boolean;
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

export default function BurgerMenu({ isLoggedIn }: BurgerMenuProps) {
    return (
        <nav className="flex justify-center items-center fixed inset-0 z-9999 bg-app-bg text-app-black">
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
    )
}