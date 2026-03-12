import PageWrapper from "@/components/layout/PageWrapper"
import FitnessClassCard from "@/components/cards/FitnessClassCard"
import { fetchNoCache } from "@/app/api/fetches"
import type { FitnessClass } from "@/app/api/types"
import FitnessClassOverviewSection from "@/components/sections/FitnessClassOverviewSection"

export const metadata = {
    title: "Classes"
}

export default async function ClassOverviewPage() {
    const fitnessClasses: FitnessClass[] = await fetchNoCache("http://localhost:4000/api/v1/classes")
    console.log("fitnessClasses:", fitnessClasses)

    const randNum = Math.floor(Math.random() * fitnessClasses.length)
    const randFitnessClass = fitnessClasses[randNum]
    console.log("randFitnessClass:", randFitnessClass)

    return (
        <PageWrapper header={{ title: "Popular classes" }} main={{ className: "space-y-12" }}>
            <div>
                <FitnessClassCard fitnessClass={randFitnessClass} size="lg" />
            </div>

            <FitnessClassOverviewSection heading="Classes for you" fitnessClasses={fitnessClasses} />
        </PageWrapper>
    )
}