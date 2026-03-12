import Link from "next/link";
import type { FitnessClass } from "@/app/api/types"
import FitnessClassStarRating from "../blocks/FitnessClassStarRating";

type FitnessClassCardProps = {
    fitnessClass: FitnessClass;
    size?: "sm" | "md" | "lg"
    className?: string;
}

export default async function FitnessClassCard({ fitnessClass, size, className }: FitnessClassCardProps) {
    return (
        <article className={`${size === "lg" ? "w-full h-100" : size === "md" ? "w-full h-40" : "w-32 h-36"} rounded-2xl overflow-hidden hover-75 ${className ? className : ""}`}>
            <Link href={`/classes/${fitnessClass.id}`} className="size-full block relative">
                <div className={`pt-2 pb-3 px-4 space-y-1 absolute z-2 bottom-0 ${size === "lg" ? "left-0 pr-14" : "inset-x-0"} bg-app-yellow text-app-black rounded-tr-4xl`}>
                    <p className={`${size === "lg" ? "text-sm" : "text-xs"} font-semibold line-clamp-1 `}>{fitnessClass.className}</p>
                    <FitnessClassStarRating classId={fitnessClass.id} />
                </div>

                <img src={fitnessClass.asset.url} alt={fitnessClass.className} className="size-full object-cover" />
            </Link>
        </article>
    )
}