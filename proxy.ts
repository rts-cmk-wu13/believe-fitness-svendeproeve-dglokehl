import { NextResponse, NextRequest } from "next/server";
import { getToken, getUserRole } from "@/utils/cookies";

export async function proxy(request: NextRequest) {
    const token = await getToken()
    const userRole = await getUserRole()

    if (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup")) {
        if (token) return NextResponse.redirect(new URL("/", request.url))
    }
    if (request.nextUrl.pathname.startsWith("/logout")) {
        if (!token) return NextResponse.redirect(new URL("/login", request.url))
    }

    if (request.nextUrl.pathname.startsWith("/profile")) {
        if (!token) return NextResponse.redirect(new URL("/login", request.url))
    }

    if (
        request.nextUrl.pathname.startsWith("/classes/new") ||
        (request.nextUrl.pathname.startsWith("/classes/") && request.nextUrl.pathname.endsWith("/edit")) ||
        (request.nextUrl.pathname.startsWith("/classes/") && request.nextUrl.pathname.endsWith("/delete")) ||
        (request.nextUrl.pathname.startsWith("/classes/") && request.nextUrl.pathname.endsWith("/participants"))
    ) {
        if (!token) return
        if (userRole !== "instructor") return NextResponse.redirect(new URL("/", request.url))
    }
}