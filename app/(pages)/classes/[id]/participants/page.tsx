import { fetchNoCache } from "@/app/api/fetches";
import { getToken, getUserId } from "@/utils/cookies"
import type { FitnessClass, User } from "@/app/api/types";
import { IoPerson } from "react-icons/io5";
import PageWrapper from "@/components/layout/PageWrapper"
import UserCard from "@/components/cards/UserCard";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const fitnessClass: FitnessClass = await fetchNoCache(`http://localhost:4000/api/v1/classes/${id}`)

    return {
        title: `Participants: ${fitnessClass.className}`
    }
}

export default async function EditClassPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const token = await getToken()
    const userId = await getUserId()

    const user: User = await fetchNoCache(`http://localhost:4000/api/v1/users/${userId}`, token)
    console.log("user:", user)

    const fitnessClass: FitnessClass = await fetchNoCache(`http://localhost:4000/api/v1/classes/${id}`)
    console.log("fitnessClass:", fitnessClass)

    return (
        <PageWrapper header={{ title: "My Profile" }} main={{ className: "space-y-7" }}>
            <UserCard user={user} />
            <h1 className="text-2xl font-semibold">{fitnessClass.className}</h1>

            <section className="mt-5 space-y-3">
                <h2 className="font-semibold">Participants:</h2>
                <div className="space-y-4">
                    {fitnessClass.users.map((item, i: number) => (
                        <article className="py-3 px-6 flex items-center gap-2.5 border border-app-black rounded-3xl" key={i}>
                            <IoPerson className="size-5" />
                            <p className="text-lg">{item.userFirstName} {item.userLastName}</p>
                        </article>
                    ))}
                </div>
            </section>
        </PageWrapper>
    )
}