import type { FitnessClassRating } from "@/app/api/types"

export function formatRatings(ratings: FitnessClassRating[]) {
    if (ratings.length < 1) return -1

    let sum = 0
    for (let i = 0; i < ratings.length; i++) {
        sum += ratings[i].rating
    }
    const result = Math.round(sum / ratings.length)
    return result
}