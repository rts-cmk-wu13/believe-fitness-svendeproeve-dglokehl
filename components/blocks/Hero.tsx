import Image from "next/image";
import Button from "../buttons/Button"
import HeroImage from "@/assets/hero.jpg"
import LoginLogoutButton from "../buttons/LoginLogoutButton";

type HeroProps = {
    className?: string;
}

export default async function Hero({ className }: HeroProps) {
    return (
        <div className={`p-0! relative ${className ? className : ""}`}>
            <div className="space-y-3 absolute inset-x-5 bottom-5 z-2">
                <h1 className="text-4xl font-bold text-app-yellow">Welcome to<br />Believe Fitness</h1>
                <div className="flex gap-3 *:px-6 *:uppercase">
                    <Button href="/classes">Classes</Button>
                    <LoginLogoutButton />
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