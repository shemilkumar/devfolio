import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-100 space-y-6">
                <div className="text-center space-y-2">
                    <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                        admin access
                    </p>
                    <h1 className="text-3xl font-bold text-white">Sign in</h1>
                    <p className="text-zinc-400 text-sm">
                        This area is restricted to the site owner.
                    </p>
                </div>
                <SignIn />
            </div>
        </div>
    );
}