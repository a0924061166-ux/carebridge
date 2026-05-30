"use server";


import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";


async function ensureAdmin() {
 const supabase = await createClient();


 const {
   data: { user },
 } = await supabase.auth.getUser();


 if (!user) {
   throw new Error("未登入");
 }


 const { data: profile, error } = await supabase
   .from("profiles")
   .select("id, is_admin")
   .eq("id", user.id)
   .single();


 if (error || !profile || !profile.is_admin) {
   throw new Error("你不是管理者");
 }


 return supabase;
}


export async function updateProviderStatus(formData: FormData) {
 const supabase = await ensureAdmin();


 const userId = String(formData.get("userId") || "");
 const providerStatus = String(formData.get("providerStatus") || "");


 if (!userId || !providerStatus) {
   throw new Error("缺少必要欄位");
 }


 const { error } = await supabase
   .from("profiles")
   .update({
     provider_status: providerStatus,
   })
   .eq("id", userId);


 if (error) {
   throw new Error(error.message);
 }


 revalidatePath("/admin");
}


export async function updateRequestStatus(formData: FormData) {
 const supabase = await ensureAdmin();


 const requestId = String(formData.get("requestId") || "");
 const status = String(formData.get("status") || "");


 if (!requestId || !status) {
   throw new Error("缺少必要欄位");
 }


 const { error } = await supabase
   .from("care_requests")
   .update({ status })
   .eq("id", requestId);


 if (error) {
   throw new Error(error.message);
 }


 revalidatePath("/admin");
}


export async function assignRequestProvider(formData: FormData) {
 const supabase = await ensureAdmin();


 const requestId = String(formData.get("requestId") || "");
 const providerIdRaw = String(formData.get("providerId") || "");
 const providerId = providerIdRaw === "null" ? null : providerIdRaw;


 if (!requestId) {
   throw new Error("缺少 requestId");
 }


 const { error } = await supabase
   .from("care_requests")
   .update({ accepted_by: providerId })
   .eq("id", requestId);


 if (error) {
   throw new Error(error.message);
 }


 revalidatePath("/admin");
}


export async function updateConsultationStatus(formData: FormData) {
 const consultationId = formData.get("consultationId");
 const status = formData.get("status");


 if (!consultationId || !status) {
   return;
 }


 const supabase = await createClient();


 const payload: {
   status: string;
   replied_at?: string | null;
 } = {
   status: String(status),
 };


 if (String(status) === "已回覆") {
   payload.replied_at = new Date().toISOString();
 } else {
   payload.replied_at = null;
 }


 const { error } = await supabase
   .from("consultations")
   .update(payload)
   .eq("id", Number(consultationId));


 if (error) {
   console.error("updateConsultationStatus error:", error);
   return;
 }


 revalidatePath("/admin");
}

