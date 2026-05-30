"use client";


import React, { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";


type RequesterProfile = {
 id: string;
 full_name: string | null;
 phone: string | null;
 account_type: string | null;
};


type BookingRequest = {
 id: number;
 provider_id: string | null;
 service_date: string;
 preferred_time: string;
 contact_name: string;
 contact_phone: string;
 contact_city: string;
 contact_district: string;
 street_address: string;
 care_receiver_name: string;
 care_receiver_gender: string;
 care_receiver_age: string;
 service_need: string;
 status: string;
 created_at: string;
};


function formatStatusLabel(status: string) {
 if (status === "pending") return "待處理";
 if (status === "approved") return "已接受";
 if (status === "rejected") return "已拒絕";
 return status;
}


export default function RequesterMyProfilePage() {
 const [loading, setLoading] = useState(true);
 const [profile, setProfile] = useState<RequesterProfile | null>(null);
 const [email, setEmail] = useState<string | null>(null);
 const [requests, setRequests] = useState<BookingRequest[]>([]);


 useEffect(() => {
   const loadPageData = async () => {
     const {
       data: { user },
     } = await supabaseBrowser.auth.getUser();


     if (!user) {
       alert("請先登入");
       window.location.href = "/";
       return;
     }


     const { data: profileData, error: profileError } = await supabaseBrowser
       .from("profiles")
       .select("id, full_name, phone, account_type")
       .eq("id", user.id)
       .maybeSingle();


     if (profileError) {
       console.error("load requester profile error =", profileError);
       alert("讀取個人資料失敗");
       setLoading(false);
       return;
     }


     if (!profileData) {
       alert("找不到需求者個人資料");
       setLoading(false);
       return;
     }


     if (profileData.account_type !== "requester") {
       alert("你不是需求者帳號");
       setLoading(false);
       return;
     }


     const { data: requestData, error: requestError } = await supabaseBrowser
       .from("booking_requests")
       .select(
         "id, provider_id, service_date, preferred_time, contact_name, contact_phone, contact_city, contact_district, street_address, care_receiver_name, care_receiver_gender, care_receiver_age, service_need, status, created_at"
       )
       .eq("requester_id", user.id)
       .order("created_at", { ascending: false });


     if (requestError) {
       console.error("load booking requests error =", requestError);
       alert("讀取預約申請失敗");
       setLoading(false);
       return;
     }


     setProfile(profileData);
     setEmail(user.email ?? null);
     setRequests(requestData || []);
     setLoading(false);
   };


   loadPageData();
 }, []);


 if (loading) {
   return <div style={{ padding: "40px" }}>載入中...</div>;
 }


 return (
   <div style={pageWrapStyle}>
     <h1 style={pageTitleStyle}>我的個人檔案</h1>


     <div style={cardStyle}>
       <div style={itemStyle}>
         <div style={labelStyle}>姓名</div>
         <div style={valueStyle}>{profile?.full_name || "未填寫"}</div>
       </div>


       <div style={itemStyle}>
         <div style={labelStyle}>Email</div>
         <div style={valueStyle}>{email || "未填寫"}</div>
       </div>


       <div style={itemStyle}>
         <div style={labelStyle}>電話</div>
         <div style={valueStyle}>{profile?.phone || "未填寫"}</div>
       </div>


       <div style={{ ...itemStyle, borderBottom: "none", paddingBottom: 0 }}>
         <div style={labelStyle}>身份</div>
         <div style={valueStyle}>需求者</div>
       </div>
     </div>


     <div style={{ height: 24 }} />


     <div style={cardStyle}>
       <div style={sectionTitleStyle}>我送出的預約申請</div>


       {requests.length === 0 ? (
         <div style={emptyTextStyle}>目前尚未送出任何預約申請</div>
       ) : (
         <div style={requestListStyle}>
           {requests.map((request) => {
             const isUnassigned = request.provider_id === null;


             return (
               <div key={request.id} style={requestCardStyle}>
                 <div style={requestTopRowStyle}>
                   <div>
                     <div style={requestDateStyle}>
                       {request.service_date}／{request.preferred_time}
                     </div>
                     <div style={requestSubStyle}>
                       送出時間：{new Date(request.created_at).toLocaleString()}
                     </div>
                   </div>


                   <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                     <span
                       style={{
                         ...typeBadgeStyle,
                         ...(isUnassigned ? unassignedBadgeStyle : assignedBadgeStyle),
                       }}
                     >
                       {isUnassigned ? "不指定照護者" : "指定照護者"}
                     </span>


                     <span
                       style={{
                         ...statusBadgeStyle,
                         ...(request.status === "pending"
                           ? pendingBadgeStyle
                           : request.status === "approved"
                           ? approvedBadgeStyle
                           : rejectedBadgeStyle),
                       }}
                     >
                       {formatStatusLabel(request.status)}
                     </span>
                   </div>
                 </div>


                 <div style={requestGridStyle}>
                   <div>
                     <div style={fieldLabelStyle}>聯絡人</div>
                     <div style={fieldValueStyle}>{request.contact_name}</div>
                   </div>


                   <div>
                     <div style={fieldLabelStyle}>聯絡電話</div>
                     <div style={fieldValueStyle}>{request.contact_phone}</div>
                   </div>


                   <div>
                     <div style={fieldLabelStyle}>被服務者</div>
                     <div style={fieldValueStyle}>
                       {request.care_receiver_name}／{request.care_receiver_gender}／{request.care_receiver_age}
                     </div>
                   </div>


                   <div style={{ gridColumn: "1 / -1" }}>
                     <div style={fieldLabelStyle}>服務地點</div>
                     <div style={fieldValueStyle}>
                       {request.contact_city}
                       {request.contact_district}
                       {request.street_address}
                     </div>
                   </div>


                   <div style={{ gridColumn: "1 / -1" }}>
                     <div style={fieldLabelStyle}>服務需求</div>
                     <div style={needTextStyle}>{request.service_need}</div>
                   </div>
                 </div>
               </div>
             );
           })}
         </div>
       )}
     </div>
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
 marginBottom: "24px",
};


const cardStyle: React.CSSProperties = {
 background: "#fff",
 border: "1px solid #e5e7eb",
 borderRadius: "20px",
 padding: "24px",
};


const itemStyle: React.CSSProperties = {
 borderBottom: "1px solid #f1f5f9",
 paddingBottom: "12px",
 marginBottom: "12px",
};


const labelStyle: React.CSSProperties = {
 color: "#6b7280",
 marginBottom: "6px",
 fontSize: "14px",
};


const valueStyle: React.CSSProperties = {
 fontWeight: 700,
 color: "#111827",
};


const sectionTitleStyle: React.CSSProperties = {
 fontSize: "22px",
 fontWeight: 800,
 color: "#111827",
 marginBottom: "16px",
};


const emptyTextStyle: React.CSSProperties = {
 color: "#6b7280",
 lineHeight: 1.8,
};


const requestListStyle: React.CSSProperties = {
 display: "grid",
 gap: "16px",
};


const requestCardStyle: React.CSSProperties = {
 border: "1px solid #e5e7eb",
 borderRadius: "18px",
 padding: "20px",
 background: "#f8fafc",
};


const requestTopRowStyle: React.CSSProperties = {
 display: "flex",
 justifyContent: "space-between",
 alignItems: "flex-start",
 gap: "12px",
 marginBottom: "16px",
};


const requestDateStyle: React.CSSProperties = {
 fontSize: "18px",
 fontWeight: 800,
 color: "#111827",
};


const requestSubStyle: React.CSSProperties = {
 marginTop: "4px",
 fontSize: "12px",
 color: "#6b7280",
};


const typeBadgeStyle: React.CSSProperties = {
 padding: "6px 10px",
 borderRadius: "999px",
 fontSize: "12px",
 fontWeight: 700,
};


const assignedBadgeStyle: React.CSSProperties = {
 background: "#e0f2fe",
 color: "#075985",
};


const unassignedBadgeStyle: React.CSSProperties = {
 background: "#ede9fe",
 color: "#6d28d9",
};


const statusBadgeStyle: React.CSSProperties = {
 padding: "6px 10px",
 borderRadius: "999px",
 fontSize: "12px",
 fontWeight: 700,
};


const pendingBadgeStyle: React.CSSProperties = {
 background: "#fef3c7",
 color: "#92400e",
};


const approvedBadgeStyle: React.CSSProperties = {
 background: "#dcfce7",
 color: "#166534",
};


const rejectedBadgeStyle: React.CSSProperties = {
 background: "#fee2e2",
 color: "#991b1b",
};


const requestGridStyle: React.CSSProperties = {
 display: "grid",
 gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
 gap: "14px",
};


const fieldLabelStyle: React.CSSProperties = {
 fontSize: "12px",
 color: "#6b7280",
 marginBottom: "4px",
};


const fieldValueStyle: React.CSSProperties = {
 fontSize: "14px",
 color: "#111827",
 fontWeight: 600,
 lineHeight: 1.6,
};


const needTextStyle: React.CSSProperties = {
 fontSize: "14px",
 color: "#111827",
 lineHeight: 1.8,
 whiteSpace: "pre-wrap",
};

