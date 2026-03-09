type LogoProps = {
    inverted?: boolean;
    className?: string;
}

export default function Logo({ inverted, className }: LogoProps) {
    return (
        <div className={`space-y-5 ${className ? className : ""}`}>
            <h1 className="pl-11 text-6xl font-bold text-app-yellow">Believe<br />Fitness</h1>
            <div className="flex items-center gap-3.5">
                <div className={`h-0.5 w-8 ${!inverted ? "bg-app-black" : "bg-app-white"}`}></div>
                <p className={`text-xl font-bold ${!inverted ? "text-app-black" : "text-app-white"}`}>Train like a pro</p>
            </div>
        </div>
    )
}