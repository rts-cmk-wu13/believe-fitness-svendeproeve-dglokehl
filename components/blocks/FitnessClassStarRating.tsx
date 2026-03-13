import { FaStar, FaRegStar } from "react-icons/fa6";
import type { FitnessClassRating } from "@/app/api/types"
import { fetchNoCache } from "@/app/api/fetches";
import { getAvgRating } from "@/utils/helpers";

type FitnessClassStarRatingProps = {
    classId: number;
    withText?: boolean;
    className?: string;
}

export default async function FitnessClassStarRating({ classId, withText, className }: FitnessClassStarRatingProps) {
    const ratings: FitnessClassRating[] = await fetchNoCache(`http://localhost:4000/api/v1/classes/${classId}/ratings`)

    const avgRating = getAvgRating(ratings)

    return (
        <div className={`*:size-3 flex items-center gap-1 ${className ? className : ""}`}>
            {[1,2,3,4,5].map((star) => {
                if (avgRating >= star) {
                    return <FaStar key={star} />
                } else {
                    return <FaRegStar key={star} />
                }
            })}
            {withText && (
                <p className="ml-4.5 size-auto! text-sm font-semibold">
                    {avgRating > 0 ? `${avgRating}/5` : "No ratings"}
                </p>
            )}
        </div>
    )
}