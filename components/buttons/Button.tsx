import Link from "next/link"

type ButtonProps = {
    children?: React.ReactNode;
    href?: string;
    noBg?: boolean;
    className?: string;
}

export default function Button({ children, href, noBg, className }: ButtonProps) {
    const buttonStyle = noBg ? "button-app-transparent" : "button-app-default"

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