import Link from "next/link";
import { fetchNoCache } from "@/app/api/fetches";
import type { FitnessClass, FitnessClassRating } from "@/app/api/types"
import StarRating from "../StarRating";

type FitnessClassCardProps = {
    fitnessClass: FitnessClass;
    size?: "sm" | "lg"
    className?: string;
}

export default async function FitnessClassCard({ fitnessClass, size, className }: FitnessClassCardProps) {
    const ratings: FitnessClassRating[] = await fetchNoCache(`http://localhost:4000/api/v1/classes/${fitnessClass.id}/ratings`)
    console.log("ratings:", ratings)

    return (
        <article className={`${size !== "lg" ? "w-32 h-36" : "w-full h-100"} rounded-2xl overflow-hidden hover-75 ${className ? className : ""}`}>
            <Link href={`/classes/${fitnessClass.id}`} className="size-full block relative">
                <div className="py-2 px-4 flex flex-col gap-1 absolute bottom-0 inset-x-0 z-2 bg-app-yellow text-app-black rounded-tr-4xl">
                    <p className="text-xs font-semibold line-clamp-1">{fitnessClass.className}</p>
                    <StarRating ratings={ratings} />
                </div>

                <img src={fitnessClass.asset.url} alt={fitnessClass.className} className="size-full object-cover" />
            </Link>
        </article>
    )
}