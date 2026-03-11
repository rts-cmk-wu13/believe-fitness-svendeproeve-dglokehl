import { fetchNoCache } from "@/app/api/fetches"
import type { Asset, Trainer } from "@/app/api/types"

type TrainerCardProps = {
    trainer: Trainer;
    className?: string;
}

export default async function TrainerCard({ trainer, className }: TrainerCardProps) {
    const trainerImage: Asset = await fetchNoCache(`http://localhost:4000/api/v1/assets/${trainer.assetId}`)
    // console.log("trainerImage:", trainerImage)

    return (
        <div className={`flex items-center gap-5 ${className ? className : ""}`}>
            <img src={trainerImage.url} alt="" className="size-22 rounded-2xl object-cover" />
            <p className="font-semibold">{trainer.trainerName}</p>
        </div>
    )
}