import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import type { FitnessClass, FitnessClassRating } from "@/app/api/types"
import { formatRatings } from "@/utils/helpers";

type StarRatingProps = {
    ratings: FitnessClassRating[];
    className?: string;
}

export default function StarRating({ ratings, className }: StarRatingProps) {
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
        </div>
    )
}