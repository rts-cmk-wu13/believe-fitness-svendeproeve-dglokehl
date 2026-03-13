import { fetchNoCache, fetchNoCacheAuth } from "@/app/api/fetches";
import { getUserId } from "@/utils/cookies"
import type { FitnessClass, User } from "@/app/api/types";
import PageWrapper from "@/components/layout/PageWrapper"
import UserCard from "@/components/cards/UserCard";
import ParticipantCard from "@/components/cards/ParticipantCard";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const fitnessClass: FitnessClass = await fetchNoCache(`http://localhost:4000/api/v1/classes/${id}`)

    return {
        title: `Participants: ${fitnessClass.className}`
    }
}

export default async function ParticipantsClassPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const userId = await getUserId()

    const user: User = await fetchNoCacheAuth(`http://localhost:4000/api/v1/users/${userId}`)
    console.log("user:", user)

    const fitnessClass: FitnessClass = await fetchNoCache(`http://localhost:4000/api/v1/classes/${id}`)
    console.log("fitnessClass:", fitnessClass)

    return (
        <PageWrapper header={{ title: "Participants" }} main={{ className: "space-y-7" }}>
            <UserCard user={user} />
            <h1 className="text-2xl font-semibold">{fitnessClass.className}</h1>

            <section className="mt-5 space-y-3">
                <h2 className="font-semibold">Participants:</h2>
                <div className="space-y-4">
                    {fitnessClass.users.length > 0 ?
                        fitnessClass.users.map((item, i: number) => <ParticipantCard user={item} key={i} />)
                    : (
                        <p className="text-sm text-app-grey-dark text-center">
                            There's currently no users signed up for this class.
                        </p>
                    )}
                </div>
            </section>
        </PageWrapper>
    )
}