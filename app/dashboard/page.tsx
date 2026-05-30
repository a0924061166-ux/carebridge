"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

type Profile = {
  full_name: string | null;
  account_type: "requester" | "provider";
  provider_status: string;
  is_admin: boolean;
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  const loadMe = async () => {
    setLoading(true);

    const {
      data: { user },
      error,
    } = await supabaseBrowser.auth.getUser();

    if (!user || error) {
      window.location.href = "/login";
      return;
    }

    const { data, error: profileError } = await supabaseBrowser
      .from("profiles")
      .select("full_name,account_type,provider_status,is_admin")
      .eq("id", user.id)
      .single();

    if (profileError) {
      alert(profileError.message);
      window.location.href = "/login";
      return;
    }

    setProfile(data as Profile);
    setLoading(false);
  };

  useEffect(() => {
    loadMe();
  }, []);

  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <main style={{ maxWidth: 700, margin: "40px auto", padding: "0 16px" }}>
        <p>載入中...</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 760, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: "34px", fontWeight: "bold", marginBottom: "8px" }}>
        歡迎回來{profile?.full_name ? `，${profile.full_name}` : ""}
      </h1>
      <p style={{ marginBottom: "24px" }}>請選擇你現在要進入的頁面</p>

      <div style={{ display: "grid", gap: "12px", marginBottom: "24px" }}>
        {profile?.account_type === "requester" && (
          <a href="/requester">
            <button
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                background: "white",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              進入需求方頁面
            </button>
          </a>
        )}

        {profile?.account_type === "provider" && profile?.provider_status === "approved" && (
          <a href="/provider">
            <button
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                background: "white",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              進入接單者頁面
            </button>
          </a>
        )}

        {profile?.account_type === "provider" && profile?.provider_status !== "approved" && (
          <a href="/provider-pending">
            <button
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                background: "white",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              查看審核狀態
            </button>
          </a>
        )}

        {profile?.is_admin && (
          <a href="/admin">
            <button
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                background: "white",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              進入管理者後台
            </button>
          </a>
        )}
      </div>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          background: "black",
          color: "white",
          cursor: "pointer",
        }}
      >
        登出
      </button>
    </main>
  );
}