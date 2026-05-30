"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

type CareRequest = {
  id: string;
  title: string;
  description: string | null;
  status: string;
};

export default function ProviderClient({
  initialRequests,
}: {
  initialRequests: CareRequest[];
}) {
  const [requests, setRequests] = useState<CareRequest[]>(initialRequests);

  const acceptRequest = async (id: string) => {
    const {
      data: { user },
    } = await supabaseBrowser.auth.getUser();

    if (!user) {
      alert("登入狀態已失效，請重新登入");
      window.location.href = "/login";
      return;
    }

    const { error } = await supabaseBrowser
      .from("care_requests")
      .update({
        status: "已接單",
        accepted_by: user.id,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: "已接單" }
          : req
      )
    );

    alert("已接單！");
  };

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>
        接單者頁面
      </h1>

      <div style={{ marginTop: "24px" }}>
        {requests.length === 0 && <p>目前沒有需求</p>}

        {requests.map((req) => (
          <div
            key={req.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "12px",
              marginBottom: "10px",
            }}
          >
            <p style={{ fontWeight: "bold", marginBottom: "6px" }}>{req.title}</p>
            <p style={{ marginBottom: "6px" }}>{req.description}</p>
            <p style={{ marginBottom: "8px", color: "#666" }}>{req.status}</p>

            {req.status === "待媒合" && (
              <button
                onClick={() => acceptRequest(req.id)}
                style={{
                  padding: "6px 12px",
                  background: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                接單
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}