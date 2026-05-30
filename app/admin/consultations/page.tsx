import { createClient } from "@/lib/supabase/server";
import { updateConsultationStatus } from "../actions";


type Consultation = {
 id: number;
 created_at: string;
 name: string;
 phone: string;
 email: string;
 service_type: string | null;
 note: string | null;
 status: string | null;
 replied_at: string | null;
};


export default async function AdminConsultationsPage() {
 const supabase = await createClient();


 const { data: consultations, error: consultationsError } = await supabase
   .from("consultations")
   .select("id, created_at, name, phone, email, service_type, note, status, replied_at")
   .order("created_at", { ascending: false });


 if (consultationsError) {
   return (
     <div>
       <h1>諮詢表單管理</h1>
       <p>讀取 consultations 失敗</p>
       <pre>{JSON.stringify(consultationsError, null, 2)}</pre>
     </div>
   );
 }


 const allConsultations = (consultations || []) as Consultation[];


 return (
   <div>
     <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>
       諮詢表單管理
     </h1>


     <div style={{ display: "grid", gap: 16 }}>
       {allConsultations.map((consultation) => (
         <div
           key={consultation.id}
           style={{
             border: "1px solid #ddd",
             borderRadius: 12,
             padding: 16,
             background: "#fff",
           }}
         >
           <div style={{ marginBottom: 12 }}>
             <div><strong>姓名：</strong>{consultation.name}</div>
             <div><strong>電話：</strong>{consultation.phone}</div>
             <div><strong>Email：</strong>{consultation.email}</div>
             <div><strong>服務項目：</strong>{consultation.service_type || "未填寫"}</div>
             <div><strong>備註：</strong>{consultation.note || "無"}</div>
             <div><strong>狀態：</strong>{consultation.status || "等待回覆"}</div>
             <div><strong>建立時間：</strong>{new Date(consultation.created_at).toLocaleString()}</div>
             <div>
               <strong>回覆時間：</strong>
               {consultation.replied_at
                 ? new Date(consultation.replied_at).toLocaleString()
                 : "尚未回覆"}
             </div>
           </div>


           <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
             <form action={updateConsultationStatus}>
               <input type="hidden" name="consultationId" value={consultation.id} />
               <input type="hidden" name="status" value="等待回覆" />
               <button type="submit">設為等待回覆</button>
             </form>


             <form action={updateConsultationStatus}>
               <input type="hidden" name="consultationId" value={consultation.id} />
               <input type="hidden" name="status" value="已回覆" />
               <button type="submit">設為已回覆</button>
             </form>
           </div>
         </div>
       ))}


       {allConsultations.length === 0 && <p>目前沒有諮詢資料</p>}
     </div>
   </div>
 );
}

