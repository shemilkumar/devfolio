// loading.tsx — Next.js shows this automatically while the page fetches data.
// Uses React Suspense under the hood. No wiring needed — just create the file.

export default function ProjectsLoading() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="max-w-5xl mx-auto px-6 py-20 space-y-14">

                {/* Header skeleton */}
                <div className="space-y-4">
                    <div className="h-3 w-20 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-12 w-72 bg-zinc-800 rounded-lg animate-pulse" />
                    <div className="h-5 w-96 bg-zinc-800/60 rounded animate-pulse" />
                </div>

                {/* Stats skeleton */}
                <div className="flex gap-8 border-y border-zinc-800 py-5">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-4 w-16 bg-zinc-800 rounded animate-pulse" />
                    ))}
                </div>

                {/* Cards skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-4"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            {/* Card header */}
                            <div className="flex items-start justify-between">
                                <div className="h-5 w-36 bg-zinc-800 rounded animate-pulse" />
                                <div className="h-5 w-16 bg-zinc-800 rounded animate-pulse" />
                            </div>

                            {/* Description lines */}
                            <div className="space-y-2 flex-1">
                                <div className="h-3.5 w-full bg-zinc-800/70 rounded animate-pulse" />
                                <div className="h-3.5 w-5/6 bg-zinc-800/70 rounded animate-pulse" />
                                <div className="h-3.5 w-4/6 bg-zinc-800/50 rounded animate-pulse" />
                            </div>

                            {/* Tech tags */}
                            <div className="flex gap-2">
                                {[...Array(3)].map((_, j) => (
                                    <div
                                        key={j}
                                        className="h-4 w-14 bg-zinc-800 rounded animate-pulse"
                                        style={{ animationDelay: `${j * 60}ms` }}
                                    />
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex gap-3 pt-4 border-t border-zinc-800">
                                <div className="h-3 w-12 bg-zinc-800 rounded animate-pulse" />
                                <div className="h-3 w-16 bg-zinc-800 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}