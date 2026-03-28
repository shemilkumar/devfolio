import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-100 space-y-6">
                <div className="text-center space-y-2">
                    <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                        create account
                    </p>
                    <h1 className="text-3xl font-bold text-white">Sign up</h1>
                </div>
                <SignUp />
            </div>
        </div>
    );
}