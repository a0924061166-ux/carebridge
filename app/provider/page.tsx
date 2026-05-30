import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProviderClient from "./provider-client";

export default async function ProviderPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("account_type, provider_status")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    redirect("/login");
  }

  if (profile.account_type !== "provider") {
    redirect("/");
  }

  if (profile.provider_status !== "approved") {
    redirect("/provider-pending");
  }

  const { data: requests, error: requestsError } = await supabase
    .from("care_requests")
    .select("id, title, description, status")
    .order("created_at", { ascending: false });

  if (requestsError) {
    return (
      <main style={{ maxWidth: 700, margin: "40px auto", padding: "0 16px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>
          接單者頁面
        </h1>
        <p>讀取案件失敗：{requestsError.message}</p>
      </main>
    );
  }

  return <ProviderClient initialRequests={requests || []} />;
}