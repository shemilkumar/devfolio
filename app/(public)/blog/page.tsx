import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Blog — Shemil",
    description: "Thoughts on frontend development, React, and building for the web.",
};

export const revalidate = 3600;

// ── Static placeholder data (replace with Supabase later) ──────────────────
const posts = [
    {
        id: "1",
        slug: "getting-started-with-nextjs",
        title: "Getting started with Next.js App Router",
        excerpt:
            "The App Router is a fundamental shift in how Next.js works. Here's everything I learned building my first project with it.",
        date: "2025-03-10",
        read_time: "6 min read",
        tags: ["Next.js", "React", "Tutorial"],
    },
    {
        id: "2",
        slug: "tailwind-tips",
        title: "10 Tailwind CSS tricks I use every day",
        excerpt:
            "After two years of daily Tailwind usage, these are the patterns and utilities that make me significantly faster.",
        date: "2025-02-22",
        read_time: "4 min read",
        tags: ["Tailwind", "CSS"],
    },
    {
        id: "3",
        slug: "typescript-for-react-devs",
        title: "TypeScript for React developers — a practical guide",
        excerpt:
            "Not the theoretical TypeScript guide. The one that shows you what you'll actually use when building React apps day to day.",
        date: "2025-01-18",
        read_time: "8 min read",
        tags: ["TypeScript", "React"],
    },
    {
        id: "4",
        slug: "supabase-auth-nextjs",
        title: "Setting up Supabase auth in Next.js",
        excerpt:
            "A step-by-step walkthrough of adding Supabase authentication to a Next.js 15 project using the App Router.",
        date: "2024-12-05",
        read_time: "10 min read",
        tags: ["Supabase", "Auth", "Next.js"],
    },
];

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="max-w-5xl mx-auto px-6 py-20 space-y-14">

                {/* Header */}
                <div className="space-y-4">
                    <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                        // blog
                    </p>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                        Writing
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                        Thoughts on frontend development, React, and building things for
                        the web. No fluff — just stuff I actually found useful.
                    </p>
                </div>

                {/* Post count */}
                <div className="border-y border-zinc-800 py-4">
                    <p className="font-mono text-xs text-zinc-500">
                        {posts.length} posts published
                    </p>
                </div>

                {/* Posts list */}
                <div className="divide-y divide-zinc-800/60">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col sm:flex-row sm:items-start gap-4 py-8 hover:bg-zinc-900/30 -mx-4 px-4 rounded-xl transition-all duration-200"
                        >
                            {/* Date column */}
                            <div className="sm:w-36 shrink-0">
                                <time className="font-mono text-xs text-zinc-600">
                                    {formatDate(post.date)}
                                </time>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between gap-4">
                                    <h2 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                                        {post.title}
                                    </h2>
                                    <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors text-lg shrink-0">
                                        ↗
                                    </span>
                                </div>

                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="font-mono text-xs text-zinc-600">
                                        {post.read_time}
                                    </span>
                                    <span className="text-zinc-700">·</span>
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-500"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}