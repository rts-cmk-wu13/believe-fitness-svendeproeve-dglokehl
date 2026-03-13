import Logo from "@/components/blocks/Logo"
import Main from "@/components/layout/Main"
import LoginForm from "@/components/forms/LoginForm"

export const metadata = {
    title: "Log in"
}

export default async function LoginPage() {
    return (
        <Main className="mt-default! space-y-12">
            <Logo className="px-0!" />
            <section className="space-y-5">
                <h2 className="text-lg font-semibold">Log in with your credentials</h2>
                <LoginForm />
            </section>
        </Main>
    )
}