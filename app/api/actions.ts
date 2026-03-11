"use server"

import { redirect, } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import * as z from "zod";
import { LoginSchema, SignupSchema, NewsletterSchema, ContactSchema, FitnessClassSchema } from "./schemas"
import type { FormState } from "./types";
import { getToken, getUserId } from "@/utils/cookies";


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
    cookieStore.set("BF_USER_ID", data.userId, { expires: data.validUntil })
    cookieStore.set("BF_USER_ROLE", data.role, { expires: data.validUntil })

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

export async function authLogout() {
    // console.log("authLogout called")

    const cookieStore = await cookies()
    if (cookieStore.has("BF_TOKEN")) cookieStore.delete("BF_TOKEN")
    if (cookieStore.has("BF_USER_ID")) cookieStore.delete("BF_USER_ID")
    if (cookieStore.has("BF_USER_ROLE")) cookieStore.delete("BF_USER_ROLE")

    revalidatePath("/")
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


export async function addUserRating(classId: number, rating: number) {
    // console.log("addUserRating called")

    const token = await getToken()
    if (!token) return
    const userId = await getUserId()
    if (!userId) return

    const formObject = {
        userId: userId,
        rating: rating,
    }

    // const ratings: FitnessClassRating[] = await fetchNoCache(`http://localhost:4000/api/v1/classes/${classId}/ratings`)
    // console.log("ratings:", ratings)
    // if (ratings.some((rating) => rating.userId == Number(userId))) return

    const res = await fetch(`http://localhost:4000/api/v1/classes/${classId}/ratings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formObject)
    });
    if (!res.ok) return

    const data = await res.json();
    console.log("data:", data)

    revalidatePath(`/classes/${classId}`)
}


// ---------- CLASSES ---------- //

export async function addUserToClass(classId: number) {
    // console.log("addUserToClass called")

    const token = await getToken()
    const userId = await getUserId()

    const res = await fetch(`http://localhost:4000/api/v1/users/${userId}/classes/${classId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (!res.ok) return

    // const data = await res.json();
    // console.log("data:", data)

    revalidatePath(`/classes/${classId}`)
    revalidatePath("profile")
}

export async function removeUserFromClass(classId: number) {
    // console.log("addUserToClass called")

    const token = await getToken()
    const userId = await getUserId()

    const res = await fetch(`http://localhost:4000/api/v1/users/${userId}/classes/${classId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (!res.ok) return

    // const data = await res.json();
    // console.log("data:", data)

    revalidatePath(`/classes/${classId}`)
    revalidatePath("profile")
}


// ---------- CREATE/EDIT/DELETE CLASSES ---------- //

export async function createAsset(file: File, formObject: any) {
    const token = await getToken()

    const assetForm = new FormData();
    assetForm.append("file", file);

    const res = await fetch("http://localhost:4000/api/v1/assets", {
        method: "POST",
        headers: {
            // "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        },
        body: assetForm
    });
    if (!res.ok) return {
        message: `${res.status}: ${res.statusText}`,
        errors: {
            fieldErrors: {}
        },
        inputs: formObject,
    }

    const data = await res.json()
    return data.id
}

export async function createFitnessClass(initialState: FormState, formData: FormData): Promise<FormState> {
    // console.log("createFitnessClass called")

    const formObject = {
        className: formData.get("className"),
        classDescription: formData.get("classDescription"),
        classDay: formData.get("classDay"),
        classTime: formData.get("classTime"),
        trainerId: formData.get("trainerId"),
        maxParticipants: formData.get("maxParticipants") === "" ? "" : Number(formData.get("maxParticipants")),
        file: formData.get("file"),
    }

    const result = FitnessClassSchema.safeParse(formObject)
    if (!result.success) return {
        errors: z.flattenError(result.error),
        inputs: formObject,
    }
    // console.log("result.data:", result.data)

    const assetId = await createAsset(result.data.file, formObject)

    const token = await getToken()

    const newFormObject = {
        className: formObject.className,
        classDescription: formObject.classDescription,
        classDay: formObject.classDay,
        classTime: formObject.classTime,
        trainerId: formObject.trainerId,
        maxParticipants: formObject.maxParticipants,
        assetId: assetId,
    }

    const res = await fetch("http://localhost:4000/api/v1/classes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newFormObject)
    });
    if (!res.ok) return {
        message: `${res.status}: ${res.statusText}`,
        errors: {
            fieldErrors: {}
        },
        inputs: formObject,
    }

    revalidatePath("/classes")
    revalidatePath("/profile")
    redirect("/profile")
}

export async function editFitnessClass(initialState: FormState, formData: FormData): Promise<FormState> {
    // console.log("createFitnessClass called")

    const classId = formData.get("classId")

    const formObject = {
        className: formData.get("className"),
        classDescription: formData.get("classDescription"),
        classDay: formData.get("classDay"),
        classTime: formData.get("classTime"),
        trainerId: formData.get("trainerId"),
        maxParticipants: formData.get("maxParticipants") === "" ? "" : Number(formData.get("maxParticipants")),
        file: formData.get("file"),
    }

    const result = FitnessClassSchema.safeParse(formObject)
    if (!result.success) return {
        errors: z.flattenError(result.error),
        inputs: formObject,
    }
    // console.log("result.data:", result.data)

    const assetId = await createAsset(result.data.file, formObject)

    const token = await getToken()

    const newFormObject = {
        className: formObject.className,
        classDescription: formObject.classDescription,
        classDay: formObject.classDay,
        classTime: formObject.classTime,
        trainerId: formObject.trainerId,
        maxParticipants: formObject.maxParticipants,
        assetId: assetId,
    }

    const res = await fetch(`http://localhost:4000/api/v1/classes/${classId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newFormObject)
    });
    if (!res.ok) return {
        message: `${res.status}: ${res.statusText}`,
        errors: {
            fieldErrors: {}
        },
        inputs: formObject,
    }

    revalidatePath("/classes")
    revalidatePath("/profile")
    redirect("/profile")
}