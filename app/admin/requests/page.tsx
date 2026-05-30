import { createClient } from "@/lib/supabase/server";
import {
 updateRequestStatus,
 assignRequestProvider,
} from "../actions";


type Profile = {
 id: string;
 full_name: string | null;
 provider_status: string | null;
};


type CareRequest = {
 id: string;
 requester_id: string;
 title: string;
 description: string | null;
 status: string;
 accepted_by: string | null;
 created_at: string;
};


export default async function AdminRequestsPage() {
 const supabase = await createClient();


 const { data: profiles, error: profilesError } = await supabase
   .from("profiles")
   .select("id, full_name, provider_status")
   .order("full_name", { ascending: true });


 const { data: requests, error: requestsError } = await supabase
   .from("care_requests")
   .select("id, requester_id, title, description, status, accepted_by, created_at")
   .order("created_at", { ascending: false });


 if (profilesError) {
   return (
     <div>
       <h1>案件管理</h1>
       <p>讀取 profiles 失敗</p>
       <pre>{JSON.stringify(profilesError, null, 2)}</pre>
     </div>
   );
 }


 if (requestsError) {
   return (
     <div>
       <h1>案件管理</h1>
       <p>讀取 care_requests 失敗</p>
       <pre>{JSON.stringify(requestsError, null, 2)}</pre>
     </div>
   );
 }


 const allProfiles = (profiles || []) as Profile[];
 const allRequests = (requests || []) as CareRequest[];


 const approvedProviders = allProfiles.filter(
   (p) => p.provider_status === "approved"
 );


 const getProfileName = (id: string | null) => {
   if (!id) return "未指派";
   const profile = allProfiles.find((p) => p.id === id);
   return profile?.full_name || id;
 };


 return (
   <div>
     <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>案件管理</h1>


     <div style={{ display: "grid", gap: 16 }}>
       {allRequests.map((request) => (
         <div
           key={request.id}
           style={{
             border: "1px solid #ddd",
             borderRadius: 12,
             padding: 16,
             background: "#fff",
           }}
         >
           <div style={{ marginBottom: 12 }}>
             <div><strong>標題：</strong>{request.title}</div>
             <div><strong>描述：</strong>{request.description || "無"}</div>
             <div><strong>狀態：</strong>{request.status}</div>
             <div><strong>需求者：</strong>{getProfileName(request.requester_id)}</div>
             <div><strong>接案者：</strong>{getProfileName(request.accepted_by)}</div>
             <div><strong>建立時間：</strong>{new Date(request.created_at).toLocaleString()}</div>
           </div>


           <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
             <form action={updateRequestStatus}>
               <input type="hidden" name="requestId" value={request.id} />
               <select name="status" defaultValue={request.status}>
                 <option value="待媒合">待媒合</option>
                 <option value="進行中">進行中</option>
                 <option value="已完成">已完成</option>
                 <option value="已取消">已取消</option>
               </select>
               <button type="submit" style={{ marginLeft: 8 }}>
                 更新狀態
               </button>
             </form>


             <form action={assignRequestProvider}>
               <input type="hidden" name="requestId" value={request.id} />
               <select name="providerId" defaultValue={request.accepted_by || "null"}>
                 <option value="null">未指派</option>
                 {approvedProviders.map((provider) => (
                   <option key={provider.id} value={provider.id}>
                     {provider.full_name || provider.id}
                   </option>
                 ))}
               </select>
               <button type="submit" style={{ marginLeft: 8 }}>
                 指派 provider
               </button>
             </form>
           </div>
         </div>
       ))}


       {allRequests.length === 0 && <p>目前沒有案件</p>}
     </div>
   </div>
 );
}

