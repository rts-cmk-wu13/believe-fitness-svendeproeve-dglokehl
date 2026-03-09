import Logo from "@/components/branding/Logo"
import Main from "@/components/layout/Main"
import LoginForm from "@/components/forms/LoginForm"

export default async function LoginPage() {
    return (
        <>
            <Logo className="mb-12 pt-10" />
            <Main className="space-y-5">
                <h2 className="text-lg font-semibold">Log in with your credentials</h2>
                <LoginForm />
            </Main>
        </>
    )
}