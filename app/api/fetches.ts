import { getToken } from "@/utils/cookies"

export async function fetchRevalidate(url: string, revalidate?: number) {
    try {
        const res = await fetch(url, { next: { revalidate: revalidate ? revalidate : 3600 } })
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    }
    catch(error) {
        console.error(`Failed to fetch - ${error}`)
    }
}

export async function fetchRevalidateAuth(url: string, revalidate?: number) {
    const token = await getToken()
    if (!token) return console.error("No token found")

    try {
        const res = await fetch(url, {
            next: { revalidate: revalidate ? revalidate : 3600 },
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    }
    catch(error) {
        console.error(`Failed to fetch - ${error}`)
    }
}


export async function fetchNoCache(url: string) {
    try {
        const res = await fetch(url, { cache: "no-store" })
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    }
    catch(error) {
        console.error(`Failed to fetch - ${error}`)
    }
}

export async function fetchNoCacheAuth(url: string) {
    const token = await getToken()
    if (!token) return console.error("No token found")

    try {
        const res = await fetch(url, {
            cache: "no-store",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    }
    catch(error) {
        console.error(`Failed to fetch - ${error}`)
    }
}