"use client"

import { useActionState } from "react";
import Form from "next/form";
import Link from "next/link";
import FormInput from "./FormInput";
import { authSignup } from "@/app/api/actions";
import type { FormState } from "@/app/api/types";

export default function SignupForm() {
    const initialState: FormState = {
        message: "",
        errors: {
            fieldErrors: {}
        },
        inputs: {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            passwordConfirm: "",
        }
    }

    const [state, formAction, pending] = useActionState(authSignup, initialState)
    // console.log("state:", state)

    return (
        <Form
            action={formAction}
            noValidate
            className="space-y-4"
        >
            <FormInput error={state.errors.fieldErrors.firstname}>
                <input
                    type="text"
                    name="firstname" id="firstname"
                    placeholder="Enter your first name..."
                    defaultValue={state.inputs.firstname}
                    className="form-input"
                />
            </FormInput>
            <FormInput error={state.errors.fieldErrors.lastname}>
                <input
                    type="text"
                    name="lastname" id="lastname"
                    placeholder="Enter your last name..."
                    defaultValue={state.inputs.lastname}
                    className="form-input"
                />
            </FormInput>
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
            <FormInput error={state.errors.fieldErrors.passwordConfirm}>
                <input
                    type="password"
                    name="passwordConfirm" id="passwordConfirm"
                    placeholder="Repeat your password..."
                    defaultValue={state.inputs.passwordConfirm}
                    className="form-input"
                />
            </FormInput>

            {state.message && <p className="mt-1 text-sm font-medium text-center text-red-400">{state.message}</p>}
            <button disabled={pending} className="button-app-default h-12 w-full">Sign Up</button>

            <p className="text-sm text-app-grey-medium text-center">
                Are you already a Believer?<br /><Link href="/login" className="underline">Log in here</Link> and start training like a pro.
            </p>
        </Form>
    )
}