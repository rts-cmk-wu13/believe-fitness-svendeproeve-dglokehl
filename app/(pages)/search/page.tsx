import { fetchNoCache, fetchRevalidate } from "@/app/api/fetches"
import type { FitnessClass, Trainer } from "@/app/api/types"
import PageWrapper from "@/components/layout/PageWrapper"
import SearchBar from "@/components/forms/SearchBar"
import FitnessClassCard from "@/components/cards/FitnessClassCard"
import FitnessClassOverviewSection from "@/components/sections/FitnessClassOverviewSection"
import DefaultSection from "@/components/sections/DefaultSection"
import TrainerCard from "@/components/cards/TrainerCard"

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    const { q } = await searchParams;

    return {
        title: q ? q : "Search"
    }
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    const { q } = await searchParams;

    const fitnessClasses: FitnessClass[] = await fetchNoCache("http://localhost:4000/api/v1/classes")
    console.log("fitnessClasses:", fitnessClasses)

    const trainers: Trainer[] = await fetchRevalidate("http://localhost:4000/api/v1/trainers")
    const popularTrainers = trainers.slice(0, trainers.length < 3 ? trainers.length : 3);

    function filterFitnessClassesSearch(fitnessClass: FitnessClass) {
        const query = q.toLowerCase().trim()

        const name = fitnessClass.className.toLowerCase().trim()
        const description = fitnessClass.classDescription.toLowerCase().trim()
        const day = fitnessClass.classDay.toLowerCase().trim()
        const trainer = fitnessClass.trainer.trainerName.toLowerCase().trim()
        
        return name.includes(query) || day.includes(query) || description.includes(query) || trainer.includes(query)
    }

    let fitnessClassesFiltered = fitnessClasses
    if (q) fitnessClassesFiltered = fitnessClasses.filter(filterFitnessClassesSearch)

    return (
        <PageWrapper header={{ title: "Search" }} main={{ className: "space-y-10" }}>
            <SearchBar query={q} />

            {q ? (
                <>
                    {fitnessClassesFiltered.length > 0 ? (
                        <div className="card-grid gap-4">
                            {fitnessClassesFiltered.map((item, i: number) => <FitnessClassCard fitnessClass={item} size="md" key={i} />)}
                        </div>
                    ) : (
                        <p className="text-sm text-app-grey-dark text-center">Your search did not give any results. Try to search for something else.</p>
                    )}
                </>
            ) : (
                <>
                    <FitnessClassOverviewSection heading="Popular Classes" fitnessClasses={fitnessClasses} />
                    <DefaultSection heading="Popular Trainers">
                        <div className="space-y-5">
                            {popularTrainers.map((item, i: number) => <TrainerCard trainer={item} key={i} />)}
                        </div>
                    </DefaultSection>
                </>
            )}
        </PageWrapper>
    )
}