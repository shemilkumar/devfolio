import { getPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

// Same posts array — later this comes from Supabase via lib/blog.ts
const posts = await getPosts();


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
                        <time>{formatDate(post.created_at)}</time>
                        <span>·</span>
                        <span>{post.read_time}</span>
                    </div>
                </header>

                {/* Post content */}
                {/* 
          For now this renders plain text with basic markdown-like headings.
          When you add MDX support later, replace this with your MDX renderer.
        */}
                {/* <article className="space-y-6">
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
                </article> */}

                <ReactMarkdown
                    components={{
                        p: ({ children }) => (
                            <p className="text-zinc-400 leading-relaxed text-base mb-3">
                                {children}
                            </p>
                        ),
                        h2: ({ children }) => (
                            <h3 className="text-white font-semibold text-lg mt-6 mb-2">
                                {children}
                            </h3>
                        ),
                        h3: ({ children }) => (
                            <h4 className="text-zinc-200 font-medium mt-4 mb-2">
                                {children}
                            </h4>
                        ),
                        ul: ({ children }) => (
                            <ul className="space-y-2 my-3">{children}</ul>
                        ),
                        li: ({ children }) => (
                            <li className="flex items-start gap-2 text-zinc-400 text-base leading-relaxed">
                                <span className="text-emerald-400 mt-1.5 shrink-0 text-xs">▹</span>
                                <span>{children}</span>
                            </li>
                        ),
                        strong: ({ children }) => (
                            <strong className="text-zinc-200 font-semibold">{children}</strong>
                        ),
                        a: ({ href, children }) => (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors"
                            >
                                {children}
                            </a>
                        ),
                        code: ({ children }) => (
                            <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400">
                                {children}
                            </code>
                        ),
                    }}
                >
                    {post.content ?? ""}
                </ReactMarkdown>

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