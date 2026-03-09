export default async function PagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <section className="mb-12 pt-10 space-y-5">
                <h1 className="pl-11 text-6xl font-bold text-app-yellow">Believe<br />Fitness</h1>
                <div className="flex items-center gap-3.5">
                    <div className="h-0.5 w-8 bg-app-black"></div>
                    <p className="text-xl font-bold">Train like a pro</p>
                </div>
            </section>
            {children}
        </>
    );
}