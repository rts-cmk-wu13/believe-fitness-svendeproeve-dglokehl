import { getUserId } from "@/utils/cookies"
import { fetchNoCacheAuth } from "@/app/api/fetches"
import type { User } from "@/app/api/types"
import PageWrapper from "@/components/layout/PageWrapper"
import UserCard from "@/components/cards/UserCard"
import DefaultProfileOverview from "@/components/blocks/DefaultProfileOverview"
import AdminProfileOverview from "@/components/blocks/AdminProfileOverview"

export const metadata = {
    title: "My Profile"
}

export default async function ProfilePage() {
    const userId = await getUserId() as string

    const user: User = await fetchNoCacheAuth(`http://localhost:4000/api/v1/users/${userId}`)
    console.log("user:", user)

    return (
        <PageWrapper header={{ title: "My Profile" }}>
            <UserCard user={user} className="mb-7" />

            {user.role === "default" && <DefaultProfileOverview fitnessClasses={user.classes} />}

            {user.role === "admin" && <AdminProfileOverview />}
        </PageWrapper>
    )
}