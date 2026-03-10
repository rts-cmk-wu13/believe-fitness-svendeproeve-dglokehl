"use client"

import { useActionState } from "react";
import Form from "next/form";
import { registerNewsletter } from "@/app/api/actions";
import type { FormState } from "@/app/api/types";

export default function NewsletterForm() {
    const initialState: FormState = {
        message: "",
        errors: {
            fieldErrors: {}
        },
        inputs: {
            email: "",
        }
    }

    const [state, formAction, pending] = useActionState(registerNewsletter, initialState)
    console.log("state:", state)

    return (
        <Form
            action={formAction}
            noValidate
            className="space-y-4"
        >
            <h3 className="text-2xl font-bold">Sign up for our newsletter</h3>
            <p>Sign up to receive the latest news and announcements from Believe Fitness</p>

            <div className="mt-6 flex gap-4">
                <input
                    type="email"
                    name="email" id="email"
                    placeholder="Enter your email..."
                    defaultValue={state.inputs.email}
                    className="form-input flex-1"
                />

                <button disabled={pending} className="button-app-default px-6 block">Sign Up</button>
            </div>

            {state.message && <p className={`mt-1 text-sm font-medium text-center ${state.errors.fieldErrors.email[0] ? "text-red-400" : "text-green-400"}`}>{state.message}</p>}
        </Form>
    )
}