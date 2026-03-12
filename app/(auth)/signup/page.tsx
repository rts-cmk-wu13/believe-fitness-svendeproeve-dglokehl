import Logo from "@/components/blocks/Logo"
import Main from "@/components/layout/Main"
import SignupForm from "@/components/forms/SignupForm"

export const metadata = {
    title: "Sign up"
}

export default async function SignupPage() {
    return (
        <>
            <Logo className="mb-12 pt-10" />
            <Main className="space-y-5">
                <h2 className="text-lg font-semibold">Sign up as a new user</h2>
                <SignupForm />
            </Main>
        </>
    )
}