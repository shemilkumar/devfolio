"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/admin", label: "Dashboard", exact: true },
    { href: "/admin/projects/new", label: "New project", exact: false },
    { href: "/admin/posts/new", label: "New post", exact: false },
];

export default function AdminNav() {
    const pathname = usePathname();

    return (
        <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map(({ href, label, exact }) => {
                const isActive = exact
                    ? pathname === href
                    : pathname.startsWith(href);

                return (
                    <Link
                        key={href}
                        href={href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs transition-all duration-200 ${isActive
                                ? "bg-zinc-800 text-white"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                            }`}
                    >
                        {isActive && (
                            <span className="text-emerald-400">›</span>
                        )}
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}