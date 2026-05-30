"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
 Bath,
 Utensils,
 Accessibility,
 ShoppingBag,
 Stethoscope,
 ShieldCheck,
 ArrowRight,
 Sparkles,
 CheckCircle2,
 Clock3,
 CalendarDays,
 HeartHandshake,
 // 核心細項圖示
 User,
 Activity,
 HeartPulse,
 Waves,
 Droplets,
 Soup,
 HandHelping,
 TrendingUp,  // 替代樓梯：象徵向上移動
 Footprints,
 Stethoscope as MedicalIcon,
 Pipette,       
 RefreshCcw,
 Droplet,
 CircleDashed,
 Pill,
 Eye,
 MessageCircle,
 Search,
 ShowerHead,    
 SprayCan,      
 Users2,        
 UserSearch,    // 替代口鼻抽吸：聚焦面部檢查與處理
} from "lucide-react";

type ServiceItem = {
 name: string;
 detail: string;
 icon: React.ReactNode;
};

type ServiceCategory = {
 id: string;
 emoji: string;
 title: string;
 subtitle: string;
 icon: React.ReactNode;
 accent: string;
 soft: string;
 summary: string;
 columns: 2 | 3 | 4;
 items: ServiceItem[];
};

const serviceCategories: ServiceCategory[] = [
 {
   id: "basic-care",
   emoji: "🧩",
   title: "基本生活照護",
   subtitle: "日常生活與身體照顧",
   icon: <Bath size={22} />,
   accent: "#059669",
   soft: "#ecfdf5",
   summary: "協助長者完成日常起居與個人清潔，讓生活在家中也能維持舒適、穩定與尊嚴。",
   columns: 3,
   items: [
     { name: "基本身體清潔", detail: "梳頭修面、穿脫衣服、床上擦澡、床上洗頭、排泄物清理（含更換尿片、倒尿袋等）。", icon: <User size={20} /> },
     { name: "基本日常照顧", detail: "協助翻身、移位、上下床、刷牙洗臉、穿脫衣服、如廁、更換尿片、清洗便桶、整理床鋪、協助用藥等。", icon: <Activity size={20} /> },
     { name: "測量生命徵象", detail: "依個案需求測量血壓、體溫、脈搏與呼吸等基本生命徵象。", icon: <HeartPulse size={20} /> },
     { name: "協助沐浴及洗頭", detail: "協助或引導至浴間、穿脫衣服、全身淋浴、坐浴或盆浴、洗頭與事前事後整理。", icon: <ShowerHead size={20} /> },
     { name: "協助洗頭", detail: "協助移位或引導至浴間，洗頭、清潔弄濕或弄髒的身體部位，並完成環境整理。", icon: <SprayCan size={20} /> },
     { name: "協助排泄", detail: "協助如廁、小便、大便處理，觀察排泄物，尿袋更換、造廔袋清理及相關周邊照護。", icon: <Droplets size={20} /> },
   ],
 },
 {
   id: "nutrition",
   emoji: "🍽️",
   title: "飲食與營養照護",
   subtitle: "吃飯、餵食與餐食處理",
   icon: <Utensils size={22} />,
   accent: "#d97706",
   soft: "#fffbeb",
   summary: "從餐點準備到進食協助，幫助個案穩定攝取營養，也降低進食過程中的照護壓力。",
   columns: 2,
   items: [
     { name: "協助進食或管灌餵食", detail: "進食環境準備、加熱飯菜、餐具準備、協助餵食或灌食、觀察進食量與反應，並進行善後整理。", icon: <Utensils size={20} /> },
     { name: "餐食照顧", detail: "在案家備餐、備餐後用具與餐具清潔，也包含準備一天所需的管灌飲食與相關善後。", icon: <Soup size={20} /> },
   ],
 },
 {
   id: "mobility",
   emoji: "🚶",
   title: "行動與活動協助",
   subtitle: "移動、翻身與身體活動",
   icon: <Accessibility size={22} />,
   accent: "#2563eb",
   soft: "#eff6ff",
   summary: "協助維持活動能力與安全移動，降低跌倒風險，也幫助個案維持基本身體機能。",
   columns: 3,
   items: [
     { name: "翻身拍背", detail: "協助翻身、拍背、震顫與相關照護指導，適合長時間臥床者。", icon: <HandHelping size={20} /> },
     { name: "肢體關節活動", detail: "協助上肢、下肢被動運動，或督促與促進主動運動、站立練習。", icon: <Accessibility size={20} /> },
     { name: "協助上(下)樓梯", detail: "協助上或下樓梯，包含輪椅搬運上下樓梯，適用住家內外樓層移動。", icon: <TrendingUp size={20} /> },
   ],
 },
 {
   id: "outdoor",
   emoji: "🛒",
   title: "生活支援與外出服務",
   subtitle: "外出陪伴、就醫與代辦事項",
   icon: <ShoppingBag size={22} />,
   accent: "#7c3aed",
   soft: "#f5f3ff",
   summary: "協助處理就醫、購物、外出與代辦需求，讓家庭在照護之外，也能維持日常生活運作。",
   columns: 2,
   items: [
     { name: "陪同外出", detail: "陪伴購物、社交活動、辦理事務、用餐、散步、服務活動、復健、洗腎、運動等，不含交通服務。", icon: <Footprints size={20} /> },
     { name: "陪同就醫", detail: "協助掛號（含預約）、陪同就診、聽取與轉知醫囑、提醒注意事項，自案家出門起算 1.5 小時內適用。", icon: <MedicalIcon size={20} /> },
   ],
 },
 {
   id: "medical",
   emoji: "🏥",
   title: "醫療與專業護理協助",
   subtitle: "較專業的護理技術支持",
   icon: <Stethoscope size={22} />,
   accent: "#dc2626",
   soft: "#fef2f2",
   summary: "提供較具專業性的護理協助，適合有特殊醫療照護需求、管路照護需求或居家護理需求的個案。",
   columns: 3,
   items: [
     { name: "人工氣道管內分泌物抽吸", detail: "人工氣道管內分泌物清潔、抽吸與移除，以及氣切造口分泌物簡易照顧處理。", icon: <Pipette size={20} /> },
     { name: "口鼻抽吸", detail: "口腔或口鼻分泌物清潔、抽吸與移除，需由受訓人員依規範執行。", icon: <UserSearch size={20} /> },
     { name: "管路清潔", detail: "包含尿管與尿道口周邊清洗、更換固定膠布；鼻胃管清潔與確認固定位置等。", icon: <RefreshCcw size={20} /> },
     { name: "血糖機驗血糖", detail: "協助使用攜帶式血糖機進行血糖量測，依規範計算使用次數。", icon: <Droplet size={20} /> },
     { name: "甘油球通便", detail: "協助甘油球通便，依照服務規範與使用頻率辦理。", icon: <CircleDashed size={20} /> },
     { name: "依指示置入藥盒", detail: "依藥袋指示整理藥物置入藥盒，協助日常用藥管理。", icon: <Pill size={20} /> },
   ],
 },
 {
   id: "companionship",
   emoji: "🧠",
   title: "陪伴與安全照護",
   subtitle: "陪伴、巡視與安全支持",
   icon: <ShieldCheck size={22} />,
   accent: "#0f766e",
   soft: "#f0fdfa",
   summary: "不只照顧身體，也照顧情緒與安全感，適合需要看視、陪伴、認知支持或定時巡視的個案。",
   columns: 3,
   items: [
     { name: "安全看視", detail: "至案家陪伴、支持如遊戲或嗜好，看視安全或協助日常生活參與，並注意異常狀況。", icon: <Eye size={20} /> },
     { name: "陪伴服務", detail: "至案家陪伴看視、日常生活參與，或讀紙本、電子新聞與書信。", icon: <Users2 size={20} /> },
     { name: "巡視服務", detail: "上午 6 點至下午 6 點進行探視與簡易協助，至少 3 次。", icon: <Search size={20} /> },
   ],
 },
];

