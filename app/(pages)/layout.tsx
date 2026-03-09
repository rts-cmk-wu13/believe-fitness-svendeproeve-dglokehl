export default async function PagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="pt-header">
            {children}
        </div>
    );
}