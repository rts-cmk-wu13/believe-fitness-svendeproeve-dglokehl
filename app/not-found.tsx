import Link from "next/link";

export const metadata = {
    title: "404 Page not found"
}

export default async function NotFound() {
    return (
        <div className="h-dvh flex flex-col justify-center items-center gap-12 text-center">
            <div className="space-y-1">
                <h1 className="text-7xl font-bold">404</h1>
                <h2 className="text-3xl font-medium">Page not found</h2>
            </div>
            <Link href="/" className="text-xl text-center underline">Return to home page?</Link>
        </div>
    );
}