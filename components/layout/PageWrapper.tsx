import Header from "./Header"
import Main from "./Main"

type PageWrapperProps = {
    children: React.ReactNode;
    header?: {
        className?: string;
    }
    main?: {
        className?: string;
    }
}

export default function PageWrapper({ children, header, main }: PageWrapperProps) {
    return (
        <>
            <Header className={header?.className} />
            <Main className={main?.className}>
                {children}
            </Main>
        </>
    )
}