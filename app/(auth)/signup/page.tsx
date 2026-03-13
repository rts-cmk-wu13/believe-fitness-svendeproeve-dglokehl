import Logo from "@/components/blocks/Logo"
import Main from "@/components/layout/Main"
import SignupForm from "@/components/forms/SignupForm"

export const metadata = {
    title: "Sign up"
}

export default async function SignupPage() {
    return (
        <Main className="mt-default! space-y-12">
            <Logo className="px-0!" />
            <section className="space-y-5">
                <h2 className="text-lg font-semibold">Sign up as a new user</h2>
                <SignupForm />
            </section>
        </Main>
    )
}