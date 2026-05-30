"use client";


import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";


const CITY_OPTIONS = [
 "台北市",
 "新北市",
 "基隆市",
 "桃園市",
 "新竹市",
 "新竹縣",
 "苗栗縣",
 "台中市",
 "彰化縣",
 "南投縣",
 "雲林縣",
 "嘉義市",
 "嘉義縣",
 "台南市",
 "高雄市",
 "屏東縣",
 "宜蘭縣",
 "花蓮縣",
 "台東縣",
 "澎湖縣",
 "金門縣",
 "連江縣",
];


type Provider = {
 id: string;
 full_name: string | null;
 bio: string | null;
 specialties: string | null;
 service_cities: string[] | null;
 availability_dates: string[] | null;
 avatar_url: string | null;
 intro_video_url: string | null;
 provider_status: string | null;
 account_type: string | null;
};


type BookingForm = {
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
};


const INITIAL_FORM: BookingForm = {
 service_date: "",
 preferred_time: "",
 contact_name: "",
 contact_phone: "",
 contact_city: "",
 contact_district: "",
 street_address: "",
 care_receiver_name: "",
 care_receiver_gender: "",
 care_receiver_age: "",
 service_need: "",
};


export default function BookingPage() {
 const [loading, setLoading] = useState(true);
 const [submittingId, setSubmittingId] = useState<string | null>(null);
 const [providers, setProviders] = useState<Provider[]>([]);
 const [selectedCity, setSelectedCity] = useState("");
 const [selectedDate, setSelectedDate] = useState("");


 const [form, setForm] = useState<BookingForm>(INITIAL_FORM);


 useEffect(() => {
   const loadProviders = async () => {
     try {
       const { data, error } = await supabaseBrowser
         .from("profiles")
         .select(
           "id, full_name, bio, specialties, service_cities, availability_dates, avatar_url, intro_video_url, provider_status, account_type"
         )
         .eq("account_type", "provider");


       if (error) {
         console.error("load providers error =", error);
         alert(`讀取照護者失敗：${error.message}`);
         return;
       }


       const approvedProviders = (data || []).filter((provider) => {
         return (
           provider.provider_status === "approved" ||
           provider.provider_status === "已通過審核" ||
           provider.provider_status === "通過"
         );
       });


       setProviders(approvedProviders);
     } catch (err) {
       console.error("loadProviders throw error =", err);
       alert("讀取照護者時發生錯誤");
     } finally {
       setLoading(false);
     }
   };


   loadProviders();
 }, []);


 const filteredProviders = useMemo(() => {
   return providers.filter((provider) => {
     const cityMatched =
       !selectedCity ||
       (provider.service_cities || []).includes(selectedCity);


     const dateMatched =
       !selectedDate ||
       (provider.availability_dates || []).includes(selectedDate);


     return cityMatched && dateMatched;
   });
 }, [providers, selectedCity, selectedDate]);


 const handleChange = (key: keyof BookingForm, value: string) => {
   setForm((prev) => ({
     ...prev,
     [key]: value,
   }));
 };


 const validateBookingForm = () => {
   const missingFields: string[] = [];


   if (!form.service_date) missingFields.push("服務日期");
   if (!form.preferred_time.trim()) missingFields.push("希望時段");
   if (!form.contact_name.trim()) missingFields.push("聯絡人姓名");
   if (!form.contact_phone.trim()) missingFields.push("聯絡電話");
   if (!form.contact_city) missingFields.push("服務縣市");
   if (!form.contact_district.trim()) missingFields.push("地區");
   if (!form.street_address.trim()) missingFields.push("詳細地址");
   if (!form.care_receiver_name.trim()) missingFields.push("被服務者姓名");
   if (!form.care_receiver_gender) missingFields.push("性別");
   if (!form.care_receiver_age.trim()) missingFields.push("年齡");
   if (!form.service_need.trim()) missingFields.push("服務需求");


   if (missingFields.length > 0) {
     alert(`請先完整填寫以下欄位：\n${missingFields.join("、")}`);
     return false;
   }


   return true;
 };


 const resetForm = () => {
   setForm(INITIAL_FORM);
   setSelectedCity("");
   setSelectedDate("");
 };


 const handleSubmitBooking = async (providerId: string) => {
   const {
     data: { user },
   } = await supabaseBrowser.auth.getUser();


   if (!user) {
     alert("請先登入再送出預約申請");
     window.location.href = "/";
     return;
   }


   if (!validateBookingForm()) return;


   setSubmittingId(providerId);


   const { error } = await supabaseBrowser.from("booking_requests").insert([
     {
       requester_id: user.id,
       provider_id: providerId,
       service_date: form.service_date,
       preferred_time: form.preferred_time,
       contact_name: form.contact_name,
       contact_phone: form.contact_phone,
       contact_city: form.contact_city,
       contact_district: form.contact_district,
       street_address: form.street_address,
       care_receiver_name: form.care_receiver_name,
       care_receiver_gender: form.care_receiver_gender,
       care_receiver_age: form.care_receiver_age,
       service_need: form.service_need,
       status: "pending",
     },
   ]);


   setSubmittingId(null);


   if (error) {
     console.error("create booking request error =", error);
     alert("送出預約申請失敗");
     return;
   }


   alert("已送出預約申請");
   resetForm();
 };


 const handleSubmitUnassignedBooking = async () => {
   const {
     data: { user },
   } = await supabaseBrowser.auth.getUser();


   if (!user) {
     alert("請先登入再送出預約申請");
     window.location.href = "/";
     return;
   }


   if (!validateBookingForm()) return;


   setSubmittingId("unassigned");


   const { error } = await supabaseBrowser.from("booking_requests").insert([
     {
       requester_id: user.id,
       provider_id: null,
       service_date: form.service_date,
       preferred_time: form.preferred_time,
       contact_name: form.contact_name,
       contact_phone: form.contact_phone,
       contact_city: form.contact_city,
       contact_district: form.contact_district,
       street_address: form.street_address,
       care_receiver_name: form.care_receiver_name,
       care_receiver_gender: form.care_receiver_gender,
       care_receiver_age: form.care_receiver_age,
       service_need: form.service_need,
       status: "pending",
     },
   ]);


   setSubmittingId(null);


   if (error) {
     console.error("create unassigned booking request error =", error);
     alert("送出預約申請失敗");
     return;
   }


   alert("已送出預約申請");
   resetForm();
 };


 return (
   <div style={pageWrapStyle}>
     <h1 style={pageTitleStyle}>預約申請</h1>
     <p style={pageDescStyle}>
       先填寫需求條件，系統會列出符合日期與地區的照護者，你可以查看詳情後再選擇送出申請。
     </p>


     <div style={cardStyle}>
       <div style={sectionTitleStyle}>需求條件</div>


       <div style={gridStyle}>
         <div>
           <div style={labelStyle}>服務日期</div>
           <input
             type="date"
             value={selectedDate}
             onChange={(e) => {
               setSelectedDate(e.target.value);
               handleChange("service_date", e.target.value);
             }}
             style={inputStyle}
           />
         </div>


         <div>
           <div style={labelStyle}>服務縣市</div>
           <select
             value={selectedCity}
             onChange={(e) => {
               setSelectedCity(e.target.value);
               handleChange("contact_city", e.target.value);
             }}
             style={inputStyle}
           >
             <option value="">請選擇縣市</option>
             {CITY_OPTIONS.map((city) => (
               <option key={city} value={city}>
                 {city}
               </option>
             ))}
           </select>
         </div>


         <div>
           <div style={labelStyle}>希望時段</div>
           <input
             value={form.preferred_time}
             onChange={(e) => handleChange("preferred_time", e.target.value)}
             placeholder="例如：09:00 - 12:00"
             style={inputStyle}
           />
         </div>


         <div>
           <div style={labelStyle}>聯絡人姓名</div>
           <input
             value={form.contact_name}
             onChange={(e) => handleChange("contact_name", e.target.value)}
             style={inputStyle}
           />
         </div>


         <div>
           <div style={labelStyle}>聯絡電話</div>
           <input
             value={form.contact_phone}
             onChange={(e) => handleChange("contact_phone", e.target.value)}
             style={inputStyle}
           />
         </div>


         <div>
           <div style={labelStyle}>地區</div>
           <input
             value={form.contact_district}
             onChange={(e) => handleChange("contact_district", e.target.value)}
             placeholder="例如：大安區"
             style={inputStyle}
           />
         </div>


         <div style={{ gridColumn: "1 / -1" }}>
           <div style={labelStyle}>詳細地址</div>
           <input
             value={form.street_address}
             onChange={(e) => handleChange("street_address", e.target.value)}
             style={inputStyle}
           />
         </div>


         <div>
           <div style={labelStyle}>被服務者姓名</div>
           <input
             value={form.care_receiver_name}
             onChange={(e) => handleChange("care_receiver_name", e.target.value)}
             style={inputStyle}
           />
         </div>


         <div>
           <div style={labelStyle}>性別</div>
           <select
             value={form.care_receiver_gender}
             onChange={(e) =>
               handleChange("care_receiver_gender", e.target.value)
             }
             style={inputStyle}
           >
             <option value="">請選擇</option>
             <option value="男">男</option>
             <option value="女">女</option>
             <option value="其他">其他</option>
           </select>
         </div>


         <div>
           <div style={labelStyle}>年齡</div>
           <input
             value={form.care_receiver_age}
             onChange={(e) => handleChange("care_receiver_age", e.target.value)}
             style={inputStyle}
           />
         </div>


         <div style={{ gridColumn: "1 / -1" }}>
           <div style={labelStyle}>服務需求</div>
           <textarea
             value={form.service_need}
             onChange={(e) => handleChange("service_need", e.target.value)}
             rows={5}
             style={textareaStyle}
             placeholder="例如：協助沐浴、餵食、陪同就醫、夜間看護..."
           />
         </div>
       </div>
     </div>


     <div style={{ height: 20 }} />


     <div style={cardStyle}>
       <div style={sectionTitleStyle}>符合條件的照護者</div>


       {loading ? (
         <div style={emptyTextStyle}>載入中...</div>
       ) : (
         <div style={providerListStyle}>
           <div style={unassignedCardStyle}>
 <div style={providerTopStyle}>
   <div style={unassignedAvatarStyle}>★</div>


   <div style={{ flex: 1 }}>
     <div style={providerNameStyle}>不指定照護者</div>


     <div style={mutedTextStyle}>
       沒有特定想找的人時，可以先送出需求，讓平台上的照護者從案件需求看板查看。
     </div>


     <div style={tagWrapStyle}>
       <span style={tagStyle}>平台媒合</span>
       <span style={tagStyle}>公開案件</span>
       <span style={tagStyle}>不指定人選</span>
     </div>
   </div>
 </div>


 <div style={bioStyle}>
   這個選項不會指定某一位照護者，案件會進入「案件需求看板」，供可接案的照護者瀏覽。
 </div>


 <div style={actionRowStyle}>
   <button
     type="button"
     style={submitBtnStyle}
     onClick={handleSubmitUnassignedBooking}
     disabled={submittingId === "unassigned"}
   >
     {submittingId === "unassigned" ? "送出中..." : "選擇不指定照護者"}
   </button>
 </div>
</div>


           {filteredProviders.length === 0 ? (
             <div style={emptyTextStyle}>目前沒有符合條件的指定照護者</div>
           ) : (
             filteredProviders.map((provider) => {
               const specialties = (provider.specialties || "")
                 .split(",")
                 .map((item) => item.trim())
                 .filter(Boolean);


               return (
                 <div key={provider.id} style={providerCardStyle}>
                   <div style={providerTopStyle}>
                     <img
                       src={
                         provider.avatar_url ||
                         `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                           provider.full_name || "provider"
                         )}`
                       }
                       alt={provider.full_name || "provider"}
                       style={avatarStyle}
                     />


                     <div style={{ flex: 1 }}>
                       <div style={providerNameStyle}>
                         {provider.full_name || "未命名照護者"}
                       </div>


                       <div style={mutedTextStyle}>
                         服務縣市：
                         {(provider.service_cities || []).length > 0
                           ? (provider.service_cities || []).join("、")
                           : "未設定"}
                       </div>


                       <div style={mutedTextStyle}>
                         可服務日期：
                         {(provider.availability_dates || []).length > 0
                           ? (provider.availability_dates || [])
                               .slice(0, 5)
                               .join("、")
                           : "未設定"}
                       </div>


                       {specialties.length > 0 ? (
                         <div style={tagWrapStyle}>
                           {specialties.map((tag) => (
                             <span key={tag} style={tagStyle}>
                               {tag}
                             </span>
                           ))}
                         </div>
                       ) : null}
                     </div>
                   </div>


                   <div style={bioStyle}>
                     {provider.bio?.trim() || "尚未填寫個人簡介"}
                   </div>


                   <div style={actionRowStyle}>
                     <Link
                       href={`/provider-profile/${provider.id}?from=booking`}
                       style={detailBtnStyle}
                     >
                       查看詳情
                     </Link>


                     <button
                       type="button"
                       style={submitBtnStyle}
                       onClick={() => handleSubmitBooking(provider.id)}
                       disabled={submittingId === provider.id}
                     >
                       {submittingId === provider.id ? "送出中..." : "選擇此照護者"}
                     </button>
                   </div>
                 </div>
               );
             })
           )}
         </div>
       )}
     </div>
   </div>
 );
}


