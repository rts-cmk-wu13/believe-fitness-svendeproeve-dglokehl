import { notFound } from "next/navigation";
import type { FitnessClass } from "@/app/api/types";
import PageWrapper from "@/components/layout/PageWrapper"
import FitnessClassForm from "@/components/forms/FitnessClassForm"
import { fetchNoCache } from "@/app/api/fetches";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

	const fitnessClass: FitnessClass = await fetchNoCache(`http://localhost:4000/api/v1/classes/${id}`)
    if (!fitnessClass) return notFound()

	return {
		title: `Edit: ${fitnessClass.className}`
	}
}

export default async function EditClassPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const fitnessClass: FitnessClass = await fetchNoCache(`http://localhost:4000/api/v1/classes/${id}`)
    if (!fitnessClass) return notFound()
    console.log("fitnessClass:", fitnessClass)

    return (
        <PageWrapper>
            <h1 className="mb-4.5 text-lg font-semibold">Edit {fitnessClass.className}</h1>
            <FitnessClassForm fitnessClass={fitnessClass} />
        </PageWrapper>
    )
}