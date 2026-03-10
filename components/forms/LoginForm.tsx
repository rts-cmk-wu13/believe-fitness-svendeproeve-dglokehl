"use client"

import { useActionState } from "react";
import Form from "next/form";
import Link from "next/link";
import FormInput from "./FormInput";
import { authLogin } from "@/app/api/actions";
import type { FormState } from "@/app/api/types";

export default function LoginForm() {
    const initialState: FormState = {
        message: "",
        errors: {
            fieldErrors: {}
        },
        inputs: {
            username: "",
            password: "",
        }
    }

    const [state, formAction, pending] = useActionState(authLogin, initialState)
    // console.log("state:", state)

    return (
        <Form
            action={formAction}
            noValidate
            className="space-y-4"
        >
            <FormInput error={state.errors.fieldErrors.username}>
                <input
                    type="text"
                    name="username" id="username"
                    placeholder="Enter your username..."
                    defaultValue={state.inputs.username}
                    className="form-input"
                />
            </FormInput>
            <FormInput error={state.errors.fieldErrors.password}>
                <input
                    type="password"
                    name="password" id="password"
                    placeholder="Enter your password..."
                    defaultValue={state.inputs.password}
                    className="form-input"
                />
            </FormInput>

            {state.message && <p className="mt-1 text-sm font-medium text-center text-red-400">{state.message}</p>}
            <button disabled={pending} className="button-app-default h-12 w-full">Log In</button>

            <p className="text-sm text-app-grey-medium text-center">
                Are you not yet a Believer?<br /><Link href="/signup" className="underline">Sign up here</Link> to start training like a pro.
            </p>
        </Form>
    )
}