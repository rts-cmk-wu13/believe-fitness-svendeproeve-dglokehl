import { fetchNoCache } from "@/app/api/fetches";
import type { FitnessClass, FitnessClassRating } from "@/app/api/types";
import PageWrapper from "@/components/layout/PageWrapper";
import FitnessClassStarRating from "@/components/FitnessClassStarRating";
import Button from "@/components/buttons/Button";
import RateButton from "@/components/buttons/RateButton";
import { getUserId } from "@/utils/cookies";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

	const fitnessClass: FitnessClass = await fetchNoCache(`http://localhost:4000/api/v1/classes/${id}`)

	return {
		title: fitnessClass.className
	}
}

export default async function ClassDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const fitnessClass: FitnessClass = await fetchNoCache(`http://localhost:4000/api/v1/classes/${id}`)
    console.log("fitnessClass:", fitnessClass)

    const ratings: FitnessClassRating[] = await fetchNoCache(`http://localhost:4000/api/v1/classes/${id}/ratings`)
    // console.log("ratings:", ratings)

    const userId = await getUserId()

    let userRating
    const hasRated = ratings.find((rating) => rating.userId == Number(userId))
    // console.log("hasRated:", hasRated)
    if (hasRated) userRating = hasRated.rating

    return (
        <PageWrapper main={{ className: "mt-0! pt-0! pb-10" }}>
            <section className="px-0! h-108 relative">
                <div className="h-3/5 px-default pb-9 flex flex-col justify-end gap-5 absolute bottom-0 inset-x-0 bg-linear-to-t from-black/75 to-transparent text-app-yellow">
                    <h1 className="text-4xl font-bold">{fitnessClass.className}</h1>

                    <div className="flex justify-between items-end">
                        <FitnessClassStarRating classId={Number(id)} withText />
                        <RateButton fitnessClass={fitnessClass} userRating={userRating} />
                    </div>
                </div>

                <img src={fitnessClass.asset.url} alt={fitnessClass.className} className="size-full object-cover" />
            </section>
        </PageWrapper>
    )
}