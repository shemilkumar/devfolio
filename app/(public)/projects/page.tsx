import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Projects — Your Name",
    description: "Things I've designed and built.",
};

// ISR: rebuild this page every hour in the background
// Once you connect Supabase, replace this with: const projects = await getProjects()
export const revalidate = 3600;

// ── Static placeholder data (replace with Supabase later) ──────────────────
const projects = [
    {
        id: "1",
        slug: "devfolio",
        title: "DevFolio",
        description:
            "A full-stack personal portfolio and blog platform built with Next.js 15, Supabase, and Clerk auth.",
        tech_stack: ["Next.js", "TypeScript", "Supabase", "Tailwind", "Clerk"],
        github_url: "https://github.com",
        live_url: "https://example.com",
        status: "live",
    },
    {
        id: "2",
        slug: "dashboard-app",
        title: "Analytics Dashboard",
        description:
            "Real-time analytics dashboard with interactive charts, dark mode, and CSV export.",
        tech_stack: ["React", "TypeScript", "Recharts", "Tailwind"],
        github_url: "https://github.com",
        live_url: null,
        status: "wip",
    },
    {
        id: "3",
        slug: "ecommerce-ui",
        title: "E-commerce UI Kit",
        description:
            "A component library for e-commerce UIs — product cards, cart drawer, checkout flow.",
        tech_stack: ["React", "Storybook", "CSS Modules"],
        github_url: "https://github.com",
        live_url: "https://example.com",
        status: "live",
    },
    {
        id: "4",
        slug: "weather-app",
        title: "Weather App",
        description:
            "Location-aware weather app with 7-day forecast, animated conditions, and offline support.",
        tech_stack: ["Next.js", "OpenWeather API", "PWA"],
        github_url: "https://github.com",
        live_url: null,
        status: "archived",
    },
];

const statusStyles: Record<string, string> = {
    live: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    wip: "bg-amber-500/10  text-amber-400  border-amber-500/20",
    archived: "bg-zinc-800      text-zinc-500   border-zinc-700",
};

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="max-w-5xl mx-auto px-6 py-20 space-y-14">

                {/* Header */}
                <div className="space-y-4">
                    <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
            // projects
                    </p>
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                        Things I've built
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                        A mix of personal projects, experiments, and client work. All source
                        code is on GitHub unless otherwise noted.
                    </p>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-6 font-mono text-sm border-y border-zinc-800 py-5">
                    <span className="text-zinc-500">
                        total <span className="text-white font-semibold">{projects.length}</span>
                    </span>
                    <span className="text-zinc-500">
                        live <span className="text-emerald-400 font-semibold">{projects.filter((p) => p.status === "live").length}</span>
                    </span>
                    <span className="text-zinc-500">
                        in progress <span className="text-amber-400 font-semibold">{projects.filter((p) => p.status === "wip").length}</span>
                    </span>
                    <span className="text-zinc-500">
                        archived <span className="text-zinc-400 font-semibold">{projects.filter((p) => p.status === "archived").length}</span>
                    </span>
                </div>

                {/* Project grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.slug}`}
                            className="group relative flex flex-col p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-200"
                        >
                            {/* Top row */}
                            <div className="flex items-start justify-between mb-3">
                                <h2 className="font-semibold text-white text-lg group-hover:text-emerald-400 transition-colors leading-tight">
                                    {project.title}
                                </h2>
                                <div className="flex items-center gap-2 ml-3 shrink-0">
                                    <span className={`font-mono text-xs px-2 py-0.5 rounded border ${statusStyles[project.status]}`}>
                                        {project.status === "wip" ? "in progress" : project.status}
                                    </span>
                                    <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors text-lg">↗</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-5">
                                {project.description}
                            </p>

                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {project.tech_stack.map((tech) => (
                                    <span key={tech} className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-500">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex gap-3 pt-4 border-t border-zinc-800">
                                {project.github_url && (
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                                        className="font-mono text-xs text-zinc-500 hover:text-white transition-colors"
                                    >
                                        github ↗
                                    </a>
                                )}
                                {project.live_url && (
                                    <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                                        className="font-mono text-xs text-emerald-600 hover:text-emerald-400 transition-colors"
                                    >
                                        live demo ↗
                                    </a>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Footer note */}
                <p className="font-mono text-xs text-zinc-600 text-center">
                    more projects on{" "}
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-white transition-colors">
                        github.com/yourhandle ↗
                    </a>
                </p>

            </div>
        </div>
    );
}