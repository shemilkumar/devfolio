import { getPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Blog — Shemil",
    description: "Thoughts on frontend development, React, and building for the web.",
};

export const revalidate = 3600;
// export const dynamic = "force-dynamic";

const posts = await getPosts();

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
                    {posts.map((post: Record<string, any>) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col sm:flex-row sm:items-start gap-4 py-8 hover:bg-zinc-900/30 -mx-4 px-4 rounded-xl transition-all duration-200"
                        >
                            {/* Date column */}
                            <div className="sm:w-36 shrink-0">
                                <time className="font-mono text-xs text-zinc-600">
                                    {formatDate(post.created_at)}
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
                                    {post.tags.map((tag: any) => (
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