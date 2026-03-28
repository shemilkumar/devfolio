import Navbar from "@/components/ui/Navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="max-w-5xl mx-auto px-4 py-12">{children}</main>
        </div>
    );
}