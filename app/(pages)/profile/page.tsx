import { getToken, getUserId } from "@/utils/cookies"
import { fetchNoCache } from "@/app/api/fetches"
import type { User } from "@/app/api/types"
import PageWrapper from "@/components/layout/PageWrapper"
import UserCard from "@/components/cards/UserCard"
import DefaultProfileOverview from "@/components/blocks/DefaultProfileOverview"
import AdminProfileOverview from "@/components/blocks/AdminProfileOverview"

export default async function ProfilePage() {
    const token = await getToken()
    const userId = await getUserId() as string

    const user: User = await fetchNoCache(`http://localhost:4000/api/v1/users/${userId}`, token)
    console.log("user:", user)

    return (
        <PageWrapper header={{ title: "My Profile" }}>
            <UserCard user={user} className="mb-7" />

            {user.role === "default" && <DefaultProfileOverview fitnessClasses={user.classes} />}

            {user.role === "admin" && <AdminProfileOverview />}
        </PageWrapper>
    )
}