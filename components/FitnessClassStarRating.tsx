import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import type { FitnessClassRating } from "@/app/api/types"
import { fetchNoCache } from "@/app/api/fetches";
import { formatRatings } from "@/utils/helpers";

type FitnessClassStarRatingProps = {
    classId: number;
    withText?: boolean;
    className?: string;
}

export default async function FitnessClassStarRating({ classId, withText, className }: FitnessClassStarRatingProps) {
    const ratings: FitnessClassRating[] = await fetchNoCache(`http://localhost:4000/api/v1/classes/${classId}/ratings`)
    console.log("ratings:", ratings)

    const avgRating = formatRatings(ratings)

    return (
        <div className={`*:size-3 flex items-center gap-1.5 ${className ? className : ""}`}>
            {Array.from({ length: 5 }).map((item, i: number) => {
                const starNumber = i + 1

                if (avgRating >= starNumber) {
                    return <FaStar key={i} />
                } else if (avgRating >= starNumber - 0.5) {
                    return <FaRegStarHalfStroke key={i} />
                } else {
                    return <FaRegStar key={i} />
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