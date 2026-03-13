import type { FitnessClassRating, FitnessClass, User } from "@/app/api/types"

export function getAvgRating(ratings: FitnessClassRating[]) {
    if (ratings.length < 1) return 0

    let sum = 0
    for (let i = 0; i < ratings.length; i++) {
        sum += ratings[i].rating
    }
    const result = Math.round(sum / ratings.length)
    return result
}

export function isAllowedToSignup(fitnessClass: FitnessClass, user: User, isSignedUp: boolean) {
    if (isSignedUp) return true

    const hasOthersSameDay = user.classes.some((userClass) => userClass.classDay === fitnessClass.classDay)
    if (hasOthersSameDay) return false

    const maxParticipantsReached = fitnessClass.users.length >= fitnessClass.maxParticipants 
    if (maxParticipantsReached) return false

    return true
}

export function getUserRating(ratings: FitnessClassRating[], userId: string) {
    const hasRated = ratings.find((rating) => rating.userId == Number(userId))
    if (hasRated) return hasRated.rating

    return
}