"use client";

import { sendContactMessage } from "@/lib/actions";
import { MY_EMAIL_ADDRESS } from "@/utils/constants";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
    const [status, setStatus] = useState<Status>("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");

        try {
            const form = e.currentTarget;
            const data = new FormData(form);
            const result = await sendContactMessage(data);

            if (!result.success) throw new Error(result.error);

            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch {
            setStatus("error");
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="max-w-5xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* ── Left: Info ─────────────────────────────────── */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                                // contact
                            </p>
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                                Let's talk
                            </h1>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Have a project in mind, a question, or just want to say hi?
                                Fill in the form and I'll get back to you within a day or two.
                            </p>
                        </div>

                        {/* Contact details */}
                        <div className="space-y-4">
                            {[
                                {
                                    label: "email",
                                    value: MY_EMAIL_ADDRESS,
                                    href: `mailto:${MY_EMAIL_ADDRESS}`,
                                },
                                {
                                    label: "github",
                                    value: "github.com/shemilkumar",
                                    href: "https://github.com/shemilkumar",
                                },
                                {
                                    label: "linkedin",
                                    value: "linkedin.com/in/shemilkumar",
                                    href: "https://linkedin.com",
                                },
                            ].map(({ label, value, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-200 group"
                                >
                                    <span className="font-mono text-xs text-zinc-600 w-16 shrink-0">
                                        {label}
                                    </span>
                                    <span className="text-zinc-300 text-sm group-hover:text-emerald-400 transition-colors">
                                        {value}
                                    </span>
                                    <span className="ml-auto text-zinc-700 group-hover:text-zinc-400 transition-colors">
                                        ↗
                                    </span>
                                </a>
                            ))}
                        </div>

                        {/* Availability */}
                        <div className="p-5 rounded-xl border border-emerald-900/40 bg-emerald-950/20 space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
                                    available for work
                                </span>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Open to frontend roles, freelance projects, and interesting
                                collaborations. Based in Bengaluru — open to remote.
                            </p>
                        </div>
                    </div>

                    {/* ── Right: Form ────────────────────────────────── */}
                    <div>
                        {status === "success" ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-5 p-8 rounded-2xl border border-emerald-900/40 bg-emerald-950/20">
                                <div className="w-14 h-14 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-2xl">
                                    ✓
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-xl font-semibold text-white">Message sent!</h2>
                                    <p className="text-zinc-400 text-sm">
                                        Thanks for reaching out. I'll reply to{" "}
                                        <span className="text-zinc-200">{formData.email || "you"}</span> soon.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="font-mono text-xs text-zinc-500 hover:text-white transition-colors mt-4"
                                >
                                    send another →
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* Name + Email row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label
                                            htmlFor="name"
                                            className="font-mono text-xs text-zinc-500 uppercase tracking-widest"
                                        >
                                            name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your name"
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-100 placeholder-zinc-600 font-mono text-sm focus:outline-none focus:border-emerald-600 focus:bg-zinc-900 transition-all duration-200"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label
                                            htmlFor="email"
                                            className="font-mono text-xs text-zinc-500 uppercase tracking-widest"
                                        >
                                            email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder='your@example.com'
                                            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-100 placeholder-zinc-600 font-mono text-sm focus:outline-none focus:border-emerald-600 focus:bg-zinc-900 transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="subject"
                                        className="font-mono text-xs text-zinc-500 uppercase tracking-widest"
                                    >
                                        subject
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-100 font-mono text-sm focus:outline-none focus:border-emerald-600 focus:bg-zinc-900 transition-all duration-200 appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled className="text-zinc-600">
                                            Select a topic...
                                        </option>
                                        <option value="freelance">Freelance project</option>
                                        <option value="fulltime">Full-time opportunity</option>
                                        <option value="collab">Collaboration</option>
                                        <option value="other">Just saying hi</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="message"
                                        className="font-mono text-xs text-zinc-500 uppercase tracking-widest"
                                    >
                                        message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your project or what's on your mind..."
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-100 placeholder-zinc-600 font-mono text-sm focus:outline-none focus:border-emerald-600 focus:bg-zinc-900 transition-all duration-200 resize-none"
                                    />
                                    <p className="font-mono text-xs text-zinc-700 text-right">
                                        {formData.message.length} / 1000
                                    </p>
                                </div>

                                {/* Error state */}
                                {status === "error" && (
                                    <div className="px-4 py-3 rounded-xl border border-red-900/50 bg-red-950/20">
                                        <p className="font-mono text-xs text-red-400">
                                            Something went wrong. Try emailing me directly at {MY_EMAIL_ADDRESS}
                                        </p>
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed"
                                >
                                    {status === "loading" ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="w-3.5 h-3.5 rounded-full border-2 border-zinc-500 border-t-transparent animate-spin" />
                                            sending...
                                        </span>
                                    ) : (
                                        "send message →"
                                    )}
                                </button>

                                <p className="font-mono text-xs text-zinc-700 text-center">
                                    I usually reply within 24–48 hours
                                </p>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </div >
    );
}