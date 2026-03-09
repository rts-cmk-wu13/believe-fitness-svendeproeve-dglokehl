export type Asset = {
    id: number;
    url: string;
    createdAt: string;
    updatedAt: string;
}


export type NewsArticle = {
    id: number;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    assetId: number;
    asset: Asset;
}


export type FormState = {
    message?: string;
    errors?: any
    inputs?: any
}