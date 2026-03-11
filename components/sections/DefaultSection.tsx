type DefaultSectionProps = {
    children: React.ReactNode;
    heading: string;
    className?: string;
}

export default function DefaultSection({ children, heading, className }: DefaultSectionProps) {
    return (
        <section className={`space-y-3 ${className ? className : ""}`}>
            <h2 className="text-xl font-bold">{heading}</h2>
            {children}
        </section>
    )
}