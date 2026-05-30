"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function LoginPage() {
  const router = useRouter();

  const supabase = useMemo(() => {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
      }
    );
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      console.log("LOGIN DATA =", data);
      console.log("LOGIN ERROR =", error);

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      const user = data.user;

      if (!user) {
        setErrorMessage("登入成功，但找不到使用者資料");
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("account_type, is_admin, provider_status")
        .eq("id", user.id)
        .single();

      console.log("PROFILE =", profile);
      console.log("PROFILE ERROR =", profileError);

      if (profileError || !profile) {
        setErrorMessage("讀取 profile 失敗");
        setLoading(false);
        return;
      }

      if (profile.is_admin) {
        router.replace("/admin");
      } else if (profile.account_type === "requester") {
        router.replace("/requester");
      } else if (profile.account_type === "provider") {
        if (profile.provider_status === "approved") {
          router.replace("/provider");
        } else {
          router.replace("/provider-pending");
        }
      } else {
        router.replace("/");
      }

      router.refresh();
    } catch (err) {
      console.error("LOGIN EXCEPTION =", err);
      setErrorMessage(err instanceof Error ? err.message : "登入失敗");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm space-y-4"
      >
        <h1 className="text-2xl font-bold">登入</h1>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg border px-4 py-2"
        >
          {loading ? "登入中..." : "登入"}
        </button>
      </form>
    </div>
  );
}