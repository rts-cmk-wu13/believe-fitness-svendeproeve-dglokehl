"use client"

import { useActionState, useState } from "react";
import Form from "next/form";
import type { FitnessClass, FormState } from "@/app/api/types";
import { createFitnessClass, editFitnessClass } from "@/app/api/actions";
import InputWrapper from "./InputWrapper";

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
            assetId: "",
        }
    }

    const [state, formAction, pending] = useActionState(fitnessClass ? editFitnessClass : createFitnessClass, initialState)
    console.log("state:", state)

    const [editImage, setEditImage] = useState(fitnessClass ? false : true);

    return (
        <Form
            action={formAction}
            noValidate
            className={`grid grid-cols-2 gap-4 *:col-span-2 ${className ? className : ""}`}
        >
            <InputWrapper error={state.errors.fieldErrors.className}>
                <input
                    type="text"
                    name="className" id="className"
                    placeholder="Class name..."
                    defaultValue={state.inputs.className}
                    className="form-input cols"
                />
            </InputWrapper>
            <InputWrapper error={state.errors.fieldErrors.classDescription}>
                <textarea
                    name="classDescription" id="classDescription"
                    placeholder="Class description..."
                    defaultValue={state.inputs.classDescription}
                    className="form-input-textarea h-32"
                ></textarea>
            </InputWrapper>

            <InputWrapper error={state.errors.fieldErrors.classDay} className="col-span-1!">
                <select
                    name="classDay" id="classDay"
                    defaultValue={state.inputs.classDay}
                    className="form-input appearance-none"
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
            </InputWrapper>
            <InputWrapper error={state.errors.fieldErrors.classTime} className="col-span-1!">
                <input
                    type="text"
                    name="classTime" id="classTime"
                    placeholder="Class time..."
                    defaultValue={state.inputs.classTime}
                    className="form-input"
                />
            </InputWrapper>

            <InputWrapper error={state.errors.fieldErrors.trainerId}>
                <select
                    name="trainerId" id="trainerId"
                    defaultValue={state.inputs.trainerId}
                    className="form-input appearance-none"
                >
                    <option value="" disabled>Class trainer...</option>
                    <option value="1">Davina Jones</option>
                    <option value="2">Sara Connor</option>
                    <option value="3">Michael Blake</option>
                    <option value="4">Khaled Al-Sadek</option>
                </select>
            </InputWrapper>
            <InputWrapper error={state.errors.fieldErrors.maxParticipants}>
                <input
                    type="text"
                    name="maxParticipants" id="maxParticipants"
                    placeholder="Max participants in class..."
                    defaultValue={state.inputs.maxParticipants}
                    className="form-input"
                />
            </InputWrapper>

            {editImage && (
                <InputWrapper className="space-y-2 text-app-grey-dark" error={state.errors.fieldErrors.file}>
                    <p className="text-lg">Choose an image:</p>
                    <input
                        type="file"
                        name="file" id="file"
                        accept="image/*"
                        className="w-full file:mr-2.5 file:py-1 file:px-2.5 file:bg-app-white file:border file:border-app-grey-dark file:rounded-sm file:hover-75"
                    />
                </InputWrapper>
            )}

            {fitnessClass && !editImage && (
                <figure className="relative">
                    <figcaption className="button-app-default px-5 absolute bottom-2 right-2" onClick={() => setEditImage(!editImage)}>Edit Image</figcaption>
                    <img src={fitnessClass.asset.url} alt="Uploaded image for class" />
                    <input type="hidden" name="assetId" id="assetId" value={fitnessClass.assetId} />
                </figure>
            )}
            {fitnessClass && (
                <input type="hidden" name="classId" id="classId" value={fitnessClass.id} />
            )}

            {state.message && <p className={`mt-1 text-sm font-medium text-center ${Object.keys(state.errors.fieldErrors).length > 0 ? "text-red-400" : "text-green-400"}`}>{state.message}</p>}
            <button disabled={pending} className="button-app-default h-12 w-full">{fitnessClass ? "Update Class" : "Create Class"}</button>
        </Form>
    )
}