export type FormState = {
    message?: string;
    errors?: any
    inputs?: any
}


// ---------- 1 ---------- //

export type Asset = {
    id: number;
    url: string;
    createdAt: string;
    updatedAt: string;
}

export type Trainer = {
    id: number;
    trainerName: string;
    createdAt: string;
    updatedAt: string;
    assetId: number;
}

export type UserRole = "default" | "admin"


// ---------- 2 ---------- //

export type NewsArticle = {
    id: number;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    assetId: number;
    asset: Asset;
}

export type FitnessClass = {
    id: number;
    className: string;
    classDescription: string;
    classDay: string;
    classTime: string;
    maxParticipants: number;
    createdAt: string;
    updatedAt: string;
    trainerId: number;
    trainer: Trainer;
    assetId: number;
    asset: Asset;
    users: User[];
}

export type FitnessClassRating = {
    id: number;
    classId: number;
    userId: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

export type User = {
    classes: FitnessClass[];
    id: number;
    userFirstName: string;
    userLastName: string;
    username: string;
    password: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}
