"use server"

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import * as z from "zod";
import { LoginSchema, SignupSchema, NewsletterSchema, ContactSchema } from "./schemas"
import type { FormState } from "./types";


// ---------- AUTH ---------- //

export async function authLogin(initialState: FormState, formData: FormData): Promise<FormState> {
    // console.log("authLogin called")

    const formObject = {
        username: formData.get("username"),
        password: formData.get("password"),
    }

    const result = LoginSchema.safeParse(formObject)
    if (!result.success) return {
        errors: z.flattenError(result.error),
        inputs: formObject,
    }
    // console.log("result.data:", result.data)

    const res = await fetch("http://localhost:4000/auth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject)
    });
    if (!res.ok) return {
        message: "Wrong username/password",
        errors: {
            fieldErrors: {}
        },
        inputs: formObject,
    }

    const data = await res.json();
    console.log("data:", data)

    const cookieStore = await cookies()
    cookieStore.set("BF_TOKEN", data.token, { expires: data.validUntil })
    // cookieStore.set("BF_USER_ID", data.userId, { expires: data.validUntil })
    // cookieStore.set("BF_USER_ROLE", data.role, { expires: data.validUntil })

    redirect("/")
}

export async function authSignup(initialState: FormState, formData: FormData): Promise<FormState> {
    // console.log("authSignup called")

    const formObject = {
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
        username: formData.get("username"),
        password: formData.get("password"),
        passwordConfirm: formData.get("passwordConfirm"),
    }

    const result = SignupSchema.safeParse(formObject)
    if (!result.success) return {
        errors: z.flattenError(result.error),
        inputs: formObject,
    }
    // console.log("result.data:", result.data)

    const res = await fetch("http://localhost:4000/api/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: formObject.username,
            password: formObject.password,
            userFirstName: formObject.firstname,
            userLastName: formObject.lastname,
        })
    });
    if (!res.ok) return {
        message: `${res.status}: ${res.statusText}`,
        errors: {
            fieldErrors: {}
        },
        inputs: formObject,
    }

    const data = await res.json();
    console.log("data:", data)

    redirect("/login")
}


// ---------- ACTIONS ---------- //

export async function registerNewsletter(initialState: FormState, formData: FormData): Promise<FormState> {
    // console.log("registerNewsletter called")

    const formObject = {
        email: formData.get("email"),
    }

    const result = NewsletterSchema.safeParse(formObject)
    if (!result.success) return {
        message: "Enter a valid email",
        errors: z.flattenError(result.error),
        inputs: formObject,
    }
    // console.log("result.data:", result.data)

    const res = await fetch("http://localhost:4000/api/v1/newsletter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject)
    });
    if (!res.ok) return {
        message: `${res.status}: ${res.statusText}`,
        errors: {
            fieldErrors: {}
        },
        inputs: formObject,
    }

    const data = await res.json();
    // console.log("data:", data)

    return {
        message: "Thank you for signing up for our newsletter",
        errors: {
            fieldErrors: {
                email: []
            }
        },
        inputs: {
            email: "",
        }
    }
}


export async function sendContactMessage(initialState: FormState, formData: FormData): Promise<FormState> {
    // console.log("registerNewsletter called")

    const formObject = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    }

    const result = ContactSchema.safeParse(formObject)
    if (!result.success) return {
        errors: z.flattenError(result.error),
        inputs: formObject,
    }
    // console.log("result.data:", result.data)

    const res = await fetch("http://localhost:4000/api/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject)
    });
    if (!res.ok) return {
        message: `${res.status}: ${res.statusText}`,
        errors: {
            fieldErrors: {}
        },
        inputs: formObject,
    }

    const data = await res.json();
    // console.log("data:", data)

    return {
        message: "Thank you for contacting us, we will answer your message ASAP!",
        errors: {
            fieldErrors: {
                email: []
            }
        },
        inputs: {
            email: "",
        }
    }
}