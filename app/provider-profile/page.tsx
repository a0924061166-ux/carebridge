"use client";


import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase-browser";


interface ProviderProfile {
 id: string;
 full_name: string | null;
 phone: string | null;
 account_type: string | null;
 provider_status: string | null;
 bio: string | null;
 specialties: string | null;
}


export default function ProvidersListPage() {
 const [loading, setLoading] = useState(true);
 const [allProviders, setAllProviders] = useState<ProviderProfile[]>([]);


 const [filters, setFilters] = useState({
   skill: "全部能力",
 });


 useEffect(() => {
   const loadProviders = async () => {
     const { data, error } = await supabaseBrowser
       .from("profiles")
       .select("id, full_name, phone, account_type, provider_status, bio, specialties")
       .eq("account_type", "provider")
       .eq("provider_status", "approved")
       .order("created_at", { ascending: false });


     console.log("provider list data =", data);
     console.log("provider list error =", error);


     if (error) {
       alert("讀取照護員列表失敗");
       setLoading(false);
       return;
     }


     setAllProviders(data ?? []);
     setLoading(false);
   };


   loadProviders();
 }, []);


 const allSkills = useMemo(() => {
   const skills = new Set<string>();


   allProviders.forEach((provider) => {
     (provider.specialties || "")
       .split(",")
       .map((item) => item.trim())
       .filter(Boolean)
       .forEach((skill) => skills.add(skill));
   });


   return ["全部能力", ...Array.from(skills)];
 }, [allProviders]);


 const filteredProviders = useMemo(() => {
   return allProviders.filter((p) => {
     if (filters.skill === "全部能力") return true;


     const skillList = (p.specialties || "")
       .split(",")
       .map((item) => item.trim())
       .filter(Boolean);


     return skillList.includes(filters.skill);
   });
 }, [filters, allProviders]);


 if (loading) {
   return <div style={{ padding: "40px" }}>載入中...</div>;
 }


 return (
   <main style={{ minHeight: "100vh", background: "#f8fafc", paddingBottom: "100px" }}>
     <div style={headerStyle}>
       <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111827" }}>我們的專業照護人員</h1>
       <p style={{ color: "#6b7280", marginTop: "8px" }}>已為您嚴選多位通過認證的專業夥伴</p>
     </div>


     <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
       <section style={filterContainerStyle}>
         <FilterSelect
           label="專業能力"
           options={allSkills}
           value={filters.skill}
           onChange={(v: string) => setFilters({ ...filters, skill: v })}
         />


         <button
           onClick={() => setFilters({ skill: "全部能力" })}
           style={resetBtnStyle}
         >
           重設
         </button>
       </section>


       {filteredProviders.length === 0 ? (
         <div style={emptyStyle}>目前沒有符合條件的照護員</div>
       ) : (
         <div style={gridStyle}>
           {filteredProviders.map((p) => {
             const tagList = (p.specialties || "")
               .split(",")
               .map((item) => item.trim())
               .filter(Boolean)
               .slice(0, 2);


             return (
               <div key={p.id} style={cardStyle}>
                 <div style={statusTagStyle("已通過審核")}>已通過審核</div>


                 <div style={avatarWrapper}>
                   <img
                     src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                       p.full_name || "provider"
                     )}`}
                     alt="avatar"
                     style={{ width: "100%", borderRadius: "50%" }}
                   />
                 </div>


                 <h3 style={{ fontSize: "19px", fontWeight: 800, margin: "12px 0 4px" }}>
                   {p.full_name || "未命名照護者"}
                 </h3>


                 <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6 }}>
                   {p.bio?.trim()
                     ? `${p.bio.slice(0, 36)}${p.bio.length > 36 ? "..." : ""}`
                     : "尚未填寫個人簡介"}
                 </p>


                 {tagList.length > 0 && (
                   <div style={tagsWrapStyle}>
                     {tagList.map((tag) => (
                       <span key={tag} style={tagStyle}>
                         {tag}
                       </span>
                     ))}
                   </div>
                 )}


                 <div style={divider} />


                 <div style={footerStyle}>
                   <span style={{ fontSize: "14px", fontWeight: 700, color: "#64748b" }}>
                     {p.phone || "未填電話"}
                   </span>


                   <Link href={`/provider-profile/${encodeURIComponent(p.id)}`}>
                     <button style={detailBtnStyle}>查看詳情</button>
                   </Link>
                 </div>
               </div>
             );
           })}
         </div>
       )}
     </div>
   </main>
 );
}


function FilterSelect({ label, options, value, onChange }: any) {
 return (
   <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: "180px" }}>
     <label style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af" }}>{label}</label>
     <select value={value} onChange={(e) => onChange(e.target.value)} style={selectStyle}>
       {options.map((opt: string) => (
         <option key={opt} value={opt}>
           {opt}
         </option>
       ))}
     </select>
   </div>
 );
}


const headerStyle = {
 background: "#fff",
 padding: "40px 20px",
 borderBottom: "1px solid #e5e7eb",
 textAlign: "center" as const,
};


const filterContainerStyle: React.CSSProperties = {
 display: "flex",
 gap: "16px",
 background: "#fff",
 padding: "24px",
 borderRadius: "20px",
 border: "1px solid #e5e7eb",
 marginTop: "-30px",
 marginBottom: "40px",
 boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
 flexWrap: "wrap",
 alignItems: "flex-end",
};


const selectStyle: React.CSSProperties = {
 padding: "10px",
 borderRadius: "10px",
 border: "1px solid #e5e7eb",
 background: "#f9fafb",
 fontSize: "14px",
 fontWeight: 600,
 cursor: "pointer",
};


const resetBtnStyle: React.CSSProperties = {
 padding: "10px 20px",
 borderRadius: "10px",
 border: "none",
 background: "#f3f4f6",
 color: "#6b7280",
 fontWeight: 700,
 cursor: "pointer",
 height: "41px",
};


const gridStyle: React.CSSProperties = {
 display: "grid",
 gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
 gap: "24px",
};


const cardStyle: React.CSSProperties = {
 background: "#fff",
 borderRadius: "24px",
 padding: "24px",
 border: "1px solid #e5e7eb",
 textAlign: "center" as const,
 position: "relative",
};


const avatarWrapper: React.CSSProperties = {
 width: "80px",
 height: "80px",
 margin: "0 auto",
 background: "#f1f5f9",
 borderRadius: "50%",
 overflow: "hidden",
};


const tagsWrapStyle: React.CSSProperties = {
 display: "flex",
 flexWrap: "wrap",
 gap: "8px",
 justifyContent: "center",
 marginTop: "14px",
};


const tagStyle: React.CSSProperties = {
 padding: "6px 12px",
 background: "#f1f5f9",
 borderRadius: "999px",
 fontSize: "12px",
 fontWeight: 600,
 color: "#475569",
};


const divider: React.CSSProperties = {
 height: "1px",
 background: "#f1f5f9",
 margin: "20px 0",
};


const footerStyle: React.CSSProperties = {
 display: "flex",
 justifyContent: "space-between",
 alignItems: "center",
 gap: "12px",
};


const detailBtnStyle: React.CSSProperties = {
 padding: "10px 20px",
 background: "#10b981",
 color: "#fff",
 border: "none",
 borderRadius: "12px",
 fontWeight: 700,
 cursor: "pointer",
};


const statusTagStyle = (_status: string): React.CSSProperties => ({
 position: "absolute",
 top: "12px",
 left: "50%",
 transform: "translateX(-50%)",
 fontSize: "11px",
 fontWeight: 800,
 padding: "2px 10px",
 borderRadius: "999px",
 background: "#ecfdf5",
 color: "#059669",
});


const emptyStyle: React.CSSProperties = {
 background: "#fff",
 border: "1px solid #e5e7eb",
 borderRadius: "20px",
 padding: "40px",
 textAlign: "center",
 color: "#64748b",
 fontWeight: 600,
};



