"use client";

import { supabaseBrowser } from "@/lib/supabase-browser";

export default function ProviderPendingPage() {
  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut();
    window.location.href = "/";
  };

  return (
    <main style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "12px" }}>
        審核中
      </h1>
      <p style={{ marginBottom: "24px" }}>
        你的提供者帳號已送出審核，通過後即可進入接單畫面。
      </p>

      <a href="/login">
        <button
          style={{
            marginRight: "12px",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer",
          }}
        >
          重新登入查看狀態
        </button>
      </a>

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