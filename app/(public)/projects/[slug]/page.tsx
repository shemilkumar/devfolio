import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const projects = [
    {
        id: "1",
        slug: "devfolio",
        title: "DevFolio",
        description:
            "A full-stack personal portfolio and blog platform built with Next.js 15, Supabase, and Clerk auth.",
        long_description:
            "DevFolio is the project you're looking at right now. Built to learn every major Next.js concept — App Router, server components, ISR, server actions, middleware, and the Metadata API — while shipping something actually useful. The admin panel lets me manage projects and posts through a protected dashboard without touching the codebase.",
        tech_stack: ["Next.js", "TypeScript", "Supabase", "Tailwind", "Clerk"],
        github_url: "https://github.com",
        live_url: "https://example.com",
        status: "live",
        year: "2025",
    },
    {
        id: "2",
        slug: "dashboard-app",
        title: "Analytics Dashboard",
        description:
            "Real-time analytics dashboard with interactive charts, dark mode, and CSV export.",
        long_description:
            "A dashboard that visualises user activity, revenue trends, and retention data in real time. Built with Recharts for the charts and a custom hook system for the data layer. Supports dark mode, responsive layout, and one-click CSV export for any chart.",
        tech_stack: ["React", "TypeScript", "Recharts", "Tailwind"],
        github_url: "https://github.com",
        live_url: null,
        status: "wip",
        year: "2025",
    },
    {
        id: "3",
        slug: "ecommerce-ui",
        title: "E-commerce UI Kit",
        description:
            "A component library for e-commerce UIs — product cards, cart drawer, checkout flow.",
        long_description:
            "A set of 40+ React components built for e-commerce: product grids, cart drawer with animations, multi-step checkout, size selectors, and quantity inputs. Every component is documented in Storybook with usage examples and prop tables.",
        tech_stack: ["React", "Storybook", "CSS Modules"],
        github_url: "https://github.com",
        live_url: "https://example.com",
        status: "live",
        year: "2024",
    },
    {
        id: "4",
        slug: "weather-app",
        title: "Weather App",
        description:
            "Location-aware weather app with 7-day forecast, animated conditions, and offline support.",
        long_description:
            "A PWA that uses the Geolocation API and OpenWeather to show current conditions and a 7-day forecast. Animated weather icons, a feels-like temperature gauge, and full offline support via a service worker. Installable on mobile.",
        tech_stack: ["Next.js", "OpenWeather API", "PWA"],
        github_url: "https://github.com",
        live_url: null,
        status: "archived",
        year: "2024",
    },
];

const statusStyles: Record<string, string> = {
    live: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    wip: "bg-amber-500/10  text-amber-400  border-amber-500/20",
    archived: "bg-zinc-800      text-zinc-500   border-zinc-700",
};

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return {};
    return {
        title: `${project.title} — Shemil`,
        description: project.description,
    };
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project: any = projects.find((p) => p.slug === slug);

    if (!project) notFound();

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="max-w-3xl mx-auto px-6 py-20 space-y-12">

                {/* Back link */}
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-white transition-colors"
                >
                    ← back to projects
                </Link>

                {/* Header */}
                <header className="space-y-5">
                    <div className="flex items-center gap-3">
                        <span
                            className={`font-mono text-xs px-2 py-1 rounded border ${statusStyles[project.status]}`}
                        >
                            {project.status === "wip" ? "in progress" : project.status}
                        </span>
                        <span className="font-mono text-xs text-zinc-600">{project.year}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                        {project.title}
                    </h1>

                    <p className="text-zinc-400 text-lg leading-relaxed">
                        {project.description}
                    </p>

                    {/* CTA links */}
                    <div className="flex gap-3 pt-2">
                        {project.github_url && (
                            <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-mono text-xs transition-all duration-200 hover:-translate-y-0.5"
                            >
                                github ↗
                            </a>
                        )}

                        {project.live_url && (
                            <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                            >
                                live demo ↗
                            </a>
                        )}
                    </div>
                </header>

                {/* Divider */}
                <div className="border-t border-zinc-800" />

                {/* Tech stack */}
                <section className="space-y-4">
                    <h2 className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
            // tech stack
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {project.tech_stack.map((tech: any) => (
                            <span
                                key={tech}
                                className="font-mono text-sm px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white transition-all duration-200"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

                {/* About */}
                <section className="space-y-4">
                    <h2 className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
            // about
                    </h2>
                    <p className="text-zinc-400 leading-relaxed text-base">
                        {project.long_description}
                    </p>
                </section>

                {/* Image placeholder */}
                <div className="w-full aspect-video rounded-xl border border-zinc-800 bg-zinc-900/50 flex items-center justify-center">
                    <p className="font-mono text-xs text-zinc-700">
                        project screenshot coming soon
                    </p>
                </div>

                {/* Footer nav */}
                <div className="border-t border-zinc-800 pt-8 flex justify-between items-center">
                    <Link
                        href="/projects"
                        className="font-mono text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
                    >
                        ← all projects
                    </Link>
                    <Link
                        href="/contact"
                        className="font-mono text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
                    >
                        work with me →
                    </Link>
                </div>

            </div >
        </div >
    );
}