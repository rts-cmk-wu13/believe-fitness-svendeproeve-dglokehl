import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/assets/hero.jpg"
import { getToken } from "@/utils/cookies";

type HeroProps = {
    className?: string;
}

export default async function Hero({ className }: HeroProps) {
    const token = await getToken()

    return (
        <div className={`p-0! relative ${className ? className : ""}`}>
            <div className="space-y-3 absolute inset-x-5 bottom-5 z-2">
                <h1 className="text-4xl font-bold text-app-yellow">Welcome to<br />Believe Fitness</h1>
                <div className="flex gap-3 *:px-6 *:button-app-default">
                    <Link href="/classes">Classes</Link>
                    <Link href={!token ? "/login" : "/logout"}>{!token ? "Log In" : "Log Out"}</Link>
                </div>
            </div>

            <figure className="h-80 w-full relative">
                <div className="size-full absolute inset-0 bg-black/40"></div>
                <Image
                    src={HeroImage}
                    alt="People training"
                    width={1500}
                    height={791}
                    className={`size-full object-cover`}
                />
            </figure>
        </div>
    )
}