"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "loading" | "error";

export default function NewPostPage() {
    const router = useRouter();
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        tags: "",
        read_time: "",
        published: false,
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const value =
            e.target.type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : e.target.value;
        setFormData((prev) => ({ ...prev, [e.target.name]: value }));
    }

    // Auto-estimate reading time based on word count
    function estimateReadTime(text: string) {
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    }

    function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const content = e.target.value;
        setFormData((prev) => ({
            ...prev,
            content,
            read_time: estimateReadTime(content),
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            // TODO: replace with real server action once Supabase is set up
            // const result = await createPost(new FormData(e.currentTarget))
            // if (!result.success) throw new Error(result.error)
            await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay
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

    const wordCount = formData.content.trim()
        ? formData.content.trim().split(/\s+/).length
        : 0;

    return (
        <div className="max-w-2xl space-y-8">

            {/* Header */}
            <div className="space-y-1">
                <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          // new post
                </p>
                <h1 className="text-3xl font-bold text-white">Write a post</h1>
                <p className="text-zinc-400 text-sm">
                    Write in plain text or markdown. Reading time is estimated automatically.
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
                        placeholder="What's this post about?"
                        className={inputClass}
                    />
                </div>

                {/* Excerpt */}
                <div className="space-y-1.5">
                    <label htmlFor="excerpt" className={labelClass}>excerpt *</label>
                    <textarea
                        id="excerpt"
                        name="excerpt"
                        rows={2}
                        required
                        value={formData.excerpt}
                        onChange={handleChange}
                        placeholder="A one or two sentence summary shown on the blog listing page"
                        className={`${inputClass} resize-none`}
                    />
                </div>

                {/* Tags */}
                <div className="space-y-1.5">
                    <label htmlFor="tags" className={labelClass}>tags</label>
                    <input
                        id="tags"
                        name="tags"
                        type="text"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="Next.js, React, Tutorial"
                        className={inputClass}
                    />
                    <p className="font-mono text-xs text-zinc-700">comma-separated</p>
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label htmlFor="content" className={labelClass}>content *</label>
                        <div className="flex items-center gap-3 font-mono text-xs text-zinc-600">
                            <span>{wordCount} words</span>
                            {formData.read_time && (
                                <>
                                    <span>·</span>
                                    <span className="text-zinc-500">{formData.read_time}</span>
                                </>
                            )}
                        </div>
                    </div>
                    <textarea
                        id="content"
                        name="content"
                        rows={16}
                        required
                        value={formData.content}
                        onChange={handleContentChange}
                        placeholder={`Write your post here...\n\nUse ## for headings\nUse plain paragraphs for body text\n\nMDX support coming soon.`}
                        className={`${inputClass} resize-y leading-relaxed`}
                    />
                    <p className="font-mono text-xs text-zinc-700">
                        basic markdown supported — ## headings, paragraphs
                    </p>
                </div>

                {/* Publish toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/30">
                    <div>
                        <p className="text-zinc-200 text-sm font-medium">Publish immediately</p>
                        <p className="font-mono text-xs text-zinc-600 mt-0.5">
                            {formData.published
                                ? "post will be visible on your blog"
                                : "post will be saved as a draft"}
                        </p>
                    </div>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={formData.published}
                        onClick={() =>
                            setFormData((prev) => ({ ...prev, published: !prev.published }))
                        }
                        className={`relative w-11 h-6 rounded-full border transition-all duration-200 ${formData.published
                                ? "bg-emerald-500 border-emerald-500"
                                : "bg-zinc-800 border-zinc-700"
                            }`}
                    >
                        <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${formData.published ? "translate-x-5" : "translate-x-0"
                                }`}
                        />
                    </button>
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
                        ) : formData.published ? (
                            "publish post →"
                        ) : (
                            "save draft →"
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
