import Link from "next/link"

type ButtonProps = {
    children?: React.ReactNode;
    href?: string;
    noBg?: boolean;
    className?: string;
}

export default function Button({ children, href, noBg, className }: ButtonProps) {
    const buttonStyle = `py-3 inline-block text-sm font-semibold text-center rounded-3xl hover-75 ${noBg ? "border-2 border-app-yellow text-app-yellow" : "bg-app-yellow text-app-black border-0"} ${className ? className : ""}`

    return (
        <>
            {href ? (
                <Link href={href} className={buttonStyle}>
                    {children}
                </Link>
            ) : (
                <button className={buttonStyle}>
                    {children}
                </button>
            )}
        </>
    )
}