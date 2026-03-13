import PageWrapper from "@/components/layout/PageWrapper"
import FitnessClassForm from "@/components/forms/FitnessClassForm"

export const metadata = {
    title: "New class"
}

export default async function CreateClassPage() {
    return (
        <PageWrapper>
            <h1 className="mb-4.5 text-lg font-semibold">Create a new class</h1>
            <FitnessClassForm />
        </PageWrapper>
    )
}