const pageWrapStyle: React.CSSProperties = {
 maxWidth: "1080px",
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
 color: "#4b5563",
 lineHeight: 1.8,
 marginBottom: "24px",
};


const cardStyle: React.CSSProperties = {
 background: "#fff",
 border: "1px solid #e5e7eb",
 borderRadius: "20px",
 padding: "24px",
};


const sectionTitleStyle: React.CSSProperties = {
 fontSize: "20px",
 fontWeight: 800,
 color: "#111827",
 marginBottom: "16px",
};


const gridStyle: React.CSSProperties = {
 display: "grid",
 gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
 gap: "16px",
};


const labelStyle: React.CSSProperties = {
 fontSize: "14px",
 color: "#6b7280",
 marginBottom: "6px",
};


const inputStyle: React.CSSProperties = {
 width: "100%",
 padding: "12px",
 borderRadius: "12px",
 border: "1px solid #cbd5e1",
 boxSizing: "border-box",
 fontSize: "14px",
};


const textareaStyle: React.CSSProperties = {
 width: "100%",
 padding: "12px",
 borderRadius: "12px",
 border: "1px solid #cbd5e1",
 boxSizing: "border-box",
 fontSize: "14px",
 lineHeight: 1.6,
};


const emptyTextStyle: React.CSSProperties = {
 color: "#6b7280",
 lineHeight: 1.8,
};


