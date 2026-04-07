import { createServerClient } from "./supabase";
import type { Project } from "@/types/database";

// GET all projects — used in /projects page (ISR)
export async function getProjects(): Promise<Project[]> {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

    console.log("Total rows from Supabase:", data?.length);
    console.log("Error:", error);

    if (error) {
        console.error("getProjects error:", error.message);
        return [];
    }

    return data ?? [];
}

// GET single project by slug — used in /projects/[slug] page
export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        console.error("getProjectBySlug error:", error.message);
        return null;
    }

    return data;
}