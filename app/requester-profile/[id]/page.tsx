"use client";


import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";


// 1. 這裡模擬資料庫（未來這部分會從 API 或是資料庫抓取）
const allRequesters = [
 {
   id: "REQ-001",
   name: "張伯伯",
   avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang",
   location: "台北市 大安區",
   identity: "親屬 (兒子)",
   category: "失智症照護",
   budget: "$650/hr",
   timeSlot: "週二四六 08:00-12:00",
   description: "父親目前 75 歲，初期失智，平時與太太同住。希望尋找有耐心的照護員陪伴。",
   requirements: ["失智症引導", "陪伴就醫", "備餐協助"]
 },
 {
   id: "REQ-002",
   name: "李奶奶",
   avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Li",
   location: "新北市 板橋區",
   identity: "本人",
   category: "術後生活照顧",
   budget: "$700/hr",
   timeSlot: "每日 14:00-18:00",
   description: "剛完成髖關節手術，目前行動不便，需要有人協助更換傷口敷料與洗澡。",
   requirements: ["傷口護理", "洗澡協助", "復健陪伴"]
 },
 {
   id: "REQ-003",
   name: "陳小姐",
   avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chen",
   location: "台北市 信義區",
   identity: "社工/醫護",
   category: "居家生活照護",
   budget: "$600/hr",
   timeSlot: "平日夜間 19:00-22:00",
   description: "此案為醫院社工轉介，個案為獨居長者，需要夜間有人協助翻身與生活雜物處理。",
   requirements: ["更換尿潔", "翻身拍背", "基本量測"]
 }
];


export default function RequesterDetailPage() {
 const params = useParams();
 const requestId = params.id;


 // 2. 【核心邏輯】根據網址的 ID 從資料庫找尋對應的那個人
 const currentData = allRequesters.find(item => item.id === requestId);


 // 3. 如果找不到資料（防呆機制）
 if (!currentData) {
   return (
     <div style={{ padding: "100px", textAlign: "center" }}>
       <h2>抱歉，找不到該需求的詳細資料</h2>
       <Link href="/requester-profile">返回需求列表</Link>
     </div>
   );
 }


 // 4. 渲染找到的資料
 return (
   <main style={{ minHeight: "100vh", background: "#f8fafc", paddingBottom: "100px" }}>
     <nav style={{ background: "#fff", padding: "16px 20px", borderBottom: "1px solid #e2e8f0" }}>
       <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
         <Link href="/requester-profile" style={{ color: "#475569", textDecoration: "none", fontWeight: 700 }}>← 返回需求看板</Link>
       </div>
     </nav>


     <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 20px" }}>
       <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "40px" }}>
        
         {/* 左側資訊 */}
         <aside style={{ background: "#fff", padding: "40px", borderRadius: "32px", border: "1px solid #e2e8f0", textAlign: "center" }}>
           <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "#f1f5f9", margin: "0 auto", overflow: "hidden" }}>
             <img src={currentData.avatar} alt="avatar" style={{ width: "100%" }} />
           </div>
           <h1 style={{ fontSize: "24px", fontWeight: 800, marginTop: "20px" }}>{currentData.name}</h1>
           <div style={{ display: "inline-block", background: "#f0fdfa", color: "#0d9488", padding: "4px 12px", borderRadius: "999px", fontSize: "13px", fontWeight: 800 }}>
             {currentData.identity}
           </div>
           <div style={{ textAlign: "left", marginTop: "24px" }}>
             <p style={{ fontSize: "12px", color: "#94a3b8" }}>地點：{currentData.location}</p>
             <p style={{ fontSize: "12px", color: "#94a3b8" }}>預算：<span style={{color:'#059669', fontWeight:700}}>{currentData.budget}</span></p>
           </div>
           <button style={{ width: "100%", padding: "16px", background: "#111827", color: "#fff", border: "none", borderRadius: "16px", fontWeight: 700, marginTop: "20px", cursor: "pointer" }}>立即應徵</button>
         </aside>


         {/* 右側內容 */}
         <div style={{ display: "grid", gap: "24px" }}>
           <section style={{ background: "#fff", padding: "32px", borderRadius: "32px", border: "1px solid #e2e8f0" }}>
             <h3 style={{ margin: 0 }}>📅 服務時段</h3>
             <p style={{ marginTop: "16px", padding: "20px", background: "#eff6ff", borderRadius: "16px", color: "#1e40af", fontWeight: 700 }}>{currentData.timeSlot}</p>
           </section>
           <section style={{ background: "#fff", padding: "32px", borderRadius: "32px", border: "1px solid #e2e8f0" }}>
             <h3 style={{ margin: 0 }}>📋 需求描述</h3>
             <p style={{ marginTop: "16px", color: "#475569", lineHeight: "1.8" }}>{currentData.description}</p>
           </section>
           <section style={{ background: "#fff", padding: "32px", borderRadius: "32px", border: "1px solid #e2e8f0" }}>
             <h3 style={{ margin: 0 }}>🛡️ 工作要求</h3>
             <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "16px" }}>
               {currentData.requirements.map(item => (
                 <span key={item} style={{ padding: "8px 16px", background: "#f1f5f9", borderRadius: "10px", fontSize: "14px" }}>{item}</span>
               ))}
             </div>
           </section>
         </div>
        
       </div>
     </div>
   </main>
 );
}

