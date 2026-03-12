import type { FitnessClass } from "@/app/api/types";
import { fetchNoCache } from "@/app/api/fetches";
import PageWrapper from "@/components/layout/PageWrapper"
import DeleteFitnessClassButton from "@/components/buttons/DeleteFitnessClassButton";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const fitnessClass: FitnessClass = await fetchNoCache(`http://localhost:4000/api/v1/classes/${id}`)

    return {
        title: `Delete: ${fitnessClass.className}`
    }
}

export default async function DleteClassPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const fitnessClass: FitnessClass = await fetchNoCache(`http://localhost:4000/api/v1/classes/${id}`)
    console.log("fitnessClass:", fitnessClass)

    return (
        <PageWrapper main={{ className: "pt-32 *:px-0! px-default flex flex-col justify-center items-center gap-5 text-center" }}>
            <h1 className="mb-4.5 text-lg font-semibold">Delete {fitnessClass.className}?</h1>
            <DeleteFitnessClassButton classId={id} className="w-full" />
        </PageWrapper>
    )
}