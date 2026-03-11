"use client"

import { useActionState } from "react";
import Form from "next/form";
import type { FitnessClass, FormState } from "@/app/api/types";
import FormInput from "./FormInput";
import { createFitnessClass, editFitnessClass } from "@/app/api/actions";

type FitnessClassFormProps = {
    fitnessClass?: FitnessClass;
    className?: string;
}

export default function FitnessClassForm({ fitnessClass, className }: FitnessClassFormProps) {
    const initialState: FormState = {
        message: "",
        errors: {
            fieldErrors: {}
        },
        inputs: {
            className: fitnessClass?.className ? fitnessClass.className : "",
            classDescription: fitnessClass?.classDescription ? fitnessClass.classDescription : "",
            classDay: fitnessClass?.classDay ? fitnessClass.classDay : "",
            classTime: fitnessClass?.classTime ? fitnessClass.classTime : "",
            trainerId: fitnessClass?.trainerId ? fitnessClass.trainerId : "",
            maxParticipants: fitnessClass?.maxParticipants ? fitnessClass.maxParticipants : "",
            file: "",
        }
    }

    const [state, formAction, pending] = useActionState(fitnessClass ? editFitnessClass : createFitnessClass, initialState)
    console.log("state:", state)

    return (
        <Form
            action={formAction}
            noValidate
            className={`grid grid-cols-2 gap-4 *:col-span-2 ${className ? className : ""}`}
        >
            <FormInput error={state.errors.fieldErrors.className}>
                <input
                    type="text"
                    name="className" id="className"
                    placeholder="Class name..."
                    defaultValue={state.inputs.className}
                    className="form-input cols"
                />
            </FormInput>
            <FormInput error={state.errors.fieldErrors.classDescription}>
                <textarea
                    name="classDescription" id="classDescription"
                    placeholder="Class description..."
                    defaultValue={state.inputs.classDescription}
                    className="form-input-textarea h-32"
                ></textarea>
            </FormInput>

            <FormInput error={state.errors.fieldErrors.classDay} className="col-span-1!">
                <select
                    name="classDay" id="classDay"
                    defaultValue={state.inputs.classDay}
                    className="form-input"
                >
                    <option value="" disabled>Class day...</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                </select>
            </FormInput>
            <FormInput error={state.errors.fieldErrors.classTime} className="col-span-1!">
                <input
                    type="text"
                    name="classTime" id="classTime"
                    placeholder="Class time..."
                    defaultValue={state.inputs.classTime}
                    className="form-input"
                />
            </FormInput>

            <FormInput error={state.errors.fieldErrors.trainerId}>
                <select
                    name="trainerId" id="trainerId"
                    defaultValue={state.inputs.trainerId}
                    className="form-input"
                >
                    <option value="" disabled>Class trainer...</option>
                    <option value="1">Davina Jones</option>
                    <option value="2">Sara Connor</option>
                    <option value="3">Michael Blake</option>
                    <option value="4">Khaled Al-Sadek</option>
                </select>
            </FormInput>
            <FormInput error={state.errors.fieldErrors.maxParticipants}>
                <input
                    type="text"
                    name="maxParticipants" id="maxParticipants"
                    placeholder="Max participants in class..."
                    defaultValue={state.inputs.maxParticipants}
                    className="form-input"
                />
            </FormInput>
            <FormInput className="space-y-2 text-app-grey-dark" error={state.errors.fieldErrors.file}>
                <p className="text-lg">Choose an image:</p>
                <input
                    type="file"
                    name="file" id="file"
                    accept="image/*"
                    className="w-full file:mr-2.5 file:py-1 file:px-2.5 file:bg-app-white file:border file:border-app-grey-dark file:rounded-sm file:hover-75"
                />
            </FormInput>

            {fitnessClass && (
                <input type="hidden" name="classId" id="classId" value={fitnessClass.id} />
            )}

            {state.message && <p className="mt-1 text-sm font-medium text-center text-red-400">{state.message}</p>}
            <button disabled={pending} className="button-app-default h-12 w-full">Create Class</button>
        </Form>
    )
}