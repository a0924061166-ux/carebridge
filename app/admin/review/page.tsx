import { createClient } from "@/lib/supabase/server";
import {
 updateProviderStatus,
} from "../actions";


type Profile = {
 id: string;
 full_name: string | null;
 phone: string | null;
 account_type: string | null;
 provider_status: string | null;
 license_url: string | null;
 is_admin: boolean;
};


export default async function AdminReviewPage() {
 const supabase = await createClient();


 const { data: profiles, error: profilesError } = await supabase
   .from("profiles")
   .select("id, full_name, phone, account_type, provider_status, license_url, is_admin")
   .order("full_name", { ascending: true });


 if (profilesError) {
   return (
     <div>
       <h1>審核</h1>
       <p>讀取 profiles 失敗</p>
       <pre>{JSON.stringify(profilesError, null, 2)}</pre>
     </div>
   );
 }


 const allProfiles = (profiles || []) as Profile[];


 return (
   <div>
     <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>審核</h1>


     <div style={{ display: "grid", gap: 16 }}>
       {allProfiles.map((profile) => (
         <div
           key={profile.id}
           style={{
             border: "1px solid #ddd",
             borderRadius: 12,
             padding: 16,
             background: "#fff",
           }}
         >
           <div style={{ marginBottom: 12 }}>
             <div><strong>姓名：</strong>{profile.full_name || "未填寫"}</div>
             <div><strong>電話：</strong>{profile.phone || "未填寫"}</div>
             <div><strong>帳號類型：</strong>{profile.account_type || "未設定"}</div>
             <div><strong>Provider 狀態：</strong>{profile.provider_status || "none"}</div>
             <div><strong>管理者：</strong>{profile.is_admin ? "是" : "否"}</div>
             <div>
               <strong>證照：</strong>
               {profile.license_url ? (
                 <a
                   href={profile.license_url}
                   target="_blank"
                   rel="noreferrer"
                   style={{ marginLeft: 8 }}
                 >
                   查看證照
                 </a>
               ) : (
                 " 未上傳"
               )}
             </div>
           </div>


           <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
             <form action={updateProviderStatus}>
               <input type="hidden" name="userId" value={profile.id} />
               <input type="hidden" name="providerStatus" value="approved" />
               <button type="submit">核准</button>
             </form>


             <form action={updateProviderStatus}>
               <input type="hidden" name="userId" value={profile.id} />
               <input type="hidden" name="providerStatus" value="rejected" />
               <button type="submit">拒絕</button>
             </form>


             <form action={updateProviderStatus}>
               <input type="hidden" name="userId" value={profile.id} />
               <input type="hidden" name="providerStatus" value="none" />
               <button type="submit">重設為 none</button>
             </form>


             <form action={updateProviderStatus}>
               <input type="hidden" name="userId" value={profile.id} />
               <input type="hidden" name="providerStatus" value="pending" />
               <button type="submit">設為 pending</button>
             </form>
           </div>
         </div>
       ))}


       {allProfiles.length === 0 && <p>目前沒有使用者資料</p>}
     </div>
   </div>
 );
}

