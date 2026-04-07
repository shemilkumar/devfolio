import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminNav from "@/components/ui/AdminNav";
import { SignOutButton } from "@clerk/nextjs";

const navItems = [
    { href: "/admin", label: "Dashboard", exact: true },
    { href: "/admin/projects/new", label: "New project" },
    { href: "/admin/posts/new", label: "New post" },
];

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    // If not logged in, send to Clerk's sign-in page
    if (!userId) redirect("/sign-in");

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">

            {/* Sidebar — full height, always visible */}
            <aside className="w-56 shrink-0 border-r border-zinc-800 flex flex-col sticky top-0 h-screen">
                {/* Logo */}
                <div className="px-6 py-5 border-b border-zinc-800 shrink-0">
                    <Link
                        href="/"
                        className="font-mono text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
                    >
                        <span className="text-emerald-400">~/</span>shemil
                    </Link>
                    <p className="font-mono text-xs text-zinc-600 mt-1">Admin panel</p>
                </div>

                {/* Nav — takes remaining space */}
                <div className="flex-1 overflow-auto">
                    <AdminNav />
                </div>

                {/* Bottom links — always pinned to bottom */}
                <div className="px-3 py-4 border-t border-zinc-800 space-y-1 shrink-0">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs text-zinc-600 hover:text-white hover:bg-zinc-800 transition-all duration-200"
                    >
                        ← back to site
                    </Link>
                    {/* <SignOutButton redirectUrl="/">
                        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs text-zinc-600 hover:text-red-400 hover:bg-zinc-800 transition-all duration-200">
                            sign out
                        </button>
                    </SignOutButton> */}

                    <Link
                        href="/sign-out"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs text-zinc-600 hover:text-red-400 hover:bg-zinc-800 transition-all duration-200"
                    >
                        sign out
                    </Link>
                </div>
            </aside>

            {/* Main — scrolls independently */}
            <main className="flex-1 overflow-auto h-screen">
                <div className="border-b border-zinc-800 px-8 py-4 flex items-center justify-between sticky top-0 bg-zinc-950 z-10">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="font-mono text-xs text-zinc-500">
                            Admin session active
                        </span>
                    </div>
                    <span className="font-mono text-xs text-zinc-700">
                        id: {userId.slice(0, 12)}...
                    </span>
                </div>
                <div className="px-8 py-10">{children}</div>
            </main>

        </div>
    );
}