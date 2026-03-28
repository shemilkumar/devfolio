import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Same posts array — later this comes from Supabase via lib/blog.ts
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
        content: `
The Next.js App Router introduced a completely new mental model for building React apps. Instead of pages and API routes living side by side, everything is now organized around layouts, loading states, and server components.

## What changed

The biggest shift is that components are server components by default. This means they can fetch data directly — no useEffect, no useState, no loading spinners you have to wire up manually.

## Layouts

Layouts are the killer feature. You define a layout.tsx file in any folder and it wraps all the pages inside that folder. Change the layout, every page updates. The root layout wraps your entire app.

## What to do next

Start with a simple project. Build the pages, understand how layouts nest, then layer in data fetching. The App Router rewards you for learning it properly.
    `,
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
        content: `
Tailwind clicked for me the moment I stopped trying to fight it and started thinking in utilities. Here are the patterns I reach for constantly.

## Group hover

The group and group-hover utilities let you trigger styles on a child when the parent is hovered. Perfect for cards.

## Arbitrary values

Square brackets let you escape the design system when you need to: w-[742px], top-[117px]. Use sparingly but don't fight it.

## The divide utilities

Instead of adding border-bottom to every child except the last, just add divide-y to the parent. Clean and effortless.
    `,
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
        content: `
Most TypeScript guides teach you the language. This one teaches you the 20% of TypeScript that covers 80% of what you'll write in a React codebase.

## Typing props

Start here. Every component needs typed props. Use an interface, keep it next to the component, export it if other files need it.

## Typing useState

TypeScript usually infers this correctly. When it can't — like when initial state is null but later becomes an object — tell it explicitly: useState<User | null>(null).

## Typing events

onChange, onClick, onSubmit — these all have specific event types. React.ChangeEvent, React.MouseEvent, React.FormEvent. You'll memorize them fast.
    `,
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
        content: `
Supabase makes auth surprisingly approachable. Here's exactly how to wire it up in a Next.js App Router project.

## Install the package

You need @supabase/supabase-js and the helper @supabase/ssr. The ssr package handles cookies and server-side session management automatically.

## Create the client

One client for server components, one for client components. The difference is how they access cookies — server components use next/headers, client components use document.cookie.

## Protect routes

Use middleware to check the session on every request. If there's no session and the route is protected, redirect to login. That's the whole auth guard pattern.
    `,
    },
];

// Pre-build all blog post pages at deploy time
export async function generateStaticParams() {
    return posts.map((post) => ({ slug: post.slug }));
}

// Unique SEO metadata per post
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);
    if (!post) return {};
    return {
        title: `${post.title} — Shemil`,
        description: post.excerpt,
    };
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);

    // Triggers app/not-found.tsx automatically
    if (!post) notFound();

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="max-w-3xl mx-auto px-6 py-20 space-y-12">

                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-white transition-colors"
                >
                    ← back to blog
                </Link>

                {/* Post header */}
                <header className="space-y-5">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-500"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                        {post.title}
                    </h1>

                    <p className="text-zinc-400 text-lg leading-relaxed">
                        {post.excerpt}
                    </p>

                    <div className="flex items-center gap-3 font-mono text-xs text-zinc-600 border-t border-zinc-800 pt-5">
                        <time>{formatDate(post.date)}</time>
                        <span>·</span>
                        <span>{post.read_time}</span>
                    </div>
                </header>

                {/* Post content */}
                {/* 
          For now this renders plain text with basic markdown-like headings.
          When you add MDX support later, replace this with your MDX renderer.
        */}
                <article className="space-y-6">
                    {post.content.trim().split("\n\n").map((block, i) => {
                        if (block.startsWith("## ")) {
                            return (
                                <h2
                                    key={i}
                                    className="text-xl font-semibold text-white mt-10 mb-3"
                                >
                                    {block.replace("## ", "")}
                                </h2>
                            );
                        }
                        return (
                            <p key={i} className="text-zinc-400 leading-relaxed text-base">
                                {block}
                            </p>
                        );
                    })}
                </article>

                {/* Footer */}
                <div className="border-t border-zinc-800 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-zinc-400 text-sm">Written by</p>
                        <p className="text-white font-semibold">Shemil</p>
                    </div>
                    <Link
                        href="/blog"
                        className="font-mono text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
                    >
                        ← all posts
                    </Link>
                </div>

            </div>
        </div>
    );
}