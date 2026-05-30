"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function RegisterPage() {
  const router = useRouter();

  const supabase = useMemo(() => {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
      }
    );
  }, []);

  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState<"provider" | "requester">("requester");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      const user = data.user;

      if (!user) {
        setErrorMessage("註冊成功，但找不到使用者資料");
        setLoading(false);
        return;
      }

      let licenseUrl: string | null = null;

      if (accountType === "provider" && licenseFile) {
        const fileExt = licenseFile.name.split(".").pop();
        const filePath = `licenses/${user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("licenses")
          .upload(filePath, licenseFile, {
            upsert: true,
          });

        if (uploadError) {
          setErrorMessage(`證照上傳失敗：${uploadError.message}`);
          setLoading(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("licenses")
          .getPublicUrl(filePath);

        licenseUrl = publicUrlData.publicUrl;
      }

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: fullName,
        phone,
        account_type: accountType,
        provider_status: accountType === "provider" ? "pending" : "none",
        license_url: licenseUrl,
        is_admin: false,
      });

      if (profileError) {
        setErrorMessage(`建立 profile 失敗：${profileError.message}`);
        setLoading(false);
        return;
      }

      if (accountType === "provider") {
        router.push("/provider-pending");
      } else {
        router.push("/login");
      }

      router.refresh();
    } catch (err) {
      console.error("REGISTER ERROR =", err);
      setErrorMessage("註冊時發生錯誤");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm space-y-4"
      >
        <h1 className="text-3xl font-bold">註冊</h1>
        <p className="text-gray-600">建立你的居家照護配對帳號</p>

        <input
          type="email"
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <select
          className="w-full border rounded-lg px-3 py-2"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value as "provider" | "requester")}
        >
          <option value="provider">照護者</option>
          <option value="requester">需求者</option>
        </select>

        <input
          type="password"
          className="w-full border rounded-lg px-3 py-2"
          placeholder="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2"
          placeholder="電話"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2"
          placeholder="姓名"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        {accountType === "provider" && (
          <div>
            <label className="block mb-2">證照上傳</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setLicenseFile(e.target.files?.[0] || null)}
            />
          </div>
        )}

        {errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black text-white px-4 py-2"
        >
          {loading ? "註冊中..." : "註冊"}
        </button>
      </form>
    </div>
  );
}