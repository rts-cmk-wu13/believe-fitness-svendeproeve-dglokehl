"use client"

import { useActionState } from "react";
import Form from "next/form";
import Link from "next/link";
import FormInput from "./FormInput";
import Button from "../buttons/Button";
import { registerNewsletter } from "@/app/api/actions";
import type { FormState } from "@/app/api/types";

type NewsletterFormProps = {
    children?: React.ReactNode;
    className?: string;
}

export default function NewsletterForm({ className }: NewsletterFormProps) {
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
                
                <Button className={`px-6 block ${pending && "opacity-50 pointer-events-none"}`}>Sign Up</Button>
            </div>

            {state.message && <p className={`mt-1 text-sm font-medium text-center ${state.errors.fieldErrors.email[0] ? "text-red-400" : "text-green-400"}`}>{state.message}</p>}
        </Form>
    )
}