import { createServerClient } from "./supabase";
import type { Post } from "@/types/database";

// GET all published posts — used in /blog page (ISR)
export async function getPosts(): Promise<Post[]> {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("getPosts error:", error.message);
        return [];
    }

    return data ?? [];
}

// GET all posts including drafts — used in admin dashboard
export async function getAllPosts(): Promise<Post[]> {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("getAllPosts error:", error.message);
        return [];
    }

    return data ?? [];
}

// GET single post by slug — used in /blog/[slug] page
export async function getPostBySlug(slug: string): Promise<Post | null> {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("getPostBySlug error:", error.message);
        return null;
    }

    return data;
}