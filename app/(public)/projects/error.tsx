"use client";

// error.tsx — shown automatically when the page throws an unhandled error.
// MUST be a client component ("use client") — React error boundaries require it.
// The `reset` function re-tries rendering the page without a full reload.

import { useEffect } from "react";

export default function ProjectsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log to your error tracking service here (e.g. Sentry)
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-6">
            <div className="max-w-md w-full space-y-8 text-center">

                {/* Error code */}
                <p className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
          // error
                </p>

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-2xl border border-red-900/50 bg-red-950/30 flex items-center justify-center">
                        <span className="text-2xl text-red-500">!</span>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">
                        Something went wrong
                    </h2>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Failed to load projects. This might be a temporary issue — try
                        again or come back later.
                    </p>
                </div>

                {/* Error detail (dev only) */}
                {process.env.NODE_ENV === "development" && error.message && (
                    <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-left">
                        <p className="font-mono text-xs text-red-400 break-all">
                            {error.message}
                        </p>
                        {error.digest && (
                            <p className="font-mono text-xs text-zinc-600 mt-1">
                                digest: {error.digest}
                            </p>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
                    >
                        Try again
                    </button>
                    <a
                        href="/"
                        className="px-5 py-2.5 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
                    >
                        Go home
                    </a>
                </div>

            </div>
        </div>
    );
}