const providerListStyle: React.CSSProperties = {
 display: "grid",
 gap: "16px",
};


const providerCardStyle: React.CSSProperties = {
 border: "1px solid #e5e7eb",
 borderRadius: "18px",
 padding: "18px",
 background: "#f8fafc",
};


const providerTopStyle: React.CSSProperties = {
 display: "flex",
 gap: "16px",
 alignItems: "flex-start",
};


const avatarStyle: React.CSSProperties = {
 width: "88px",
 height: "88px",
 borderRadius: "18px",
 objectFit: "cover",
 border: "1px solid #e5e7eb",
 background: "#fff",
};


const unassignedAvatarStyle: React.CSSProperties = {
 width: "88px",
 height: "88px",
 borderRadius: "18px",
 border: "1px solid #e5e7eb",
 background: "#fff",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 fontSize: "32px",
 fontWeight: 800,
 color: "#64748b",
};


const providerNameStyle: React.CSSProperties = {
 fontSize: "20px",
 fontWeight: 800,
 color: "#111827",
 marginBottom: "6px",
};


const mutedTextStyle: React.CSSProperties = {
 fontSize: "14px",
 color: "#6b7280",
 lineHeight: 1.8,
};


const bioStyle: React.CSSProperties = {
 marginTop: "14px",
 color: "#111827",
 lineHeight: 1.8,
 whiteSpace: "pre-wrap",
};


const tagWrapStyle: React.CSSProperties = {
 display: "flex",
 flexWrap: "wrap",
 gap: "8px",
 marginTop: "10px",
};


const tagStyle: React.CSSProperties = {
 padding: "6px 10px",
 borderRadius: "999px",
 background: "#e2e8f0",
 color: "#334155",
 fontSize: "12px",
 fontWeight: 700,
};


const actionRowStyle: React.CSSProperties = {
 display: "flex",
 gap: "12px",
 marginTop: "16px",
};


const detailBtnStyle: React.CSSProperties = {
 padding: "10px 16px",
 borderRadius: "12px",
 border: "1px solid #d1d5db",
 background: "#fff",
 color: "#111827",
 fontWeight: 700,
 textDecoration: "none",
};


const submitBtnStyle: React.CSSProperties = {
 padding: "10px 16px",
 borderRadius: "12px",
 border: "none",
 background: "#111827",
 color: "#fff",
 fontWeight: 700,
 cursor: "pointer",
};


const unassignedCardStyle: React.CSSProperties = {
 border: "2px solid #cbd5e1",
 borderRadius: "18px",
 padding: "18px",
 background: "#f8fafc",
};

