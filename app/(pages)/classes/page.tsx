import PageWrapper from "@/components/layout/PageWrapper"
import FitnessClassCard from "@/components/cards/FitnessClassCard"
import { fetchNoCache } from "@/app/api/fetches"
import type { FitnessClass } from "@/app/api/types"

export default async function ClassesPage() {
    const classes: FitnessClass[] = await fetchNoCache("http://localhost:4000/api/v1/classes")
    console.log("classes:", classes)

    const randNum = Math.floor(Math.random() * classes.length)
    const randClass = classes[randNum]
    console.log("randClass:", randClass)

    return (
        <PageWrapper header={{ title: "Popular classes" }} main={{ className: "space-y-12" }}>
            <div>
                <FitnessClassCard fitnessClass={randClass} size="lg" />
            </div>

            <section className="px-0! *:not-last:px-default space-y-3">
                <h2 className="text-xl font-bold">Classes for you</h2>
                <div className="pl-default flex gap-4 overflow-x-scroll *:shrink-0 scrollbar-hidden *:last:mr-default">
                    {classes.map((item, i: number) => <FitnessClassCard fitnessClass={item} key={i} />)}
                </div>
            </section>
        </PageWrapper>
    )
}