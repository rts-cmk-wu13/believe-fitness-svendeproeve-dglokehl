import type { FitnessClass } from "@/app/api/types"
import DefaultSection from "./DefaultSection"
import FitnessClassCard from "../cards/FitnessClassCard"

type FitnessClassOverviewSectionProps = {
    heading: string;
    fitnessClasses: FitnessClass[];
    className?: string;
}

export default function FitnessClassOverviewSection({ heading, fitnessClasses, className }: FitnessClassOverviewSectionProps) {
    return (
        <DefaultSection heading={heading} className={`px-0! *:not-last:px-default ${className ? className : ""}`}>
            <div className="pl-default flex gap-4 overflow-x-scroll *:shrink-0 scrollbar-hidden *:last:mr-default">
                {fitnessClasses.map((item, i: number) => <FitnessClassCard fitnessClass={item} key={i} />)}
            </div>
        </DefaultSection>
    )
}