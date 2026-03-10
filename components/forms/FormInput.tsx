type FormInputProps = {
    children: React.ReactNode;
    error?: string[];
    className?: string;
}

export default function FormInput({ children, error, className }: FormInputProps) {
    // console.log("error:", error)
    return (
        <div className={`${className ? className : ""}`}>
            {children}
            {error && <p className="mt-1 px-5 text-xs font-medium text-red-400">{error[0]}</p>}
        </div>
    )
}