// --- 以下為頁面組件與樣式定義，完整保留 ---

const supportChecklist = [
 "身體清潔與沐浴協助",
 "如廁、更換尿布與排泄照護",
 "翻身、移位、上下床協助",
 "進食、餵食與餐食準備",
 "陪同外出與陪同就醫",
 "代購、代領與生活代辦",
 "生命徵象量測",
 "血糖量測與用藥整理",
 "抽痰、抽吸與管路照護",
 "陪伴服務與巡視服務",
];

const highlights = [
 { icon: <CalendarDays size={20} />, title: "服務分類清楚", text: "依照實際生活情境整理服務，不用先看懂代碼，也能快速知道自己需要什麼。" },
 { icon: <Clock3 size={20} />, title: "更快判斷需求", text: "先從大方向找到適合的照護類型，再進一步確認細項內容，減少溝通成本。" },
 { icon: <HeartHandshake size={20} />, title: "以家庭需求為中心", text: "從日常照顧到專業護理，都以家屬最常遇到的真實情境來設計服務頁面。" },
];

export default function ServicesPage() {
  const [canHover, setCanHover] = useState(false);
  const [hoveredItemName, setHoveredItemName] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanHover(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

 return (
   <div style={pageStyle}>
     {/* 1. Hero Section */}
     <section style={heroSectionStyle}>
       <div style={heroGlowOneStyle} />
       <div style={heroGlowTwoStyle} />
       <div style={heroInnerStyle}>
         <div style={heroBadgeStyle}><Sparkles size={14} /> HOME CARE SERVICES </div>
         <div style={heroGridStyle} className="hero-grid">
           <div>
             <div style={heroEyebrowStyle}>居家照護服務</div>
             <h1 style={heroTitleStyle}>為你的家人<br />找到更合適的照護安排</h1>
             <p style={heroTextStyle}>我們依照實際照護情境整理服務內容，從基本生活照護、飲食協助、外出陪同，到專業護理與安全看視，幫助家庭更快理解需求、選擇服務，也更安心地安排後續照護。</p>
             <div style={heroButtonRowStyle}>
               <Link href="/booking" style={heroPrimaryButtonStyle}>立即預約服務 <ArrowRight size={16} /></Link>
               <a href="/#consult" style={heroSecondaryButtonStyle}>免費諮詢</a>
             </div>
           </div>
           <div style={heroInfoCardStyle}>
             <div style={heroInfoMiniStyle}>服務涵蓋</div>
             <div style={heroInfoTitleStyle}>六大服務分類</div>
             <div style={heroInfoTextStyle}>從日常活動協助到醫療照護支援，以更生活化的方式呈現內容，讓家屬更容易判斷需求。</div>
             <div style={heroInfoListStyle}>
               {["基本生活照護", "飲食與營養照護", "行動與活動協助", "生活支援與外出服務", "醫療與專業護理協助", "陪伴與安全照護"].map((item) => (
                 <div key={item} style={heroInfoListItemStyle}><CheckCircle2 size={16} /><span>{item}</span></div>
               ))}
             </div>
           </div>
         </div>
       </div>
     </section>

     {/* 2. Service Categories */}
     <section style={sectionWrapStyle}>
       <div style={sectionHeaderStyle}>
         <div style={sectionMiniTitleStyle}>SERVICE CATEGORIES</div>
         <h2 style={sectionTitleStyle}>服務分類</h2>
         <p style={sectionTextStyle}>先從大方向理解照護需求，再進一步查看每一類服務中的細項內容與適用情境。</p>
       </div>

       <div style={servicesSectionListStyle}>
         {serviceCategories.map((service, index) => (
           <section key={service.title} id={service.id} style={{...serviceSectionStyle, scrollMarginTop: "100px"}}>
             <div style={serviceSectionHeaderStyle}>
               <div style={{...serviceSectionIconStyle, background: service.soft, color: service.accent}}>{service.icon}</div>
               <div style={serviceSectionTextWrapStyle}>
                 <div style={serviceSectionTitleRowStyle}>
                   <span>{service.emoji}</span>
                   <h3 style={serviceSectionTitleStyle}>{service.title}</h3>
                 </div>
                 <div style={serviceSectionSubtitleStyle}>{service.subtitle}</div>
                 <p style={serviceSectionSummaryStyle}>{service.summary}</p>
               </div>
             </div>

             <div style={{...serviceItemsGridStyle, gridTemplateColumns: `repeat(${service.columns}, minmax(0, 1fr))`}} className={`service-items-grid service-columns-${service.columns}`}>
               {service.items.map((item) => (
                 <div
                   key={item.name}
                   style={serviceItemCardStyle}
                   onMouseEnter={() => canHover && setHoveredItemName(item.name)}
                   onMouseLeave={() => setHoveredItemName(null)}
                 >
                   <div style={serviceItemDefaultStyle}>
                     <div style={{ ...serviceItemNameStyle, display: "flex", alignItems: "center", gap: "12px" }}>
                       <div style={{ color: service.accent, opacity: 0.8, display: "flex", alignItems: "center" }}>{item.icon}</div>
                       <span>{item.name}</span>
                     </div>
                   </div>

                   <div
                     style={{
                        ...serviceItemOverlayStyle,
                        opacity: hoveredItemName === item.name ? 1 : 0,
                        transform: hoveredItemName === item.name ? "translateY(0)" : "translateY(10px)",
                        pointerEvents: "none",
                        transition: "opacity 0.28s ease, transform 0.28s ease"
                     }}
                   >
                     <div style={{ ...serviceItemOverlayTitleStyle, display: "flex", alignItems: "center", gap: "10px" }}>
                       {item.icon}
                       <span>{item.name}</span>
                     </div>
                     <div style={serviceItemOverlayTextStyle}>{item.detail}</div>
                   </div>
                 </div>
               ))}
             </div>
             {index !== serviceCategories.length - 1 && <div style={serviceDividerStyle} />}
           </section>
         ))}
       </div>
     </section>

     {/* 3. Support Checklist */}
     <section style={supportSectionStyle}>
       <div style={supportInnerStyle}>
         <div style={supportHeaderStyle}>
           <div style={sectionMiniTitleStyle}>DAILY & MEDICAL SUPPORT</div>
           <h2 style={supportTitleStyle}>日常生活及醫療支援</h2>
           <p style={supportTextStyle}>將家屬最常詢問的照護內容整合成清單，方便快速確認是否符合目前需要。</p>
         </div>
         <div style={supportCardStyle}>
           <div style={supportListStyle}>
             {supportChecklist.map((item) => (
               <div key={item} style={supportItemStyle}><CheckCircle2 size={18} /><span>{item}</span></div>
             ))}
           </div>
           <div style={supportCtaWrapStyle}>
             <Link href="/booking" style={supportPrimaryButtonStyle}>立即預約服務 <ArrowRight size={16} /></Link>
           </div>
         </div>
       </div>
     </section>

     {/* 4. Why CareBridge */}
     <section style={highlightSectionStyle}>
       <div style={highlightInnerStyle}>
         <div style={sectionHeaderStyle}>
           <div style={sectionMiniTitleStyle}>WHY CAREBRIDGE</div>
           <h2 style={sectionTitleStyle}>讓照護選擇更容易</h2>
           <p style={sectionTextStyle}>不只是列出服務名稱，而是讓家屬更容易理解、比較並判斷真正需要的安排。</p>
         </div>
         <div style={highlightGridStyle}>
           {highlights.map((item) => (
             <div key={item.title} style={highlightCardStyle}>
               <div style={highlightIconStyle}>{item.icon}</div>
               <h3 style={highlightTitleStyle}>{item.title}</h3>
               <p style={highlightTextStyle}>{item.text}</p>
             </div>
           ))}
         </div>
       </div>
     </section>

     {/* 5. CTA Section */}
     <section style={ctaSectionStyle}>
       <div style={ctaGridStyle} className="cta-grid">
         <div style={ctaLightCardStyle}>
           <div style={ctaMiniStyle}>FREE CONSULTATION</div>
           <h3 style={ctaTitleDarkStyle}>不確定哪項服務比較適合？</h3>
           <p style={ctaTextDarkStyle}>如果你還不確定家中的照護需求屬於哪一類，可以先從免費諮詢開始，讓我們協助你判斷需求、了解可行的服務安排與後續流程。</p>
           <a href="/#consult" style={ctaGreenButtonStyle}>前往免費諮詢 <ArrowRight size={16} /></a>
         </div>
         <div style={ctaDarkCardStyle}>
           <div style={ctaMiniLightStyle}>BOOK NOW</div>
           <h3 style={ctaTitleLightStyle}>已經知道需求了？立即開始預約</h3>
           <p style={ctaTextLightStyle}>若你已有明確照護需求，可以直接前往預約申請頁，選擇指定照護者，或交由平台協助媒合合適人選。</p>
           <Link href="/booking" style={ctaWhiteButtonStyle}>立即預約申請 <ArrowRight size={16} /></Link>
         </div>
       </div>
     </section>

     <style jsx>{`
       @media (max-width: 1180px) { .service-columns-4 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
       @media (max-width: 1024px) { .hero-grid { grid-template-columns: 1fr !important; } .service-columns-3, .service-columns-4 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } .cta-grid { grid-template-columns: 1fr !important; } }
       @media (max-width: 640px) { .service-columns-2, .service-columns-3, .service-columns-4 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; } }
     `}</style>
   </div>
 );
}

// --- Styles ---
const pageStyle: React.CSSProperties = { fontFamily: "'PingFang TC', 'Microsoft JhengHei', sans-serif", background: "radial-gradient(circle at top left, rgba(16,185,129,0.08), transparent 24%), linear-gradient(180deg, #f8fafc 0%, #ffffff 42%, #ffffff 100%)", minHeight: "100vh", scrollBehavior: "smooth" };
const heroSectionStyle: React.CSSProperties = { position: "relative", overflow: "hidden", padding: "120px 20px 90px" };
const heroGlowOneStyle: React.CSSProperties = { position: "absolute", top: "-120px", left: "-80px", width: "360px", height: "360px", borderRadius: "999px", background: "rgba(16,185,129,0.10)", filter: "blur(24px)" };
const heroGlowTwoStyle: React.CSSProperties = { position: "absolute", right: "-80px", top: "20px", width: "300px", height: "300px", borderRadius: "999px", background: "rgba(15,23,42,0.06)", filter: "blur(28px)" };
const heroInnerStyle: React.CSSProperties = { position: "relative", zIndex: 2, maxWidth: "1180px", margin: "0 auto" };
const heroBadgeStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 14px", borderRadius: "999px", background: "rgba(255,255,255,0.72)", border: "1px solid rgba(255,255,255,0.7)", backdropFilter: "blur(14px)", color: "#047857", fontSize: "12px", fontWeight: 800, letterSpacing: "1px", marginBottom: "22px" };
const heroGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(320px, 0.75fr)", gap: "28px", alignItems: "stretch" };
const heroEyebrowStyle: React.CSSProperties = { color: "#10b981", fontSize: "14px", fontWeight: 800, letterSpacing: "1px", marginBottom: "14px" };
const heroTitleStyle: React.CSSProperties = { fontSize: "64px", fontWeight: 900, color: "#0f172a", lineHeight: 1.08, margin: 0, letterSpacing: "-1.5px" };
const heroTextStyle: React.CSSProperties = { marginTop: "24px", maxWidth: "780px", fontSize: "18px", lineHeight: 1.95, color: "#475569" };
const heroButtonRowStyle: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "30px" };
const heroPrimaryButtonStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 20px", borderRadius: "999px", background: "#10b981", color: "#ffffff", textDecoration: "none", fontWeight: 800, boxShadow: "0 10px 24px rgba(16,185,129,0.25)" };
const heroSecondaryButtonStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 20px", borderRadius: "999px", background: "rgba(255,255,255,0.86)", color: "#0f172a", textDecoration: "none", fontWeight: 800, border: "1px solid rgba(226,232,240,0.95)" };
const heroInfoCardStyle: React.CSSProperties = { background: "rgba(255,255,255,0.82)", border: "1px solid rgba(226,232,240,0.9)", borderRadius: "32px", padding: "30px", boxShadow: "0 24px 60px rgba(15, 23, 42, 0.06)", backdropFilter: "blur(12px)", display: "flex", flexDirection: "column", justifyContent: "center" };
const heroInfoMiniStyle: React.CSSProperties = { color: "#10b981", fontSize: "12px", fontWeight: 800, letterSpacing: "1px" };
const heroInfoTitleStyle: React.CSSProperties = { marginTop: "12px", fontSize: "28px", fontWeight: 900, color: "#0f172a" };
const heroInfoTextStyle: React.CSSProperties = { marginTop: "12px", color: "#64748b", fontSize: "15px", lineHeight: 1.85 };
const heroInfoListStyle: React.CSSProperties = { display: "grid", gap: "12px", marginTop: "22px" };
const heroInfoListItemStyle: React.CSSProperties = { display: "flex", alignItems: "center", gap: "10px", color: "#334155", fontSize: "14px", fontWeight: 700 };
const sectionWrapStyle: React.CSSProperties = { maxWidth: "1180px", margin: "0 auto", padding: "0 20px 90px" };
const sectionHeaderStyle: React.CSSProperties = { textAlign: "center", maxWidth: "780px", margin: "0 auto 46px" };
const sectionMiniTitleStyle: React.CSSProperties = { color: "#10b981", fontSize: "13px", fontWeight: 800, letterSpacing: "1px", marginBottom: "12px" };
const sectionTitleStyle: React.CSSProperties = { fontSize: "40px", fontWeight: 900, color: "#0f172a", margin: 0 };
const sectionTextStyle: React.CSSProperties = { marginTop: "16px", fontSize: "17px", lineHeight: 1.85, color: "#64748b" };
const servicesSectionListStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "40px" };
const serviceSectionStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "26px", position: "relative" };
const serviceSectionHeaderStyle: React.CSSProperties = { display: "flex", alignItems: "flex-start", gap: "16px" };
const serviceSectionIconStyle: React.CSSProperties = { width: "54px", height: "54px", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };
const serviceSectionTextWrapStyle: React.CSSProperties = { flex: 1 };
const serviceSectionTitleRowStyle: React.CSSProperties = { display: "flex", alignItems: "center", gap: "10px" };
const serviceSectionTitleStyle: React.CSSProperties = { margin: 0, fontSize: "30px", fontWeight: 900, color: "#0f172a" };
const serviceSectionSubtitleStyle: React.CSSProperties = { marginTop: "6px", color: "#64748b", fontSize: "14px", fontWeight: 700 };
const serviceSectionSummaryStyle: React.CSSProperties = { marginTop: "14px", marginBottom: 0, color: "#475569", fontSize: "16px", lineHeight: 1.9, maxWidth: "860px" };
const serviceItemsGridStyle: React.CSSProperties = { display: "grid", gap: "20px" };
const serviceItemCardStyle: React.CSSProperties = { minHeight: "190px", borderRadius: "24px", border: "1px solid rgba(226,232,240,0.95)", background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)", boxShadow: "0 10px 24px rgba(15, 23, 42, 0.04)", position: "relative", overflow: "hidden", cursor: "pointer" };
const serviceItemDefaultStyle: React.CSSProperties = { padding: "24px 22px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" };
const serviceItemNameStyle: React.CSSProperties = { fontSize: "22px", lineHeight: 1.45, fontWeight: 900, color: "#0f172a" };
const serviceItemOverlayStyle: React.CSSProperties = { position: "absolute", inset: 0, padding: "22px 20px", background: "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(15,23,42,0.92) 100%)", color: "#ffffff", display: "flex", flexDirection: "column", justifyContent: "center" };
const serviceItemOverlayTitleStyle: React.CSSProperties = { fontSize: "20px", lineHeight: 1.4, fontWeight: 900 };
const serviceItemOverlayTextStyle: React.CSSProperties = { marginTop: "12px", fontSize: "14px", lineHeight: 1.9, color: "#e2e8f0" };
const serviceDividerStyle: React.CSSProperties = { marginTop: "10px", height: "1px", width: "100%", background: "linear-gradient(90deg, rgba(16,185,129,0) 0%, rgba(16,185,129,0.35) 50%, rgba(16,185,129,0) 100%)" };
const supportSectionStyle: React.CSSProperties = { padding: "10px 20px 90px" };
const supportInnerStyle: React.CSSProperties = { maxWidth: "1180px", margin: "0 auto" };
const supportHeaderStyle: React.CSSProperties = { textAlign: "center", maxWidth: "760px", margin: "0 auto 34px" };
const supportTitleStyle: React.CSSProperties = { fontSize: "40px", fontWeight: 900, color: "#0f172a", margin: 0 };
const supportTextStyle: React.CSSProperties = { marginTop: "16px", color: "#64748b", fontSize: "17px", lineHeight: 1.85 };
const supportCardStyle: React.CSSProperties = { background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)", border: "1px solid rgba(226,232,240,0.95)", borderRadius: "34px", padding: "34px", boxShadow: "0 24px 60px rgba(15, 23, 42, 0.05)" };
const supportListStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px 24px" };
const supportItemStyle: React.CSSProperties = { display: "flex", alignItems: "center", gap: "10px", color: "#334155", fontSize: "15px", fontWeight: 700 };
const supportCtaWrapStyle: React.CSSProperties = { display: "flex", justifyContent: "center", marginTop: "28px" };
const supportPrimaryButtonStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 20px", borderRadius: "999px", background: "#0f172a", color: "#ffffff", textDecoration: "none", fontWeight: 800 };
const highlightSectionStyle: React.CSSProperties = { padding: "0 20px 90px" };
const highlightInnerStyle: React.CSSProperties = { maxWidth: "1180px", margin: "0 auto" };
const highlightGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" };
const highlightCardStyle: React.CSSProperties = { background: "rgba(255,255,255,0.9)", border: "1px solid rgba(226,232,240,0.9)", borderRadius: "30px", padding: "30px", boxShadow: "0 20px 50px rgba(15, 23, 42, 0.05)" };
const highlightIconStyle: React.CSSProperties = { width: "48px", height: "48px", borderRadius: "16px", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center" };
const highlightTitleStyle: React.CSSProperties = { marginTop: "18px", marginBottom: "10px", fontSize: "22px", fontWeight: 900, color: "#0f172a" };
const highlightTextStyle: React.CSSProperties = { margin: 0, color: "#64748b", fontSize: "15px", lineHeight: 1.85 };
const ctaSectionStyle: React.CSSProperties = { maxWidth: "1180px", margin: "0 auto", padding: "0 20px 110px" };
const ctaGridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px" };
const ctaLightCardStyle: React.CSSProperties = { background: "rgba(255,255,255,0.9)", border: "1px solid rgba(226,232,240,0.9)", borderRadius: "34px", padding: "46px", boxShadow: "0 24px 60px rgba(15, 23, 42, 0.05)" };
const ctaDarkCardStyle: React.CSSProperties = { background: "linear-gradient(135deg, #0f172a 0%, #111827 100%)", borderRadius: "34px", padding: "46px", boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)" };
const ctaMiniStyle: React.CSSProperties = { color: "#059669", fontSize: "12px", fontWeight: 800, letterSpacing: "1px" };
const ctaMiniLightStyle: React.CSSProperties = { color: "#6ee7b7", fontSize: "12px", fontWeight: 800, letterSpacing: "1px" };
const ctaTitleDarkStyle: React.CSSProperties = { marginTop: "14px", marginBottom: "14px", fontSize: "32px", fontWeight: 900, lineHeight: 1.25, color: "#0f172a" };
const ctaTitleLightStyle: React.CSSProperties = { marginTop: "14px", marginBottom: "14px", fontSize: "32px", fontWeight: 900, lineHeight: 1.25, color: "#ffffff" };
const ctaTextDarkStyle: React.CSSProperties = { color: "#475569", fontSize: "16px", lineHeight: 1.85 };
const ctaTextLightStyle: React.CSSProperties = { color: "#cbd5e1", fontSize: "16px", lineHeight: 1.85 };
const ctaGreenButtonStyle: React.CSSProperties = { marginTop: "26px", display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 20px", borderRadius: "999px", background: "#10b981", color: "#ffffff", textDecoration: "none", fontWeight: 800, boxShadow: "0 10px 24px rgba(16,185,129,0.25)" };
const ctaWhiteButtonStyle: React.CSSProperties = { marginTop: "26px", display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 20px", borderRadius: "999px", background: "#ffffff", color: "#0f172a", textDecoration: "none", fontWeight: 800, boxShadow: "0 10px 24px rgba(255,255,255,0.10)" };