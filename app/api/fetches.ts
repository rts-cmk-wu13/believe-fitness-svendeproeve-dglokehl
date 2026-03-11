export async function fetchRevalidate(url: string, revalidate?: number, token?: string) {
    let options = { next: { revalidate: revalidate ? revalidate : 3600 } }

    if (token) {
        options = {
            next: { revalidate: revalidate ? revalidate : 3600 },
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }
    }

    try {
        const res = await fetch(url, options)
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    }
    catch(error) {
        console.error(`Failed to fetch - ${error}`)
    }
}

export async function fetchNoCache(url: string, token?: string) {
    let options = { cache: "no-store" }

    if (token) {
        options = {
            cache: "no-store",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }
    }

    try {
        const res = await fetch(url, options)
        if (!res.ok) throw new Error(res.statusText)
        return res.json()
    }
    catch(error) {
        console.error(`Failed to fetch - ${error}`)
    }
}