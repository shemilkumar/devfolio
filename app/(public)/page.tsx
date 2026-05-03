import { MY_EMAIL_ADDRESS } from "@/utils/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shemilkumar | Senior Frontend Developer | Angular & React",
  description:
    "Shemilkumar is a senior frontend developer in Bengaluru specializing in Angular, React, and Next.js. Explore projects, case studies, and modern web architecture insights."
};

// Static skills list — edit this to match yours
const skills = [
  "Angular", "React", "Next.js", "TypeScript", "Tailwind CSS",
  "Node.js", "REST APIs", "Git", "Figma",
];

// A few pinned projects shown on homepage — later these will come from Supabase
const featured = [
  {
    title: "Montana Resort - Resort Booking Website",
    description: "Montana Resort is a beautifully designed, fully responsive website showcasing a premium hotel experience.",
    tags: ["Next.js", "Tailwind", "Redux"],
    href: "/projects/montana-resort---resort-booking-website",
  },
  {
    title: "Restaurantly - Food Ordering Platform",
    description: "Restaurantly is a visually engaging website designed for online food ordering.",
    tags: ["Angular", "Tailwind", "RXJS"],
    href: "/projects/restaurantly---food-ordering-platform",
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-28">

        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="space-y-8">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border border-zinc-800 text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            open to new opportunities
          </div>

          {/* Name + title */}
          <div className="space-y-3">
            {/* <span className="flex gap-4 text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Hey, I'm{" "}
              <h1 className="text-emerald-400">Shemilkumar</h1>
            </span>
            <p className="font-mono text-zinc-500 text-sm tracking-widest uppercase">
              Sr. Frontend Developer · Team Lead · Angular · Next.js · React
            </p> */}

            <div className="flex gap-4 ">
              <span className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">Hey, I'm</span>

              <h1 className="text-emerald-400 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1]">
                Shemilkumar
              </h1>
            </div>

            <p className="font-mono text-zinc-500 text-sm tracking-widest uppercase">
              Senior Frontend Developer · Angular · React · Next.js
            </p>
          </div>

          {/* Bio */}
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
            I build fast, accessible web experiences. Focused on clean code,
            good UX, and shipping things that actually work. Based in{" "}
            <span className="text-zinc-200 font-semibold">Bengaluru, India</span>.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              View my work
              <span className="text-base">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              Get in touch
            </Link>
            <a
              href="/shemilkumar.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              Resume ↗
            </a>
          </div>
        </section>

        {/* ── Skills ─────────────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
            // skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="font-mono text-xs px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white transition-all duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* ── Featured Projects ───────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              // featured projects
            </h2>
            <Link
              href="/projects"
              className="font-mono text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              all projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                className="group p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-200 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors text-lg">
                    ↗
                  </span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Currently ──────────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
            // currently
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "building", value: "This portfolio with Next.js" },
              { label: "learning", value: "Full-stack patterns & Supabase" },
              { label: "reading", value: "The Pragmatic Programmer" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/30 space-y-1"
              >
                <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
                  {label}
                </p>
                <p className="text-zinc-300 text-sm">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer CTA ─────────────────────────────────────── */}
        <section className="border-t border-zinc-800 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-zinc-200 font-semibold">Let's build something.</p>
            <p className="text-zinc-500 text-sm mt-1">
              Open to freelance, full-time, or just a good conversation.
            </p>
          </div>
          <a
            href={`mailto:${MY_EMAIL_ADDRESS}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-sm transition-all duration-200 whitespace-nowrap"
          >
            {MY_EMAIL_ADDRESS}
          </a>
        </section>

      </div>
    </div>
  );
}