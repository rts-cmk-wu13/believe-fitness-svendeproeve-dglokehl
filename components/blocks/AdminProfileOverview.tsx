import Link from "next/link"
import type { FitnessClass } from "@/app/api/types"
import { fetchNoCache } from "@/app/api/fetches"
import ProfileFitnessClassCard from "@/components/cards/ProfileFitnessClassCard"

type AdminProfileOverviewProps = {
    className?: string;
}

export default async function AdminProfileOverview({ className }: AdminProfileOverviewProps) {
    const fitnessClasses: FitnessClass[] = await fetchNoCache("http://localhost:4000/api/v1/classes")
    console.log("fitnessClasses:", fitnessClasses)

    return (
        <div className={`flex flex-col gap-4 ${className ? className : ""}`}>
            {fitnessClasses.map((item, i: number) => <ProfileFitnessClassCard fitnessClass={item} userRole="admin" key={i} />)}
            <Link href={`/classes/new`} className="button-app-default px-6 self-end">Add Class</Link>
        </div>
    )
}