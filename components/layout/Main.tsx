type MainProps = {
    children: React.ReactNode;
    className?: string;
}

export default function Main({ children, className }: MainProps) {
    return (
        <main className={`py-default *:px-default ${className ? className : ""}`}>
            {children}
        </main>
    )
}