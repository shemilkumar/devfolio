import Link from "next/link";

// SSR — always fresh data, never cached
export const dynamic = "force-dynamic";

// Static counts for now — replace with real Supabase queries later:
// const projects = await getProjects()
// const posts = await getPosts()
const stats = {
    projects: 4,
    posts: 4,
    messages: 0,
};

const recentProjects = [
    { slug: "devfolio", title: "DevFolio", status: "live" },
    { slug: "dashboard-app", title: "Analytics Dashboard", status: "wip" },
    { slug: "ecommerce-ui", title: "E-commerce UI Kit", status: "live" },
];

const recentPosts = [
    { slug: "getting-started-with-nextjs", title: "Getting started with Next.js App Router" },
    { slug: "tailwind-tips", title: "10 Tailwind CSS tricks I use every day" },
];

const statusStyles: Record<string, string> = {
    live: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    wip: "bg-amber-500/10  text-amber-400  border-amber-500/20",
    archived: "bg-zinc-800      text-zinc-500   border-zinc-700",
};

export default function AdminDashboard() {
    return (
        <div className="space-y-10 max-w-4xl">

            {/* Header */}
            <div className="space-y-1">
                <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          // dashboard
                </p>
                <h1 className="text-3xl font-bold text-white">Welcome back</h1>
                <p className="text-zinc-400 text-sm">
                    Manage your projects, blog posts, and site content from here.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: "projects", value: stats.projects, color: "text-white" },
                    { label: "blog posts", value: stats.posts, color: "text-white" },
                    { label: "messages", value: stats.messages, color: "text-zinc-500" },
                ].map(({ label, value, color }) => (
                    <div
                        key={label}
                        className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-2"
                    >
                        <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                            {label}
                        </p>
                        <p className={`text-4xl font-bold ${color}`}>{value}</p>
                    </div>
                ))}
            </div>

            {/* Quick actions */}
            <div className="space-y-3">
                <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          // quick actions
                </p>
                <div className="flex flex-wrap gap-3">
                    <Link
                        href="/admin/projects/new"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                    >
                        + new project
                    </Link>
                    <Link
                        href="/admin/posts/new"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-mono text-xs transition-all duration-200 hover:-translate-y-0.5"
                    >
                        + new post
                    </Link>
                    <Link
                        href="/"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-mono text-xs transition-all duration-200 hover:-translate-y-0.5"
                    >
                        view site ↗
                    </Link>
                </div>
            </div>

            {/* Recent projects */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
            // recent projects
                    </p>
                </div>
                <div className="rounded-xl border border-zinc-800 divide-y divide-zinc-800 overflow-hidden">
                    {recentProjects.map((project) => (
                        <div
                            key={project.slug}
                            className="flex items-center justify-between px-5 py-4 hover:bg-zinc-900/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className={`font-mono text-xs px-2 py-0.5 rounded border ${statusStyles[project.status]}`}
                                >
                                    {project.status}
                                </span>
                                <span className="text-zinc-200 text-sm font-medium">
                                    {project.title}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/projects/${project.slug}`}
                                    target="_blank"
                                    className="font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors"
                                >
                                    view ↗
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent posts */}
            <div className="space-y-4">
                <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          // recent posts
                </p>
                <div className="rounded-xl border border-zinc-800 divide-y divide-zinc-800 overflow-hidden">
                    {recentPosts.map((post) => (
                        <div
                            key={post.slug}
                            className="flex items-center justify-between px-5 py-4 hover:bg-zinc-900/50 transition-colors"
                        >
                            <span className="text-zinc-200 text-sm font-medium">
                                {post.title}
                            </span>
                            <Link
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                className="font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors"
                            >
                                view ↗
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}