import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  return user;
}

export async function getMyProfile() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) return null;
  return profile;
}

export async function requireAdmin() {
  const profile = await getMyProfile();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  return profile;
}