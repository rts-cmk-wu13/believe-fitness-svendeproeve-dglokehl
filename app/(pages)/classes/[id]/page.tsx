import { fetchNoCache } from "@/app/api/fetches";
import type { FitnessClass, FitnessClassRating, Asset } from "@/app/api/types";
import PageWrapper from "@/components/layout/PageWrapper";
import FitnessClassStarRating from "@/components/FitnessClassStarRating";
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

    const trainerImage: Asset = await fetchNoCache(`http://localhost:4000/api/v1/assets/${fitnessClass.trainer.assetId}`)
    console.log("trainerImage:", trainerImage)

    return (
        <PageWrapper main={{ className: "mt-0! pt-0! pb-10 space-y-4" }}>
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

            <div className="space-y-9">
                <div className="space-y-4">
                    <p className="font-medium">{fitnessClass.classDay} - {fitnessClass.classTime}</p>
                    <p>{fitnessClass.classDescription}</p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold">Trainer</h2>
                    <div className="flex items-center gap-5">
                        <img src={trainerImage.url} alt="" className="size-22 rounded-2xl object-cover" />
                        <p className="font-semibold">{fitnessClass.trainer.trainerName}</p>
                    </div>
                    <button className="button-app-default w-full">Sign Up</button>
                </section>
            </div>
        </PageWrapper>
    )
}