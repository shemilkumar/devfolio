import { createClient } from "@supabase/supabase-js";

// Used in server components, server actions, and route handlers
// Runs on the server only — never exposed to the browser
export function createServerClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}

// Used in client components if needed
// Same keys — anon key is safe to expose
export function createBrowserClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}