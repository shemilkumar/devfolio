// These types match your Supabase table columns exactly.
// When you create your tables in Supabase, make sure column names match.

export type ProjectStatus = "live" | "wip" | "archived";

export type Project = {
    id: string;
    title: string;
    slug: string;
    description: string;
    long_description: string | null;
    tech_stack: string[];
    github_url: string | null;
    live_url: string | null;
    image_url: string | null;
    status: ProjectStatus;
    year: string;
    created_at: string;
};

export type Post = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string[];
    read_time: string;
    published: boolean;
    created_at: string;
};

export type ContactMessage = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
};

// This is what Supabase's createClient<Database> expects
export type Database = {
    public: {
        Tables: {
            projects: {
                Row: Project;
                Insert: Omit<Project, "id" | "created_at">;
                Update: Partial<Omit<Project, "id" | "created_at">>;
            };
            posts: {
                Row: Post;
                Insert: Omit<Post, "id" | "created_at">;
                Update: Partial<Omit<Post, "id" | "created_at">>;
            };
            contact_messages: {
                Row: ContactMessage;
                Insert: Omit<ContactMessage, "id" | "created_at">;
                Update: Partial<Omit<ContactMessage, "id" | "created_at">>;
            };
        };
    };
};