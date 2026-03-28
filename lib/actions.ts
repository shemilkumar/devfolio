"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerClient } from "./supabase";

// ─── Helper: turn title into a URL slug ──────────────────────────────────────
// "My Cool Project" → "my-cool-project"
function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

export async function sendContactMessage(formData: FormData) {
    const supabase = createServerClient();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { success: false, error: "Please fill in all required fields." };
    }

    const { error } = await supabase.from("contact_messages").insert({
        name,
        email,
        subject,
        message,
    });

    if (error) {
        console.error("sendContactMessage error:", error.message);
        return { success: false, error: "Failed to send message. Try again." };
    }

    return { success: true };
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

export async function createProject(formData: FormData) {
    const supabase = createServerClient();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const long_description = formData.get("long_description") as string;
    const tech_stack_raw = formData.get("tech_stack") as string;
    const github_url = formData.get("github_url") as string;
    const live_url = formData.get("live_url") as string;
    const year = formData.get("year") as string;
    const status = formData.get("status") as string;

    // Convert "Next.js, TypeScript, Tailwind" → ["Next.js", "TypeScript", "Tailwind"]
    const tech_stack = tech_stack_raw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

    const slug = slugify(title);

    const { error } = await supabase.from("projects").insert({
        title,
        slug,
        description,
        long_description: long_description || null,
        tech_stack,
        github_url: github_url || null,
        live_url: live_url || null,
        image_url: null,
        status: status as "live" | "wip" | "archived",
        year,
    });

    if (error) {
        console.error("createProject error:", error.message);
        return { success: false, error: error.message };
    }

    // Tell Next.js to rebuild these pages since data changed
    revalidatePath("/projects");
    revalidatePath("/admin");

    redirect("/admin");
}

export async function deleteProject(id: string) {
    const supabase = createServerClient();

    const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("deleteProject error:", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/projects");
    revalidatePath("/admin");

    return { success: true };
}

export async function updateProjectStatus(
    id: string,
    status: "live" | "wip" | "archived"
) {
    const supabase = createServerClient();

    const { error } = await supabase
        .from("projects")
        .update({ status })
        .eq("id", id);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/projects");
    revalidatePath("/admin");

    return { success: true };
}

// ─── POSTS ────────────────────────────────────────────────────────────────────

export async function createPost(formData: FormData) {
    const supabase = createServerClient();

    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const tags_raw = formData.get("tags") as string;
    const read_time = formData.get("read_time") as string;
    const published = formData.get("published") === "true";

    const tags = tags_raw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

    const slug = slugify(title);

    const { error } = await supabase.from("posts").insert({
        title,
        slug,
        excerpt,
        content,
        tags,
        read_time,
        published,
    });

    if (error) {
        console.error("createPost error:", error.message);
        return { success: false, error: error.message };
    }

    revalidatePath("/blog");
    revalidatePath("/admin");

    redirect("/admin");
}

export async function deletePost(id: string) {
    const supabase = createServerClient();

    const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/blog");
    revalidatePath("/admin");

    return { success: true };
}

export async function togglePostPublished(id: string, published: boolean) {
    const supabase = createServerClient();

    const { error } = await supabase
        .from("posts")
        .update({ published })
        .eq("id", id);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath("/blog");
    revalidatePath("/admin");

    return { success: true };
}