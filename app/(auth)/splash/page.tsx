import Image from "next/image"
import Splash1 from "@/assets/splash1.jpg"
import Splash2 from "@/assets/splash2.jpg"
import Logo from "@/components/branding/Logo"
import Button from "@/components/buttons/Button"

const imageArr = [
    {
        src: Splash1,
        width: 410,
        height: 812,
    },
    {
        src: Splash2,
        width: 375,
        height: 812,
    },
]

export default async function SplashPage() {
    const randNum = Math.random()
    console.log("randNum:", randNum)

    const randImage = randNum < 0.5 ? imageArr[0] : imageArr[1]

    return (
        <>
            <Image
                src={randImage.src}
                alt="Background element"
                width={randImage.width}
                height={randImage.height}
                className={`w-full h-dvh object-cover`}
            />
            <div className="w-full flex flex-col items-center gap-16 absolute bottom-12 z-1">
                <Logo inverted className="self-start" />
                <Button href="/" className="px-7">
                    START TRAINING
                </Button>
            </div>
        </>
    )
}