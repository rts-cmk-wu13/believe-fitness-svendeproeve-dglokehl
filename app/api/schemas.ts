import * as z from "zod";

// ---------- AUTH ---------- //

export const LoginSchema = z.object({
    username: z.string({ error: "Enter your username" }).min(1, { error: "Enter your username" }),
    password: z.string({ error: "Enter your password" }).min(1, { error: "Enter your password" }),
});

export const SignupSchema = z.object({
    firstname: z.string({ error: "Enter your first name" }).min(1, { error: "Enter your first name" }),
    lastname: z.string({ error: "Enter your last name" }).min(1, { error: "Enter your last name" }),
    username: z.string({ error: "Enter a username" }).min(4, { error: "Your username must contain at least 4 characters" }),
    password: z.string({ error: "Enter a password" }).min(4, { error: "Your password must contain at least 4 characters" }),
    passwordConfirm: z.string({ error: "Repeat your chosen password" }).min(1, { error: "Repeat your chosen password" }),
}).refine((item) => item.password === item.passwordConfirm, {
    message: "Repeat your chosen password",
    path: ["passwordConfirm"],
});


// ---------- ACTIONS ---------- //

export const NewsletterSchema = z.object({
    email: z.email({ error: "Enter a valid email" }),
});

export const ContactSchema = z.object({
    name: z.string({ error: "Enter your name" }).min(1, { error: "Enter your name" }),
    email: z.email({ error: "Enter your email" }),
    message: z.string({ error: "Enter a message" }).min(1, { error: "Enter a message" }),
});


export const FitnessClassSchema = z.object({
    className: z.string({ error: "Enter a name" }).min(1, { error: "Enter a name" }),
    classDescription: z.string({ error: "Enter a description" }).min(1, { error: "Enter a description" }),
    classDay: z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"], { error: "Choose a day" }),
    classTime: z.iso.time({ precision: -1, error: "Enter a time" }),
    trainerId: z.enum(["1", "2", "3", "4"], { error: "Choose a trainer" }),
    maxParticipants: z.number({ error: "Enter a max for participants" }).min(1, { error: "Enter a max for participants" }),
    file: z.file({ error: "Upload an image" }).min(1, { error: "Upload an image" }),
})

export const FitnessClassSchemaWithAssetId = FitnessClassSchema.extend({
    assetId: z.string({ error: "Invalid assetId" }).min(1, { error: "Invalid assetId" })
}).omit({ file: true })