import Link from "next/link"
import { getToken, getUserId } from "@/utils/cookies"
import { fetchNoCache } from "@/app/api/fetches"
import type { User } from "@/app/api/types"
import PageWrapper from "@/components/layout/PageWrapper"
import UserCard from "@/components/cards/UserCard"
import ProfileFitnessClassCard from "@/components/cards/ProfileFitnessClassCard"

export default async function ProfilePage() {
    const token = await getToken()
    const userId = await getUserId() as string

    const user: User = await fetchNoCache(`http://localhost:4000/api/v1/users/${userId}`, token)
    console.log("user:", user)

    return (
        <PageWrapper header={{ title: "My Profile" }}>
            <UserCard user={user} className="mb-7" />

            {user.role === "admin" && (
                <div className="flex justify-end">
                    <Link href={`/classes/new`} className="button-app-default px-6">Add Class</Link>
                </div>
            )}
            <div className="space-y-5">
                {user.classes.map((item, i: number) => <ProfileFitnessClassCard fitnessClass={item} userRole={user.role} userId={userId} key={i} />)}
            </div>
        </PageWrapper>
    )
}