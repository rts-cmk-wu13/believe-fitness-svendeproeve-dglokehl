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

export type FitnessClassRating = {
    id: number;
    classId: number;
    userId: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
}


export type NewsArticle = {
    id: number;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    trainer: Trainer;
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
    assetId: number;
    asset: Asset;
}


export type FormState = {
    message?: string;
    errors?: any
    inputs?: any
}