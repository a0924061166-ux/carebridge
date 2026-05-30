"use client";


import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";


type AdminProfile = {
 id: string;
 full_name: string | null;
 is_admin: boolean;
};


export default function AdminLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 const router = useRouter();
 const [loading, setLoading] = useState(true);
 const [myProfile, setMyProfile] = useState<AdminProfile | null>(null);


 useEffect(() => {
   const checkAdmin = async () => {
     const {
       data: { user },
       error,
     } = await supabaseBrowser.auth.getUser();


     // 沒登入
     if (error || !user) {
       router.replace("/login");
       return;
     }


     const { data: profile, error: profileError } = await supabaseBrowser
       .from("profiles")
       .select("id, full_name, is_admin")
       .eq("id", user.id)
       .single();


     // 有登入但不是 admin
     if (profileError || !profile || profile.is_admin !== true) {
       router.replace("/");
       return;
     }


     setMyProfile(profile);
     setLoading(false);
   };


   checkAdmin();
 }, [router]);


 if (loading) {
   return (
     <div style={{ minHeight: "100vh", background: "#f8fafc", padding: 32 }}>
       <p>載入中...</p>
     </div>
   );
 }


 return (
   <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
     <div style={{ display: "flex", minHeight: "100vh" }}>
       <aside
         style={{
           width: 260,
           background: "#111827",
           color: "#fff",
           padding: "24px 18px",
         }}
       >
         <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
           管理者後台
         </h2>
         <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 24 }}>
           歡迎，{myProfile?.full_name || "管理者"}
         </p>


         <nav style={{ display: "grid", gap: 10 }}>
           <Link href="/admin" style={navLinkStyle}>
             首頁
           </Link>
           <Link href="/admin/review" style={navLinkStyle}>
             審核
           </Link>
           <Link href="/admin/requests" style={navLinkStyle}>
             案件管理
           </Link>
           <Link href="/admin/consultations" style={navLinkStyle}>
             諮詢表單管理
           </Link>
         </nav>
       </aside>


       <main style={{ flex: 1, padding: 32 }}>{children}</main>
     </div>
   </div>
 );
}


const navLinkStyle: React.CSSProperties = {
 display: "block",
 padding: "12px 14px",
 borderRadius: 10,
 background: "rgba(255,255,255,0.08)",
 color: "#fff",
 textDecoration: "none",
 fontWeight: 600,
};

