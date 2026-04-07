"use client";

import { MY_EMAIL_ADDRESS } from "@/utils/constants";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
    { href: "/", label: "home" },
    { href: "/projects", label: "projects" },
    { href: "/blog", label: "blog" },
    { href: "/contact", label: "contact" },
];

export default function Navbar() {
    const { userId } = useAuth();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
            <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

                {/* Logo */}
                <Link
                    href="/"
                    className="font-mono text-sm font-semibold text-white tracking-tight hover:text-emerald-400 transition-colors duration-200"
                >
                    <span className="text-emerald-400">~/</span>shemil
                </Link>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-1">
                    {links.map(({ href, label }) => {
                        const isActive =
                            href === "/" ? pathname === "/" : pathname.startsWith(href);
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={`font-mono text-xs px-3 py-1.5 rounded-md transition-all duration-200 ${isActive
                                        ? "text-emerald-400 bg-emerald-400/10"
                                        : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                                        }`}
                                >
                                    {isActive && <span className="text-emerald-600 mr-1">›</span>}
                                    {label}
                                </Link>
                            </li>
                        );
                    })}

                    {
                        userId && (
                            <li>
                                <Link
                                    href="/admin"
                                    className="font-mono text-xs px-3 py-1.5 rounded-md border border-zinc-700 text-zinc-500 hover:text-emerald-400 hover:border-emerald-800 transition-all duration-200"
                                >
                                    Admin
                                </Link>
                            </li>
                        )
                    }
                </ul>

                {/* Hire me CTA — desktop */}
                <a
                    href={`mailto:${MY_EMAIL_ADDRESS}`}
                    className="hidden md:inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-md border border-zinc-700 text-zinc-300 hover:border-emerald-500 hover:text-emerald-400 transition-all duration-200"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available for work
                </a>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-zinc-400 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="flex flex-col gap-1.5 w-5">
                        <span
                            className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                        />
                        <span
                            className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
                        />
                        <span
                            className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                        />
                    </div>
                </button>
            </nav>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-zinc-800 bg-zinc-950">
                    <ul className="max-w-5xl mx-auto px-6 py-3 flex flex-col gap-1">
                        {links.map(({ href, label }) => {
                            const isActive =
                                href === "/" ? pathname === "/" : pathname.startsWith(href);
                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        onClick={() => setMenuOpen(false)}
                                        className={`block font-mono text-sm px-3 py-2 rounded-md transition-all duration-200 ${isActive
                                            ? "text-emerald-400 bg-emerald-400/10"
                                            : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                                            }`}
                                    >
                                        {isActive && <span className="text-emerald-600 mr-2">›</span>}
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="pt-2 border-t border-zinc-800 mt-1">
                            <a
                                href={`mailto:${MY_EMAIL_ADDRESS}`}
                                className="flex items-center gap-2 font-mono text-sm px-3 py-2 text-zinc-400 hover:text-emerald-400 transition-colors"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Available for work
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}