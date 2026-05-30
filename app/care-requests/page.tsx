"use client";


import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";


type CareRequest = {
 id: number;
 service_date: string;
 preferred_time: string;
 contact_city: string;
 contact_district: string;
 care_receiver_gender: string;
 care_receiver_age: string;
 service_need: string;
 status: string;
 created_at: string;
};


export default function CareRequestsPage() {
 const [loading, setLoading] = useState(true);
 const [requests, setRequests] = useState<CareRequest[]>([]);


 useEffect(() => {
   const loadRequests = async () => {
     const {
       data: { user },
     } = await supabaseBrowser.auth.getUser();


     if (!user) {
       alert("請先登入");
       window.location.href = "/";
       return;
     }


     const { data: myProfile, error: profileError } = await supabaseBrowser
       .from("profiles")
       .select("account_type")
       .eq("id", user.id)
       .maybeSingle();


     if (profileError) {
       console.error("load my profile error =", profileError);
       alert("讀取使用者資料失敗");
       setLoading(false);
       return;
     }


     if (myProfile?.account_type !== "provider") {
       alert("只有照護者可以查看案件需求看板");
       window.location.href = "/";
       return;
     }


     const { data, error } = await supabaseBrowser
       .from("booking_requests")
       .select(
         "id, service_date, preferred_time, contact_city, contact_district, care_receiver_gender, care_receiver_age, service_need, status, created_at"
       )
       .is("provider_id", null)
       .eq("status", "pending")
       .order("created_at", { ascending: false });


     if (error) {
       console.error("load care requests error =", error);
       alert("讀取案件需求失敗");
       setLoading(false);
       return;
     }


     setRequests(data || []);
     setLoading(false);
   };


   loadRequests();
 }, []);


 return (
   <div style={pageWrapStyle}>
     <h1 style={pageTitleStyle}>案件需求看板</h1>
     <p style={pageDescStyle}>
       這裡會顯示「不指定照護者」的待處理案件，只有照護者可查看。
     </p>


     {loading ? (
       <div style={emptyStyle}>載入中...</div>
     ) : requests.length === 0 ? (
       <div style={emptyStyle}>目前沒有未指定照護者的案件</div>
     ) : (
       <div style={listStyle}>
         {requests.map((request) => (
           <div key={request.id} style={cardStyle}>
             <div style={topRowStyle}>
               <div style={dateStyle}>
                 {request.service_date}／{request.preferred_time}
               </div>
               <div style={statusStyle}>{request.status}</div>
             </div>


             <div style={infoStyle}>
               地點：{request.contact_city}
               {request.contact_district}
             </div>


             <div style={infoStyle}>
               被服務者：{request.care_receiver_gender}／{request.care_receiver_age} 歲
             </div>


             <div style={needStyle}>需求：{request.service_need}</div>


             <div style={subStyle}>
               建立時間：{new Date(request.created_at).toLocaleString()}
             </div>
           </div>
         ))}
       </div>
     )}
   </div>
 );
}


const pageWrapStyle: React.CSSProperties = {
 maxWidth: "960px",
 margin: "0 auto",
 padding: "40px 20px",
};


const pageTitleStyle: React.CSSProperties = {
 fontSize: "32px",
 fontWeight: 800,
 color: "#111827",
 margin: 0,
};


const pageDescStyle: React.CSSProperties = {
 marginTop: "10px",
 marginBottom: "24px",
 color: "#4b5563",
 lineHeight: 1.8,
};


const emptyStyle: React.CSSProperties = {
 color: "#6b7280",
 lineHeight: 1.8,
 background: "#fff",
 border: "1px solid #e5e7eb",
 borderRadius: "18px",
 padding: "24px",
};


const listStyle: React.CSSProperties = {
 display: "grid",
 gap: "16px",
};


const cardStyle: React.CSSProperties = {
 background: "#fff",
 border: "1px solid #e5e7eb",
 borderRadius: "18px",
 padding: "20px",
};


const topRowStyle: React.CSSProperties = {
 display: "flex",
 justifyContent: "space-between",
 alignItems: "center",
 gap: "12px",
 marginBottom: "12px",
};


const dateStyle: React.CSSProperties = {
 fontSize: "18px",
 fontWeight: 800,
 color: "#111827",
};


const statusStyle: React.CSSProperties = {
 padding: "6px 10px",
 borderRadius: "999px",
 background: "#fef3c7",
 color: "#92400e",
 fontSize: "12px",
 fontWeight: 700,
};


const infoStyle: React.CSSProperties = {
 fontSize: "14px",
 color: "#475569",
 lineHeight: 1.8,
};


const needStyle: React.CSSProperties = {
 marginTop: "10px",
 fontSize: "15px",
 color: "#111827",
 lineHeight: 1.8,
 whiteSpace: "pre-wrap",
};


const subStyle: React.CSSProperties = {
 marginTop: "12px",
 fontSize: "12px",
 color: "#94a3b8",
};

