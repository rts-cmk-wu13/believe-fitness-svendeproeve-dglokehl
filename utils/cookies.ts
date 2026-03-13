import { cookies } from "next/headers";

export async function getToken() {
    const cookieStore = await cookies()
    if (!cookieStore.has("BF_TOKEN")) return

    const token = cookieStore.get("BF_TOKEN")
    if (!token) return

    return token.value
}

export async function getUserId() {
    const cookieStore = await cookies()
    if (!cookieStore.has("BF_USER_ID")) return

    const userId = cookieStore.get("BF_USER_ID")
    if (!userId) return

    return userId.value
}

export async function getUserRole() {
    const cookieStore = await cookies()
    if (!cookieStore.has("BF_USER_ROLE")) return

    const userId = cookieStore.get("BF_USER_ROLE")
    if (!userId) return

    return userId.value
}