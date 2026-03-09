import Button from "./Button"
import { getToken } from "@/utils/cookies";

type LoginLogoutButtonProps = {
    className?: string;
}

export default async function LoginLogoutButton({ className }: LoginLogoutButtonProps) {
    const token = await getToken()

    return (
        <Button href={!token ? "/login" : "/logout"} className={`${className ? className : ""}`}>
            {!token ? "Log In" : "Log Out"}
        </Button>
    )
}