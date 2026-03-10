import type { FitnessClassRating } from "@/app/api/types"

export function getMenuItems(isLoggedIn?: boolean) {
    let menuItems = [
        {
            href: "/",
            body: "Home",
        },
        {
            href: "/classes",
            body: "Popular Classes",
        },
        {
            href: "/search",
            body: "Search",
        }
    ]
    if (isLoggedIn) {
        menuItems.push({
            href: "/profile",
            body: "My Profile",
        })
    }
    menuItems.push({
        href: isLoggedIn ? "/logout" : "/login",
        body: isLoggedIn ? "Log Out" : "Log In",
    })

    return menuItems
}


export function formatRatings(ratings: FitnessClassRating[]) {
    if (ratings.length < 1) return -1

    let sum = 0
    for (let i = 0; i < ratings.length; i++) {
        sum += ratings[i].rating
    }
    const result = Math.round(sum / ratings.length)
    return result
}