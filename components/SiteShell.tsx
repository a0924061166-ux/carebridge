"use client";


import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { User } from "@supabase/supabase-js";


export default function SiteShell({
 children,
}: {
 children: React.ReactNode;
}) {
 const router = useRouter();


 const [authOpen, setAuthOpen] = useState(false);
 const [authMode, setAuthMode] = useState<"login" | "register">("login");
 const [user, setUser] = useState<User | null>(null);
 const [isAdmin, setIsAdmin] = useState(false);
 const [accountType, setAccountType] = useState<string | null>(null);
 const [fullName, setFullName] = useState<string>("使用者");
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


 const openLoginAndRedirectTo = (path: string) => {
   sessionStorage.setItem("post_login_redirect", path);
   setAuthMode("login");
   setAuthOpen(true);
   setMobileMenuOpen(false);
 };


 useEffect(() => {
   let mounted = true;


   const applyUserState = async (currentUser: User | null) => {
     if (!mounted) return;


     setUser(currentUser);


     if (!currentUser) {
       setIsAdmin(false);
       setAccountType(null);
       setFullName("使用者");
       return;
     }


     const { data: profile, error } = await supabaseBrowser
       .from("profiles")
       .select("is_admin, account_type, full_name")
       .eq("id", currentUser.id)
       .maybeSingle();


     if (!mounted) return;


     if (error) {
       console.error("讀取 profiles 失敗：", error.message);
     }


     setIsAdmin(profile?.is_admin === true);
     setAccountType(profile?.account_type ?? null);
     setFullName(
       profile?.full_name ||
         currentUser.user_metadata?.full_name ||
         currentUser.email?.split("@")[0] ||
         "使用者"
     );
   };


   const init = async () => {
     const {
       data: { user },
     } = await supabaseBrowser.auth.getUser();
     await applyUserState(user);
   };


   init();


   const {
     data: { subscription },
   } = supabaseBrowser.auth.onAuthStateChange(async (_event, session) => {
     const currentUser = session?.user ?? null;
     await applyUserState(currentUser);


     if (currentUser) {
       const redirectPath = sessionStorage.getItem("post_login_redirect");


       if (redirectPath) {
         const { data: profile } = await supabaseBrowser
           .from("profiles")
           .select("account_type")
           .eq("id", currentUser.id)
           .maybeSingle();


         sessionStorage.removeItem("post_login_redirect");
         setAuthOpen(false);


         if (redirectPath === "/booking" && profile?.account_type !== "requester") {
           alert("只有需求者可以使用預約申請");
           router.push("/");
           return;
         }


         router.push(redirectPath);
       }
     }
   });


   const openAuthModal = (event: Event) => {
     const customEvent = event as CustomEvent<"login" | "register" | undefined>;
     setAuthMode(customEvent.detail === "login" ? "login" : "register");
     setAuthOpen(true);
   };


   window.addEventListener("open-auth-modal", openAuthModal as EventListener);


   return () => {
     mounted = false;
     subscription.unsubscribe();
     window.removeEventListener("open-auth-modal", openAuthModal as EventListener);
   };
 }, [router]);


 let profileHref = "";
 if (accountType === "requester") {
   profileHref = "/requester-profile/me";
 } else if (accountType === "provider") {
   profileHref = "/provider-profile/me";
 } else if (isAdmin) {
   profileHref = "/admin";
 }

 const closeMobileMenu = () => {
   setMobileMenuOpen(false);
 };


 return (
   <>
     <div style={headerOuterStyle}>
       <div style={headerInnerStyle}>
         <header style={headerStyle}>
           <Link href="/" style={logoStyle} onClick={closeMobileMenu}>
             CareBridge<span style={{ color: "#10b981" }}>.</span>
           </Link>

           <button
             type="button"
             className="mobile-menu-button"
             style={mobileMenuButtonStyle}
             onClick={() => setMobileMenuOpen((prev) => !prev)}
             aria-label="開啟選單"
           >
             {mobileMenuOpen ? "×" : "☰"}
           </button>

           <div className={mobileMenuOpen ? "site-menu site-menu-open" : "site-menu"}>
           <nav style={navStyle}>
             <Link href="/aboutus" style={navLink} onClick={closeMobileMenu}>
               關於我們
             </Link>


             <Link href="/services" style={navLink} onClick={closeMobileMenu}>
               服務項目
             </Link>


             {accountType !== "provider" &&
               (user ? (
                 <Link href="/booking" style={bookingNavLinkStyle} onClick={closeMobileMenu}>
                   預約申請
                 </Link>
               ) : (
                 <button
                   type="button"
                   style={bookingNavButtonStyle}
                   onClick={() => openLoginAndRedirectTo("/booking")}
                 >
                   預約申請
                 </button>
               ))}


             <a href="/#consult" style={navLink} onClick={closeMobileMenu}>
               免費諮詢
             </a>


             <Link href="/recruit-detail" style={navLink} onClick={closeMobileMenu}>
               招募人員
             </Link>


             {accountType === "provider" && (
               <Link href="/care-requests" style={navLink} onClick={closeMobileMenu}>
                 案件需求看板
               </Link>
             )}


             <Link href="/provider-profile" style={highlightNavLink} onClick={closeMobileMenu}>
               我們的照護人員
             </Link>
           </nav>


           <div style={authAreaStyle}>
             {user ? (
               <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                 <div style={{ textAlign: "right" }}>
                   {profileHref ? (
                     <Link href={profileHref} style={userNameLinkStyle} onClick={closeMobileMenu}>
                       {fullName}
                     </Link>
                   ) : (
                     <span style={userNameTextStyle}>{fullName}</span>
                   )}
                   <span style={{ fontSize: "11px", color: "#94a3b8", display: "block" }}>
                     已登入
                   </span>
                 </div>


                 <button
                   style={logoutButtonStyle}
                   onClick={async () => {
                     await supabaseBrowser.auth.signOut();
                     window.location.href = "/";
                   }}
                 >
                   登出
                 </button>
               </div>
             ) : (
               <>
                 <button
                   style={ghostButton}
                   onClick={() => {
                     setAuthMode("login");
                     setAuthOpen(true);
                     closeMobileMenu();
                   }}
                 >
                   登入
                 </button>
                 <button
                   style={primaryButton}
                   onClick={() => {
                     setAuthMode("register");
                     setAuthOpen(true);
                     closeMobileMenu();
                   }}
                 >
                   立即註冊
                 </button>
               </>
             )}
           </div>
           </div>
         </header>
       </div>
     </div>


     <main>{children}</main>


     <footer style={footerStyle}>
       <div style={footerContainerStyle}>
         <div style={footerTopGridStyle}>
           <div style={footerBrandBlockStyle}>
             <Link href="/" style={footerLogoStyle}>
               CareBridge<span style={{ color: "#10b981" }}>.</span>
             </Link>
             <p style={footerBrandTextStyle}>
               連結需求家庭與專業照護者，打造更透明、更安心、
               更有溫度的居家照護安排方式。
             </p>
             <div style={footerTagRowStyle}>
               <span style={footerTagStyle}>透明媒合</span>
               <span style={footerTagStyle}>專業支持</span>
               <span style={footerTagStyle}>安心照護</span>
             </div>
           </div>


           <div>
             <div style={footerTitleStyle}>網站導覽</div>
             <div style={footerLinkListStyle}>
               <Link href="/aboutus" style={footerLinkStyle}>
                 關於我們
               </Link>
               <Link href="/services" style={footerLinkStyle}>
                 服務項目
               </Link>
               <Link href="/recruit-detail" style={footerLinkStyle}>
                 招募人員
               </Link>
               <Link href="/provider-profile" style={footerLinkStyle}>
                 我們的照護人員
               </Link>
               <Link href="/booking" style={footerLinkStyle}>
                 預約申請
               </Link>
             </div>
           </div>


           <div>
             <div style={footerTitleStyle}>服務內容</div>
             <div style={footerTextListStyle}>
               <div style={footerInfoStyle}>居家陪伴照護</div>
               <div style={footerInfoStyle}>長者日常照護</div>
               <div style={footerInfoStyle}>陪診服務</div>
               <div style={footerInfoStyle}>術後照護</div>
               <div style={footerInfoStyle}>身心支持與生活協助</div>
             </div>
           </div>


           <div>
             <div style={footerTitleStyle}>聯絡與說明</div>
             <div style={footerTextListStyle}>
               <div style={footerInfoStyle}>免費諮詢：首頁表單聯絡</div>
               <div style={footerInfoStyle}>服務時間：週一至週五 09:00 - 18:00</div>
               <div style={footerInfoStyle}>平台合作與媒合資訊請以網站公告為準</div>
               <div style={footerInfoStyle}>CareBridge 居家照護媒合平台</div>
             </div>
           </div>
         </div>


         <div style={footerDividerStyle} />


         <div style={footerBottomStyle}>
           <span>© {new Date().getFullYear()} CareBridge. All rights reserved.</span>
           <div style={footerBottomLinksStyle}>
             <Link href="/aboutus" style={footerBottomLinkStyle}>
               關於我們
             </Link>
             <Link href="/services" style={footerBottomLinkStyle}>
               服務項目
             </Link>
             <Link href="/recruit-detail" style={footerBottomLinkStyle}>
               招募人員
             </Link>
           </div>
         </div>
       </div>
     </footer>


     {authOpen && (
       <AuthModal
         mode={authMode}
         onClose={() => setAuthOpen(false)}
         onSwitchMode={(mode) => setAuthMode(mode)}
       />
     )}
   </>
 );
}


