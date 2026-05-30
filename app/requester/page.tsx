"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

type CareRequest = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  created_at: string;
};

export default function RequesterPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<CareRequest[]>([]);

  const loadRequests = async () => {
    const {
      data: { session },
    } = await supabaseBrowser.auth.getSession();

    const user = session?.user;
    if (!user) return;

    const { data, error } = await supabaseBrowser
      .from("care_requests")
      .select("*")
      .eq("requester_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("load requests error:", error);
      return;
    }

    setRequests((data as CareRequest[]) || []);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleSubmit = async () => {
    if (!title) {
      alert("請輸入需求標題");
      return;
    }

    try {
      setLoading(true);

      const {
        data: { session },
      } = await supabaseBrowser.auth.getSession();

      const user = session?.user;

      if (!user) {
        alert("請先登入");
        return;
      }

      const { error } = await supabaseBrowser.from("care_requests").insert({
        requester_id: user.id,
        title,
        description,
        status: "待媒合",
      });

      if (error) {
        alert(error.message);
        return;
      }

      alert("需求已送出");
      setTitle("");
      setDescription("");
      await loadRequests();
    } catch (err: any) {
      console.error("request submit error:", err);
      alert(err?.message || "送出失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>
        需求方頁面
      </h1>
      <p>在這裡建立你的照護需求</p>

      <div style={{ marginTop: "24px", display: "grid", gap: "12px" }}>
        <input
          placeholder="需求標題"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}
        />
        <textarea
          placeholder="照護需求描述"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            minHeight: "120px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "black",
            color: "white",
            cursor: "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "送出中..." : "送出需求"}
        </button>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "12px" }}>
          我的需求
        </h2>

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
            <p style={{ fontSize: "12px", color: "#666" }}>{req.status}</p>
          </div>
        ))}
      </div>
    </main>
  );
}