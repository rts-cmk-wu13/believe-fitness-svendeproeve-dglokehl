type MainProps = {
    children: React.ReactNode;
    className?: string;
}

export default function Main({ children, className }: MainProps) {
    return (
        <main className={`mt-header py-default *:px-default pb-10 ${className ? className : ""}`}>
            {children}
        </main>
    )
}