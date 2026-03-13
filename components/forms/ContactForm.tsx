"use client"

import { useActionState } from "react";
import Form from "next/form";
import InputWrapper from "./InputWrapper";
import { sendContactMessage } from "@/app/api/actions";
import type { FormState } from "@/app/api/types";

export default function ContactForm() {
    const initialState: FormState = {
        message: "",
        errors: {
            fieldErrors: {}
        },
        inputs: {
            name: "",
            email: "",
            message: "",
        }
    }

    const [state, formAction, pending] = useActionState(sendContactMessage, initialState)
    // console.log("state:", state)

    return (
        <section className="space-y-3">
            <h3 className="text-2xl font-bold">Contact us</h3>
            <p>Ask us anything about Believe Fitness!</p>

            <Form
                action={formAction}
                noValidate
                className="mt-6 space-y-4"
            >
                <InputWrapper error={state.errors.fieldErrors.name}>
                    <input
                        type="text"
                        name="name" id="name"
                        placeholder="Enter your name..."
                        defaultValue={state.inputs.name}
                        className="form-input"
                    />
                </InputWrapper>
                <InputWrapper error={state.errors.fieldErrors.email}>
                    <input
                        type="email"
                        name="email" id="email"
                        placeholder="Enter your email..."
                        defaultValue={state.inputs.email}
                        className="form-input"
                    />
                </InputWrapper>
                <InputWrapper error={state.errors.fieldErrors.message}>
                    <textarea
                        name="message" id="message"
                        placeholder="Enter your message..."
                        defaultValue={state.inputs.message}
                        className="form-input-textarea h-32"
                    ></textarea>
                </InputWrapper>

                {state.message && <p className="mt-1 text-sm font-medium text-center text-green-400">{state.message}</p>}
                <button disabled={pending} className="button-app-default h-12 w-full">Send Message</button>
            </Form>
        </section>
    )
}