function AuthModal({
 mode,
 onClose,
 onSwitchMode,
}: {
 mode: "login" | "register";
 onClose: () => void;
 onSwitchMode: (mode: "login" | "register") => void;
}) {
 const isRegister = mode === "register";


 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [registerType, setRegisterType] = useState<"requester" | "provider">("requester");
 const [licenseFile, setLicenseFile] = useState<File | null>(null);
 const [submitting, setSubmitting] = useState(false);


 const resetForm = () => {
   setName("");
   setEmail("");
   setPassword("");
   setConfirmPassword("");
   setRegisterType("requester");
   setLicenseFile(null);
 };


 const handleRegister = async () => {
   if (!name.trim()) {
     alert("請輸入名字");
     return;
   }


   if (password !== confirmPassword) {
     alert("兩次密碼不一致");
     return;
   }


   if (registerType === "provider" && !licenseFile) {
     alert("照護者請上傳證照或相關證明");
     return;
   }


   const { data: signUpData, error: signUpError } = await supabaseBrowser.auth.signUp({
     email,
     password,
     options: {
       data: {
         full_name: name,
         account_type: registerType,
       },
     },
   });


   if (signUpError) {
     throw signUpError;
   }


   const newUser = signUpData.user;
   if (!newUser) {
     throw new Error("註冊成功，但尚未取得使用者資料");
   }


   let licensePath: string | null = null;


   if (registerType === "provider" && licenseFile) {
     const ext = licenseFile.name.split(".").pop()?.toLowerCase() || "file";
     const filePath = `licenses/${newUser.id}-${Date.now()}.${ext}`;


     const { error: uploadError } = await supabaseBrowser.storage
       .from("licenses")
       .upload(filePath, licenseFile, {
         upsert: true,
       });


     if (uploadError) {
       throw new Error("證照上傳失敗：" + uploadError.message);
     }


     licensePath = filePath;
   }


   const { error: profileError } = await supabaseBrowser.from("profiles").upsert({
     id: newUser.id,
     full_name: name,
     account_type: registerType,
     license_url: licensePath,
   });


   if (profileError) {
     throw new Error("建立個人資料失敗：" + profileError.message);
   }


   alert("註冊成功，請查看信箱驗證");
   resetForm();
   onClose();
 };


 const handleLogin = async () => {
   const { error } = await supabaseBrowser.auth.signInWithPassword({
     email,
     password,
   });


   if (error) {
     throw error;
   }


   resetForm();
   onClose();
 };


 return (
   <div style={modalOverlayStyle} onClick={onClose}>
     <div style={modalCardStyle} onClick={(e) => e.stopPropagation()}>
       <button style={modalCloseStyle} onClick={onClose} type="button">
         ×
       </button>


       <div style={modalGridStyle}>
         <div style={modalLeftSideStyle}>
           <div style={badgeStyle}>{isRegister ? "立即加入" : "歡迎回來"}</div>
           <h2 style={modalTitleStyle}>{isRegister ? "建立帳號" : "帳號登入"}</h2>
           <p style={modalDescStyle}>
             {isRegister
               ? "開始您的照護旅程，建立個人資料並選擇適合的身分。"
               : "登入後即可管理您的個人資料、需求與合作紀錄。"}
           </p>
         </div>


         <div style={modalRightSideStyle}>
           <form
             onSubmit={async (e) => {
               e.preventDefault();
               setSubmitting(true);


               try {
                 if (isRegister) {
                   await handleRegister();
                 } else {
                   await handleLogin();
                 }
               } catch (err: any) {
                 alert(err?.message || "發生錯誤");
               } finally {
                 setSubmitting(false);
               }
             }}
             style={{ display: "grid", gap: "14px" }}
           >
             {isRegister && (
               <div>
                 <label style={labelStyle}>名字</label>
                 <input
                   style={inputStyle}
                   placeholder="請輸入名字"
                   required
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                 />
               </div>
             )}


             {isRegister && (
               <div>
                 <label style={labelStyle}>註冊身分</label>
                 <div style={roleSelectorWrapStyle}>
                   <button
                     type="button"
                     onClick={() => setRegisterType("requester")}
                     style={{
                       ...roleOptionStyle,
                       ...(registerType === "requester" ? roleOptionActiveStyle : {}),
                     }}
                   >
                     我是需求者
                   </button>


                   <button
                     type="button"
                     onClick={() => setRegisterType("provider")}
                     style={{
                       ...roleOptionStyle,
                       ...(registerType === "provider" ? roleOptionActiveStyle : {}),
                     }}
                   >
                     我是照護者
                   </button>
                 </div>
               </div>
             )}


             <div>
               <label style={labelStyle}>信箱</label>
               <input
                 type="email"
                 style={inputStyle}
                 placeholder="example@mail.com"
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
               />
             </div>


             <div>
               <label style={labelStyle}>密碼</label>
               <input
                 type="password"
                 style={inputStyle}
                 placeholder="至少 6 個字元"
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
               />
             </div>


             {isRegister && (
               <div>
                 <label style={labelStyle}>確認密碼</label>
                 <input
                   type="password"
                   style={inputStyle}
                   placeholder="再次輸入密碼"
                   required
                   value={confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
                 />
               </div>
             )}


             {isRegister && registerType === "provider" && (
               <div>
                 <label style={labelStyle}>上傳證照或相關證明</label>
                 <label style={uploadBoxStyle}>
                   <input
                     type="file"
                     accept=".pdf,.jpg,.jpeg,.png"
                     style={{ display: "none" }}
                     onChange={(e) => {
                       const file = e.target.files?.[0] ?? null;
                       setLicenseFile(file);
                     }}
                   />


                   <div style={uploadInnerStyle}>
                     <div style={uploadTitleStyle}>
                       {licenseFile ? "已選擇檔案" : "點擊上傳檔案"}
                     </div>
                     <div style={uploadDescStyle}>
                       {licenseFile ? licenseFile.name : "支援 PDF、JPG、JPEG、PNG 格式"}
                     </div>
                   </div>
                 </label>
               </div>
             )}


             <button type="submit" disabled={submitting} style={modalActionButtonStyle}>
               {submitting ? "處理中..." : isRegister ? "註冊" : "登入"}
             </button>


             <div style={switchRowStyle}>
               {isRegister ? "已經有帳號？" : "還沒有帳號？"}
               <button
                 type="button"
                 onClick={() => onSwitchMode(isRegister ? "login" : "register")}
                 style={switchModeButtonStyle}
               >
                 {isRegister ? "登入" : "立即註冊"}
               </button>
             </div>
           </form>
         </div>
       </div>
     </div>
   </div>
 );
}


const headerOuterStyle: React.CSSProperties = {
 position: "sticky",
 top: 0,
 zIndex: 1000,
 background: "rgba(248, 250, 252, 0.88)",
 backdropFilter: "blur(12px)",
 borderBottom: "1px solid rgba(229, 231, 235, 0.8)",
};


const headerInnerStyle: React.CSSProperties = {
 maxWidth: "1200px",
 margin: "0 auto",
 padding: "16px 20px",
};


const headerStyle: React.CSSProperties = {
 display: "flex",
 justifyContent: "space-between",
 alignItems: "center",
 flexWrap: "wrap",
 gap: "16px",
};


const authAreaStyle: React.CSSProperties = {
 display: "flex",
 gap: "12px",
 alignItems: "center",
};


const mobileMenuButtonStyle: React.CSSProperties = {
 display: "none",
 border: "1px solid #d1d5db",
 background: "#ffffff",
 borderRadius: "12px",
 padding: "8px 12px",
 fontSize: "22px",
 cursor: "pointer",
 lineHeight: 1,
};


const logoStyle: React.CSSProperties = {
 fontSize: "26px",
 fontWeight: 800,
 color: "#111827",
 textDecoration: "none",
};


const navStyle: React.CSSProperties = {
 display: "flex",
 gap: "20px",
 fontWeight: 600,
 fontSize: "15px",
 alignItems: "center",
};


const navLink: React.CSSProperties = {
 textDecoration: "none",
 color: "#374151",
};


const highlightNavLink: React.CSSProperties = {
 ...navLink,
 color: "#10b981",
 fontWeight: 800,
};


const bookingNavLinkStyle: React.CSSProperties = {
 textDecoration: "none",
 background: "#111827",
 color: "#ffffff",
 fontWeight: 800,
 fontSize: "14px",
 padding: "10px 18px",
 borderRadius: "999px",
};


const bookingNavButtonStyle: React.CSSProperties = {
 background: "#111827",
 color: "#ffffff",
 fontWeight: 800,
 fontSize: "14px",
 padding: "10px 18px",
 borderRadius: "999px",
 border: "none",
 cursor: "pointer",
};


const userNameLinkStyle: React.CSSProperties = {
 fontSize: "14px",
 fontWeight: 700,
 color: "#475569",
 display: "block",
 textDecoration: "none",
};


const userNameTextStyle: React.CSSProperties = {
 fontSize: "14px",
 fontWeight: 700,
 color: "#475569",
 display: "block",
};


const logoutButtonStyle: React.CSSProperties = {
 padding: "10px 16px",
 borderRadius: "999px",
 border: "1px solid #d1d5db",
 background: "#fff",
 cursor: "pointer",
 fontWeight: 700,
 color: "#111827",
};


const ghostButton: React.CSSProperties = {
 padding: "10px 18px",
 borderRadius: "999px",
 border: "1px solid #d1d5db",
 background: "#fff",
 cursor: "pointer",
 fontWeight: 700,
};


const primaryButton: React.CSSProperties = {
 padding: "10px 18px",
 borderRadius: "999px",
 background: "#111827",
 color: "#fff",
 border: "none",
 cursor: "pointer",
 fontWeight: 700,
};


const footerStyle: React.CSSProperties = {
 marginTop: "80px",
 background: "#0f172a",
 color: "#e2e8f0",
};


const footerContainerStyle: React.CSSProperties = {
 maxWidth: "1200px",
 margin: "0 auto",
 padding: "56px 20px 24px",
};


const footerTopGridStyle: React.CSSProperties = {
 display: "grid",
 gridTemplateColumns: "1.3fr 1fr 1fr 1fr",
 gap: "40px",
};


const footerBrandBlockStyle: React.CSSProperties = {
 maxWidth: "360px",
};


const footerLogoStyle: React.CSSProperties = {
 display: "inline-block",
 fontSize: "30px",
 fontWeight: 900,
 color: "#ffffff",
 textDecoration: "none",
 marginBottom: "18px",
};


const footerBrandTextStyle: React.CSSProperties = {
 fontSize: "15px",
 lineHeight: 1.9,
 color: "#cbd5e1",
 marginBottom: "20px",
};


const footerTagRowStyle: React.CSSProperties = {
 display: "flex",
 gap: "10px",
 flexWrap: "wrap",
};


const footerTagStyle: React.CSSProperties = {
 display: "inline-flex",
 padding: "8px 12px",
 borderRadius: "999px",
 background: "rgba(255,255,255,0.08)",
 color: "#f8fafc",
 fontSize: "13px",
 fontWeight: 700,
};


const footerTitleStyle: React.CSSProperties = {
 fontSize: "16px",
 fontWeight: 800,
 color: "#ffffff",
 marginBottom: "16px",
};


const footerLinkListStyle: React.CSSProperties = {
 display: "grid",
 gap: "12px",
};


const footerTextListStyle: React.CSSProperties = {
 display: "grid",
 gap: "12px",
};


const footerLinkStyle: React.CSSProperties = {
 textDecoration: "none",
 color: "#cbd5e1",
 fontSize: "15px",
};


const footerInfoStyle: React.CSSProperties = {
 color: "#cbd5e1",
 fontSize: "15px",
 lineHeight: 1.7,
};


const footerDividerStyle: React.CSSProperties = {
 height: "1px",
 background: "rgba(255,255,255,0.10)",
 margin: "36px 0 20px",
};


const footerBottomStyle: React.CSSProperties = {
 display: "flex",
 justifyContent: "space-between",
 alignItems: "center",
 gap: "16px",
 flexWrap: "wrap",
 color: "#94a3b8",
 fontSize: "14px",
};


const footerBottomLinksStyle: React.CSSProperties = {
 display: "flex",
 gap: "18px",
 flexWrap: "wrap",
};


const footerBottomLinkStyle: React.CSSProperties = {
 color: "#94a3b8",
 textDecoration: "none",
 fontSize: "14px",
};


const modalOverlayStyle: React.CSSProperties = {
 position: "fixed",
 inset: 0,
 background: "rgba(15, 23, 42, 0.45)",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 zIndex: 9999,
 padding: "20px",
};


const modalCardStyle: React.CSSProperties = {
 position: "relative",
 width: "100%",
 maxWidth: "960px",
 background: "#fff",
 borderRadius: "28px",
 overflow: "hidden",
 boxShadow: "0 30px 80px rgba(0,0,0,0.16)",
};


const modalGridStyle: React.CSSProperties = {
 display: "grid",
 gridTemplateColumns: "1fr 1.1fr",
 minHeight: "540px",
};


const modalLeftSideStyle: React.CSSProperties = {
 background: "linear-gradient(135deg, #ecfeff 0%, #f0fdf4 100%)",
 padding: "40px 30px",
 display: "flex",
 flexDirection: "column",
 justifyContent: "center",
};


const modalRightSideStyle: React.CSSProperties = {
 padding: "36px 32px",
};


const badgeStyle: React.CSSProperties = {
 display: "inline-flex",
 padding: "8px 12px",
 borderRadius: "999px",
 background: "#d1fae5",
 color: "#065f46",
 fontWeight: 800,
 marginBottom: "12px",
 width: "fit-content",
 fontSize: "13px",
};


const modalTitleStyle: React.CSSProperties = {
 fontSize: "32px",
 fontWeight: 900,
 marginBottom: "12px",
 color: "#111827",
};


const modalDescStyle: React.CSSProperties = {
 color: "#4b5563",
 fontSize: "15px",
 lineHeight: 1.8,
 maxWidth: "320px",
};


const modalCloseStyle: React.CSSProperties = {
 position: "absolute",
 top: "16px",
 right: "16px",
 background: "none",
 border: "none",
 fontSize: "24px",
 cursor: "pointer",
 color: "#374151",
};


const inputStyle: React.CSSProperties = {
 width: "100%",
 padding: "12px",
 borderRadius: "10px",
 border: "1px solid #cbd5e1",
 boxSizing: "border-box",
 fontSize: "15px",
};


const labelStyle: React.CSSProperties = {
 fontSize: "14px",
 fontWeight: 600,
 marginBottom: "6px",
 display: "block",
 color: "#111827",
};


const modalActionButtonStyle: React.CSSProperties = {
 width: "100%",
 padding: "14px",
 background: "#111827",
 color: "#fff",
 border: "none",
 borderRadius: "12px",
 fontWeight: 700,
 cursor: "pointer",
 fontSize: "16px",
 marginTop: "4px",
};


const switchRowStyle: React.CSSProperties = {
 textAlign: "center",
 fontSize: "14px",
 color: "#6b7280",
 marginTop: "10px",
};


const switchModeButtonStyle: React.CSSProperties = {
 background: "none",
 border: "none",
 color: "#10b981",
 fontWeight: 700,
 cursor: "pointer",
 marginLeft: "4px",
};


const roleSelectorWrapStyle: React.CSSProperties = {
 display: "grid",
 gridTemplateColumns: "1fr 1fr",
 gap: "10px",
};


const roleOptionStyle: React.CSSProperties = {
 padding: "12px 14px",
 borderRadius: "12px",
 border: "1px solid #d1d5db",
 background: "#fff",
 color: "#111827",
 fontWeight: 700,
 cursor: "pointer",
};


const roleOptionActiveStyle: React.CSSProperties = {
 background: "#ecfdf5",
 border: "1px solid #10b981",
 color: "#065f46",
};


const uploadBoxStyle: React.CSSProperties = {
 display: "block",
 border: "1px dashed #cbd5e1",
 borderRadius: "14px",
 background: "#f8fafc",
 padding: "14px",
 cursor: "pointer",
};


const uploadInnerStyle: React.CSSProperties = {
 display: "grid",
 gap: "4px",
};


const uploadTitleStyle: React.CSSProperties = {
 fontSize: "14px",
 fontWeight: 700,
 color: "#111827",
};


const uploadDescStyle: React.CSSProperties = {
 fontSize: "13px",
 color: "#6b7280",
 wordBreak: "break-all",
};

