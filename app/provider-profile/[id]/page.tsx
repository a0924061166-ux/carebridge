"use client";


import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";


type ProviderProfile = {
 id: string;
 full_name: string | null;
 phone: string | null;
 account_type: string | null;
 provider_status: string | null;
 bio: string | null;
 specialties: string | null;
};


export default function ProviderDetailPage() {
 const params = useParams();
 const currentId = String(params?.id || "");


 const [loading, setLoading] = useState(true);
 const [provider, setProvider] = useState<ProviderProfile | null>(null);


 useEffect(() => {
   const loadProvider = async () => {
     const { data, error } = await supabaseBrowser
 .from("profiles")
 .select("id, full_name, phone, account_type, provider_status, bio, specialties")
 .eq("id", currentId)
 .eq("account_type", "provider")
 .eq("provider_status", "approved")
 .maybeSingle();


console.log("provider detail currentId =", currentId);
console.log("provider detail data =", data);
console.log("provider detail error =", error);


     if (error) {
       alert("讀取照護者資料失敗");
       setLoading(false);
       return;
     }


     if (!data) {
       setProvider(null);
       setLoading(false);
       return;
     }


     setProvider(data);
     setLoading(false);
   };


   if (currentId) {
     loadProvider();
   }
 }, [currentId]);


 if (loading) {
   return <div style={{ padding: "40px" }}>載入中...</div>;
 }


 if (!provider) {
   return (
     <div style={{ padding: "100px", textAlign: "center" }}>
       <h2 style={{ color: "#64748b" }}>抱歉，找不到這位照護員資料</h2>
       <Link href="/provider-profile" style={{ color: "#10b981", fontWeight: 700 }}>
         ← 返回照護員列表
       </Link>
     </div>
   );
 }


 const specialtyList = (provider.specialties || "")
   .split(",")
   .map((item) => item.trim())
   .filter(Boolean);


 return (
   <main style={{ minHeight: "100vh", background: "#f8fafc", paddingBottom: "100px" }}>
     <nav style={{ background: "#fff", padding: "16px 20px", borderBottom: "1px solid #e2e8f0" }}>
       <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
         <Link href="/provider-profile" style={{ color: "#475569", textDecoration: "none", fontWeight: 700 }}>
           ← 返回照護員列表
         </Link>
       </div>
     </nav>


     <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
       <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "40px", alignItems: "start" }}>
         <aside style={sideCardStyle}>
           <div style={avatarWrapper}>
             <img
               src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                 provider.full_name || "provider"
               )}`}
               alt={provider.full_name || "provider"}
               style={{ width: "100%" }}
             />
           </div>


           <h1 style={{ fontSize: "26px", fontWeight: 800, margin: "20px 0 8px" }}>
             {provider.full_name || "未命名照護者"}
           </h1>


           <p style={{ color: "#64748b", fontWeight: 600 }}>照護者</p>


           <div style={{ margin: "24px 0", height: "1px", background: "#f1f5f9" }} />


           <div style={{ textAlign: "left" }}>
             <InfoRow label="電話" value={provider.phone || "未填寫"} />
             <InfoRow label="審核狀態" value={provider.provider_status || "未審核"} color="#059669" />
           </div>


           <button style={bookingBtn}>預約面試</button>
         </aside>


         <div style={{ display: "grid", gap: "24px" }}>
           <section style={contentBox}>
             <h3 style={sectionTitle}>👤 個人簡介</h3>
             <p style={descriptionText}>
               {provider.bio?.trim() || "這位照護者尚未填寫個人簡介。"}
             </p>
           </section>


           <section style={contentBox}>
             <h3 style={sectionTitle}>🛡️ 專業特長</h3>


             {specialtyList.length > 0 ? (
               <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "16px" }}>
                 {specialtyList.map((tag) => (
                   <span key={tag} style={tagStyle}>
                     {tag}
                   </span>
                 ))}
               </div>
             ) : (
               <p style={descriptionText}>這位照護者尚未填寫專業特長。</p>
             )}
           </section>
         </div>
       </div>
     </div>
   </main>
 );
}


function InfoRow({
 label,
 value,
 color = "#1e293b",
}: {
 label: string;
 value: string;
 color?: string;
}) {
 return (
   <div style={{ marginBottom: "16px" }}>
     <p style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 700, marginBottom: "4px" }}>{label}</p>
     <p style={{ fontSize: "16px", fontWeight: 700, color, margin: 0 }}>{value}</p>
   </div>
 );
}


const sideCardStyle: React.CSSProperties = {
 background: "#fff",
 padding: "40px",
 borderRadius: "32px",
 border: "1px solid #e2e8f0",
 textAlign: "center",
 position: "sticky",
 top: "20px",
};


const avatarWrapper: React.CSSProperties = {
 width: "130px",
 height: "130px",
 borderRadius: "50%",
 background: "#f1f5f9",
 margin: "0 auto",
 overflow: "hidden",
};


const bookingBtn: React.CSSProperties = {
 width: "100%",
 padding: "16px",
 background: "#111827",
 color: "#fff",
 border: "none",
 borderRadius: "16px",
 fontWeight: 700,
 fontSize: "16px",
 cursor: "pointer",
 marginTop: "24px",
};


const contentBox: React.CSSProperties = {
 background: "#fff",
 padding: "32px",
 borderRadius: "32px",
 border: "1px solid #e2e8f0",
};


const sectionTitle: React.CSSProperties = {
 fontSize: "18px",
 fontWeight: 800,
 color: "#0f172a",
 margin: 0,
};


const descriptionText: React.CSSProperties = {
 marginTop: "16px",
 color: "#475569",
 lineHeight: "1.8",
 fontSize: "16px",
 whiteSpace: "pre-wrap",
};


const tagStyle: React.CSSProperties = {
 padding: "8px 16px",
 background: "#f1f5f9",
 borderRadius: "10px",
 fontSize: "14px",
 fontWeight: 600,
 color: "#475569",
};

