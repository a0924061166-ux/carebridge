"use client";

export default function TestPage() {
  async function testFetch() {
    try {
      const res = await fetch(
        "https://vfhatxldadbfqiddkxub.supabase.co/auth/v1/health"
      );
      const text = await res.text();
      console.log("STATUS =", res.status);
      console.log("TEXT =", text);
      alert(`status: ${res.status}`);
    } catch (err) {
      console.error("FETCH ERROR =", err);
      alert("fetch failed");
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Test Pure Fetch</h1>
      <button onClick={testFetch}>CLICK ME</button>
    </div>
  );
}