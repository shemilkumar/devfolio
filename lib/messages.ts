import { createServerClient } from "./supabase";

export async function getMessageCount(): Promise<number> {
    const supabase = createServerClient();

    const { count, error } = await supabase
        .from("contact_messages")
        .select("*", { count: "exact", head: true });

    if (error) {
        console.error("getMessageCount error:", error.message);
        return 0;
    }

    return count ?? 0;
}