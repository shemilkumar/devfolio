"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/lib/actions";

type Status = "idle" | "loading" | "error";

export default function NewProjectPage() {
    const router = useRouter();
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        long_description: "",
        tech_stack: "",
        github_url: "",
        live_url: "",
        year: new Date().getFullYear().toString(),
        status: "wip",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            // TODO: replace with real server action once Supabase is set up
            // const result = await createProject(new FormData(e.currentTarget))
            // if (!result.success) throw new Error(result.error)

            const result = await createProject(new FormData(e.currentTarget));
            if (!result?.success) throw new Error(result?.error);

            router.push("/admin");
        } catch (err) {
            setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
            setStatus("error");
        }
    }

    const inputClass =
        "w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-100 placeholder-zinc-600 font-mono text-sm focus:outline-none focus:border-emerald-600 focus:bg-zinc-900 transition-all duration-200";

    const labelClass =
        "font-mono text-xs text-zinc-500 uppercase tracking-widest";

    return (
        <div className="max-w-2xl space-y-8">

            {/* Header */}
            <div className="space-y-1">
                <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          // new project
                </p>
                <h1 className="text-3xl font-bold text-white">Add a project</h1>
                <p className="text-zinc-400 text-sm">
                    Fill in the details below. You can edit everything later.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title */}
                <div className="space-y-1.5">
                    <label htmlFor="title" className={labelClass}>title *</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="My Awesome Project"
                        className={inputClass}
                    />
                </div>

                {/* Short description */}
                <div className="space-y-1.5">
                    <label htmlFor="description" className={labelClass}>
                        short description *
                    </label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="One sentence about the project"
                        className={inputClass}
                    />
                    <p className="font-mono text-xs text-zinc-700">
                        shown on the projects listing page
                    </p>
                </div>

                {/* Long description */}
                <div className="space-y-1.5">
                    <label htmlFor="long_description" className={labelClass}>
                        full description
                    </label>
                    <textarea
                        id="long_description"
                        name="long_description"
                        rows={5}
                        value={formData.long_description}
                        onChange={handleChange}
                        placeholder="Tell the full story — what you built, why, what you learned..."
                        className={`${inputClass} resize-none`}
                    />
                    <p className="font-mono text-xs text-zinc-700">
                        shown on the project detail page
                    </p>
                </div>

                {/* Tech stack */}
                <div className="space-y-1.5">
                    <label htmlFor="tech_stack" className={labelClass}>
                        tech stack *
                    </label>
                    <input
                        id="tech_stack"
                        name="tech_stack"
                        type="text"
                        required
                        value={formData.tech_stack}
                        onChange={handleChange}
                        placeholder="Next.js, TypeScript, Tailwind, Supabase"
                        className={inputClass}
                    />
                    <p className="font-mono text-xs text-zinc-700">
                        comma-separated — e.g. React, TypeScript, Tailwind
                    </p>
                </div>

                {/* GitHub + Live URL row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label htmlFor="github_url" className={labelClass}>github url</label>
                        <input
                            id="github_url"
                            name="github_url"
                            type="url"
                            value={formData.github_url}
                            onChange={handleChange}
                            placeholder="https://github.com/you/repo"
                            className={inputClass}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="live_url" className={labelClass}>live url</label>
                        <input
                            id="live_url"
                            name="live_url"
                            type="url"
                            value={formData.live_url}
                            onChange={handleChange}
                            placeholder="https://yourproject.com"
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* Year + Status row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label htmlFor="year" className={labelClass}>year</label>
                        <input
                            id="year"
                            name="year"
                            type="text"
                            value={formData.year}
                            onChange={handleChange}
                            placeholder="2025"
                            className={inputClass}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label htmlFor="status" className={labelClass}>status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className={`${inputClass} cursor-pointer appearance-none`}
                        >
                            <option value="wip">In progress</option>
                            <option value="live">Live</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                </div>

                {/* Error */}
                {status === "error" && (
                    <div className="px-4 py-3 rounded-xl border border-red-900/50 bg-red-950/20">
                        <p className="font-mono text-xs text-red-400">{errorMsg}</p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-mono text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed"
                    >
                        {status === "loading" ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-3.5 h-3.5 rounded-full border-2 border-zinc-500 border-t-transparent animate-spin" />
                                saving...
                            </span>
                        ) : (
                            "save project →"
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/admin")}
                        className="px-6 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white font-mono text-sm transition-all duration-200"
                    >
                        cancel
                    </button>
                </div>

            </form>
        </div>
    );
}