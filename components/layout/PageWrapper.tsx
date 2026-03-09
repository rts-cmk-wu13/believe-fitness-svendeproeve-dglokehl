import Header from "./Header"
import Main from "./Main"

type PageWrapperProps = {
    children: React.ReactNode;
    className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
    return (
        <>
            <Header />
            <Main>
                {children}
            </Main>
        </>
    )
}