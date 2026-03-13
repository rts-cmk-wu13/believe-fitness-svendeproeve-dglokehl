import { fetchNoCache, fetchNoCacheAuth } from "@/app/api/fetches";
import type { FitnessClass, FitnessClassRating, User, UserRole } from "@/app/api/types";
import PageWrapper from "@/components/layout/PageWrapper";
import FitnessClassStarRating from "@/components/blocks/FitnessClassStarRating";
import RateButton from "@/components/buttons/RateButton";
import { getUserId, getUserRole } from "@/utils/cookies";
import SignupButton from "@/components/buttons/SignupButton";
import TrainerCard from "@/components/cards/TrainerCard";
import { isAllowedToSignup, getUserRating } from "@/utils/helpers";

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

    const userId = await getUserId() as string
    const userRole = await getUserRole() as UserRole

    const user: User = await fetchNoCacheAuth(`http://localhost:4000/api/v1/users/${userId}`)
    console.log("user:", user)
    
    const isSignedUp = fitnessClass.users.some((user) => user.id == Number(userId))
    const isAllowed = isAllowedToSignup(fitnessClass, user, isSignedUp)
    // console.log("isAllowed:", isAllowed)

    const userRating = getUserRating(ratings, userId)

    return (
        <PageWrapper main={{ className: "mt-0! pt-0! pb-10 space-y-4" }}>
            <section className="px-0! h-108 relative">
                <div className="h-3/5 px-default pb-9 flex flex-col justify-end gap-5 absolute bottom-0 inset-x-0 bg-linear-to-t from-black/75 to-transparent text-app-yellow">
                    <h1 className="text-4xl font-bold">{fitnessClass.className}</h1>

                    <div className="flex justify-between items-end">
                        <FitnessClassStarRating classId={Number(id)} withText />
                        {userRole === "default" && <RateButton fitnessClass={fitnessClass} userRating={userRating} />}
                    </div>
                </div>

                <img src={fitnessClass.asset.url} alt={fitnessClass.className} className="size-full object-cover" />
            </section>

            <div className="space-y-9">
                <div className="space-y-4">
                    <p className="font-medium capitalize">{fitnessClass.classDay} - {fitnessClass.classTime}</p>
                    <p>{fitnessClass.classDescription}</p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold">Trainer</h2>
                    <TrainerCard trainer={fitnessClass.trainer} />
                    <SignupButton className="button-app-default w-full" isSignedUp={isSignedUp} isAllowed={isAllowed} userRole={userRole} classId={fitnessClass.id} />
                </section>
            </div>
        </PageWrapper>
    )
}