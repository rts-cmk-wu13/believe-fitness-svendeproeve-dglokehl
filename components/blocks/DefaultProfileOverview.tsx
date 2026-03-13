import type { FitnessClass } from "@/app/api/types"
import ProfileFitnessClassCard from "@/components/cards/ProfileFitnessClassCard"

type DefaultProfileOverviewProps = {
    fitnessClasses: FitnessClass[];
    className?: string;
}

export default function DefaultProfileOverview({ fitnessClasses, className }: DefaultProfileOverviewProps) {
    return (
        <div className={`flex flex-col gap-5 ${className ? className : ""}`}>
            {fitnessClasses.map((item, i: number) => <ProfileFitnessClassCard classId={item.id} userRole="default" key={i} />)}
        </div>
    )
}