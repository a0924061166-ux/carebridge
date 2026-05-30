"use client";


import Link from "next/link";
import React from "react";
import {
 Heart,
 UserCheck,
 Users,
 ShieldCheck,
 ChevronRight,
 CheckCircle2,
 Sparkles,
 ArrowRight,
} from "lucide-react";


export default function AboutUsPage() {
 const coreValues = [
   {
     title: "安全優先",
     desc: "嚴格把關服務者資格與合作流程，讓家庭在選擇照護時更安心。",
   },
   {
     title: "一致標準",
     desc: "建立清楚的服務原則與 SOP，降低照護安排中的不確定性。",
   },
   {
     title: "尊嚴溝通",
     desc: "重視受照護者、家屬與照護者三方感受，讓合作建立在尊重上。",
   },
   {
     title: "資訊透明",
     desc: "服務內容、合作方式與流程說明更清楚，減少資訊不對稱。",
   },
   {
     title: "持續改善",
     desc: "透過回饋與實務經驗持續優化平台機制與服務品質。",
   },
 ];


 const issues = [
   "高齡人口快速增加，照護需求持續上升。",
   "許多家庭不清楚從哪裡開始找資源，也不確定如何判斷服務是否合適。",
   "城鄉與地區之間存在服務取得差異，真正需要時不一定能快速找到支持。",
   "照護人力不足與高流動率，讓穩定合作變得更困難。",
   "出院後、術後、陪診等臨時需求，常落在制度與市場之間的空白地帶。",
 ];


 const responses = [
   {
     title: "讓資訊更容易理解",
     text: "把複雜的照護資訊整理成家庭可以快速理解的內容，減少在脆弱時刻還要自行摸索的壓力。",
   },
   {
     title: "讓媒合更透明",
     text: "透過更清楚的服務資料、流程說明與合作機制，讓家庭與照護者建立更高的信任基礎。",
   },
   {
     title: "讓支持更貼近生活",
     text: "不只回應長期照護，也關注陪診、術後照顧、短期協助與生活支持等真實需求。",
   },
 ];


 return (
   <main style={pageStyle}>
     {/* 1. Hero Section - 增加高度以露出更多下方圖片 */}
     <section style={heroSectionStyle}>
       <div style={heroBackgroundContainerStyle}>
         <img
           src="/patty-brito-Y-3Dt0us7e0-unsplash.jpg"
           alt="Hero Background"
           style={heroBackgroundImageStyle}
         />
         <div style={heroGlowOneStyle} />
         <div style={heroGlowTwoStyle} />
         <div style={heroOverlayGradientStyle} />
       </div>


       <div style={heroContentWrapper}>
         <div style={heroTextContent}>
           <div style={eyebrowStyle}>ABOUT CAREBRIDGE</div>
           <h1 style={heroTitleStyle}>
             讓照護回到
             <br />
             <span style={heroTitleHighlightStyle}>信任、尊嚴與陪伴</span>
           </h1>
           <p style={heroDescStyle}>
             CareBridge 致力於打造一個更透明、更溫暖的居家照護媒合平台。
             我們相信，照護不只是安排一項服務，而是在家庭最需要支持的時候，
             提供一個更安心、更清楚、也更值得信任的選擇。
           </p>
           <div style={heroBadgeRowStyle}>
             <span style={pillStyle}>透明媒合</span>
             <span style={pillStyle}>專業支持</span>
             <span style={pillStyle}>家庭導向</span>
             <span style={pillStyle}>溫暖陪伴</span>
           </div>
         </div>
       </div>
     </section>


     <div style={containerStyle}>
       {/* Intro */}
       <section style={sectionSpacingStyle}>
         <div style={introBlockStyle}>
           <div style={smallCapsStyle}>OUR PURPOSE</div>
           <h2 style={sectionTitleCenterStyle}>我們為什麼存在</h2>
           <p style={introTextStyle}>
             當台灣正式邁入超高齡社會，越來越多家庭正面臨照護安排的現實壓力。
             真正困難的地方，往往是知道照護的重要性，但當需求發生時，
             不知道該找誰、不確定怎麼判斷、不清楚哪一種支持才真正適合當下的家人。
           </p>
           <p style={introTextStyle}>
             CareBridge 想做的，是成為這段過程中的橋樑。
             連結家庭、受照護者與專業照護者，讓照護不再只是資訊混亂中的臨時決定，
             而是一個可以被理解、被信任、被好好安排的過程。
           </p>
         </div>
       </section>


       {/* Issues */}
       <section style={sectionSpacingStyle}>
         <div style={sectionHeaderStyle}>
           <div style={smallCapsStyle}>WHAT WE SEE</div>
           <h2 style={sectionTitleStyle}>我們看見的照護現況</h2>
           <p style={introTextStyle}>
             我們持續觀察台灣長照與居家照護使用情境，發現問題早已不只是「有沒有服務」，
             而是「找不找得到、用不用得起、接不接得上、信不信得過」。
           </p>
         </div>


         <div style={issuePanelStyle}>
           <div style={issueLeftStyle}>
             <h3 style={issueBigTitleStyle}>
               照護需求正在增加，
               <br />
               但家庭仍常被困在
               <span style={{ color: "#059669" }}>資訊斷裂與選擇焦慮</span>之中。
             </h3>
           </div>
           <div style={issueRightStyle}>
             {issues.map((item) => (
               <div key={item} style={issueItemStyle}>
                 <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: 3 }} />
                 <span>{item}</span>
               </div>
             ))}
           </div>
         </div>
       </section>


       {/* Response */}
       <section style={sectionSpacingStyle}>
         <div style={sectionHeaderStyle}>
           <div style={smallCapsStyle}>OUR RESPONSE</div>
           <h2 style={sectionTitleStyle}>CareBridge 如何回應這些問題</h2>
         </div>
         <div style={threeGridStyle}>
           {responses.map((item) => (
             <div key={item.title} style={responseCardStyle}>
               <div style={responseIconStyle}>
                 <Sparkles size={20} color="#059669" />
               </div>
               <h3 style={cardTitleStyle}>{item.title}</h3>
               <p style={cardTextStyle}>{item.text}</p>
             </div>
           ))}
         </div>
       </section>


       {/* Values */}
       <section style={sectionSpacingStyle}>
         <div style={sectionHeaderStyle}>
           <div style={smallCapsStyle}>QUALITY COMMITMENT</div>
           <h2 style={sectionTitleStyle}>我們的五大服務承諾</h2>
           <p style={sectionDescStyle}>
             我們相信，真正值得信任的平台，不只要有溫度，也要有原則。
           </p>
         </div>
         <div style={valuesWrapStyle}>
           <div style={valuesCenterStyle}>
             <div style={valuesCenterInnerStyle}>
               <div style={centerMiniStyle}>Care</div>
               <div style={centerBrandStyle}>Bridge</div>
             </div>
           </div>
           <div style={valuesGridStyle}>
             {coreValues.map((item) => (
               <div key={item.title} style={valueCardStyle}>
                 <h3 style={valueTitleStyle}>{item.title}</h3>
                 <p style={valueTextStyle}>{item.desc}</p>
               </div>
             ))}
           </div>
         </div>
       </section>


       {/* Three promises */}
       <section style={sectionSpacingStyle}>
         <div style={sectionHeaderStyle}>
           <div style={smallCapsStyle}>WHO WE SERVE</div>
           <h2 style={sectionTitleStyle}>我們對每一方的承諾</h2>
         </div>
         <div style={promiseSectionStyle}>
           <div style={promiseCardStyle}>
             <div style={promiseIconWrapBlue}>
               <UserCheck size={26} color="#2563eb" />
             </div>
             <h3 style={promiseTitleStyle}>對於照護人員</h3>
             <h4 style={{ ...promiseSubTitleStyle, color: "#2563eb" }}>賦能專業，成就尊嚴</h4>
             <p style={promiseTextStyle}>
               我們希望建立更公平、透明且有秩序的合作環境。
               不只讓照護者有機會接案，更讓專業被看見、勞動價值被尊重。
             </p>
             <Link href="/recruit-detail" style={{ textDecoration: "none" }}>
               <button style={{ ...promiseButtonStyle, background: "#2563eb" }}>了解加入方式 <ChevronRight size={16} /></button>
             </Link>
           </div>
           <div style={promiseCardStyle}>
             <div style={promiseIconWrapGreen}>
               <Heart size={26} color="#10b981" />
             </div>
             <h3 style={promiseTitleStyle}>對於受照護者</h3>
             <h4 style={{ ...promiseSubTitleStyle, color: "#10b981" }}>溫暖守護，自在安老</h4>
             <p style={promiseTextStyle}>
               我們希望每一位受照護者都能在熟悉的生活環境中，
               獲得兼具專業與同理心的支持。守護一個人的感受與生命尊嚴。
             </p>
             <Link href="/services" style={{ textDecoration: "none" }}>
               <button style={{ ...promiseButtonStyle, background: "#10b981" }}>了解服務內容 <ChevronRight size={16} /></button>
             </Link>
           </div>
           <div style={promiseCardStyle}>
             <div style={promiseIconWrapOrange}>
               <Users size={26} color="#f97316" />
             </div>
             <h3 style={promiseTitleStyle}>對於家屬</h3>
             <h4 style={{ ...promiseSubTitleStyle, color: "#f97316" }}>分擔重擔，提供喘息</h4>
             <p style={promiseTextStyle}>
               我們理解家屬在照護路上的焦慮與疲憊。
               因此我們希望用更清楚的資訊，幫助家庭減少摸索與壓力。
             </p>
             <Link href="/#consult" style={{ textDecoration: "none" }}>
               <button style={{ ...promiseButtonStyle, background: "#f97316" }}>聯繫專業顧問 <ChevronRight size={16} /></button>
             </Link>
           </div>
         </div>
       </section>


       {/* Brand statement */}
       <section style={sectionSpacingStyle}>
         <div style={brandStatementStyle}>
           <ShieldCheck size={24} color="#10b981" />
           <h2 style={brandStatementTitleStyle}>
             我們想成為的，不只是媒合平台，
             <br />
             而是家庭在照護決策中可以安心依靠的橋樑。
           </h2>
           <p style={brandStatementTextStyle}>
             當家庭面對最需要支持的時刻，不必再花最多力氣去找答案。
             CareBridge 希望讓專業更靠近。
           </p>
         </div>
       </section>


       {/* CTA */}
       <section style={sectionSpacingStyle}>
         <div style={ctaSectionStyle}>
           <div>
             <div style={ctaMiniStyle}>START WITH CAREBRIDGE</div>
             <h2 style={ctaTitleStyle}>讓我們一起把照護這件事，做得更安心一點</h2>
             <p style={ctaTextStyle}>無論你是正在尋找照護支持的家庭，或希望加入平台的專業照護夥伴。</p>
           </div>
           <div style={ctaButtonRowStyle}>
             <Link href="/#consult" style={{ textDecoration: "none" }}>
               <button style={ctaPrimaryButtonStyle}>免費諮詢 <ArrowRight size={16} /></button>
             </Link>
             <Link href="/recruit-detail" style={{ textDecoration: "none" }}>
               <button style={ctaSecondaryButtonStyle}>加入照護夥伴</button>
             </Link>
           </div>
         </div>
       </section>
     </div>
   </main>
 );
}


// --- Styles ---


const pageStyle: React.CSSProperties = {
 minHeight: "100vh",
 background: "#ffffff",
 color: "#111827",
 fontFamily: "'PingFang TC', 'Noto Sans TC', sans-serif",
};


const heroSectionStyle: React.CSSProperties = {
  height: "110vh",
  display: "flex",
  alignItems: "flex-start",
  position: "relative",
  overflow: "hidden",
  background: "#ffffff",
};


const heroBackgroundContainerStyle: React.CSSProperties = {
 position: "absolute",
 inset: 0,
 zIndex: 0,
};


const heroBackgroundImageStyle: React.CSSProperties = {
 width: "100%",
 height: "100%",
 // 保持滿版 Cover
 objectFit: "cover",
 // 修正：調整 objectPosition 為 "115% bottom"，讓圖片靠右（115%）並貼齊底部，優先顯示下方內容
 objectPosition: "115% bottom",
 // 修正：稍微放大圖片（1.1），配合模糊效果並提供 Cover 模式裁切的餘裕
 transform: "scale(1.1)",
 filter: "blur(4px)",
 opacity: 0.9,
};


const heroOverlayGradientStyle: React.CSSProperties = {
 position: "absolute",
 inset: 0,
 background: "linear-gradient(to right, #ffffff 0%, #ffffff 35%, rgba(255, 255, 255, 0) 100%)",
 zIndex: 1,
};


const heroContentWrapper: React.CSSProperties = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  position: "relative",
  zIndex: 2,
  padding: "0 20px",
  display: "flex",
  alignItems: "center",
  minHeight: "100%",
};


const heroTextContent: React.CSSProperties = {
  maxWidth: "650px",
  marginTop: "-100px",
};


const heroGlowOneStyle: React.CSSProperties = {
 position: "absolute",
 top: "-80px",
 left: "-80px",
 width: "280px",
 height: "280px",
 borderRadius: "999px",
 background: "radial-gradient(circle, rgba(16,185,129,0.14), transparent 70%)",
};


const heroGlowTwoStyle: React.CSSProperties = {
 position: "absolute",
 right: "-100px",
 top: "30px",
 width: "320px",
 height: "320px",
 borderRadius: "999px",
 background: "radial-gradient(circle, rgba(59,130,246,0.09), transparent 70%)",
};


const eyebrowStyle: React.CSSProperties = {
 display: "inline-block",
 fontSize: "12px",
 fontWeight: 800,
 letterSpacing: "0.16em",
 color: "#059669",
 marginBottom: "18px",
};


const heroTitleStyle: React.CSSProperties = {
 fontSize: "64px",
 lineHeight: 1.08,
 letterSpacing: "-2px",
 fontWeight: 900,
 margin: "0 0 22px",
 color: "#0f172a",
};


const heroTitleHighlightStyle: React.CSSProperties = {
 color: "#059669",
};


const heroDescStyle: React.CSSProperties = {
 fontSize: "18px",
 lineHeight: 1.95,
 color: "#475569",
 margin: "0 0 26px",
};


const heroBadgeRowStyle: React.CSSProperties = {
 display: "flex",
 gap: "12px",
 flexWrap: "wrap",
};


const pillStyle: React.CSSProperties = {
 padding: "9px 14px",
 borderRadius: "999px",
 background: "#ffffff",
 border: "1px solid #dcfce7",
 color: "#166534",
 fontWeight: 700,
 fontSize: "14px",
};


const containerStyle: React.CSSProperties = {
 maxWidth: "1200px",
 margin: "0 auto",
 padding: "0 20px 110px",
};


const sectionSpacingStyle: React.CSSProperties = {
 paddingTop: "88px",
};


const introBlockStyle: React.CSSProperties = {
 maxWidth: "900px",
 margin: "0 auto",
 textAlign: "center",
};


const smallCapsStyle: React.CSSProperties = {
 display: "inline-block",
 fontSize: "12px",
 fontWeight: 800,
 letterSpacing: "0.16em",
 color: "#10b981",
 marginBottom: "14px",
};


const sectionHeaderStyle: React.CSSProperties = {
 maxWidth: "760px",
 margin: "0 auto 30px",
 textAlign: "center",
};


const sectionTitleStyle: React.CSSProperties = {
 fontSize: "42px",
 lineHeight: 1.15,
 fontWeight: 900,
 letterSpacing: "-1.2px",
 margin: "0 0 14px",
 color: "#0f172a",
};


const sectionTitleCenterStyle: React.CSSProperties = {
 fontSize: "42px",
 lineHeight: 1.15,
 fontWeight: 900,
 letterSpacing: "-1.2px",
 margin: "0 0 18px",
 color: "#0f172a",
};


const sectionDescStyle: React.CSSProperties = {
 fontSize: "16px",
 color: "#64748b",
 lineHeight: 1.9,
 margin: 0,
};


const introTextStyle: React.CSSProperties = {
 fontSize: "19px",
 lineHeight: 1.95,
 color: "#475569",
 margin: "0 0 18px",
};


const issuePanelStyle: React.CSSProperties = {
 display: "grid",
 gridTemplateColumns: "0.9fr 1.1fr",
 gap: "28px",
 alignItems: "stretch",
};


const issueLeftStyle: React.CSSProperties = {
 background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)",
 border: "1px solid #dcfce7",
 borderRadius: "32px",
 padding: "34px",
};


const issueBigTitleStyle: React.CSSProperties = {
 fontSize: "34px",
 lineHeight: 1.28,
 fontWeight: 900,
 letterSpacing: "-0.8px",
 margin: 0,
 color: "#0f172a",
};


const issueRightStyle: React.CSSProperties = {
 background: "#ffffff",
 border: "1px solid #e5e7eb",
 borderRadius: "32px",
 padding: "30px",
 display: "grid",
 gap: "16px",
 boxShadow: "0 16px 40px rgba(15,23,42,0.04)",
};


const issueItemStyle: React.CSSProperties = {
 display: "flex",
 gap: "12px",
 alignItems: "flex-start",
 fontSize: "16px",
 lineHeight: 1.85,
 color: "#334155",
};


const threeGridStyle: React.CSSProperties = {
 display: "grid",
 gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
 gap: "18px",
};


const responseCardStyle: React.CSSProperties = {
 background: "#ffffff",
 border: "1px solid #e5e7eb",
 borderRadius: "28px",
 padding: "28px",
 boxShadow: "0 14px 34px rgba(15,23,42,0.04)",
};


const responseIconStyle: React.CSSProperties = {
 width: "46px",
 height: "46px",
 borderRadius: "14px",
 background: "#f0fdf4",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 marginBottom: "16px",
};


const cardTitleStyle: React.CSSProperties = {
 fontSize: "22px",
 fontWeight: 800,
 margin: "0 0 10px",
 color: "#0f172a",
};


const cardTextStyle: React.CSSProperties = {
 fontSize: "15px",
 lineHeight: 1.9,
 color: "#64748b",
 margin: 0,
};


const valuesWrapStyle: React.CSSProperties = {
 background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
 border: "1px solid #e5e7eb",
 borderRadius: "36px",
 padding: "34px",
};


const valuesCenterStyle: React.CSSProperties = {
 display: "flex",
 justifyContent: "center",
 marginBottom: "28px",
};


const valuesCenterInnerStyle: React.CSSProperties = {
 width: "150px",
 height: "150px",
 borderRadius: "999px",
 background: "#ffffff",
 border: "2px solid #10b981",
 display: "flex",
 flexDirection: "column",
 justifyContent: "center",
 alignItems: "center",
 boxShadow: "0 12px 30px rgba(15,23,42,0.05)",
};


const centerMiniStyle: React.CSSProperties = {
 color: "#10b981",
 fontSize: "14px",
 fontWeight: 800,
};


const centerBrandStyle: React.CSSProperties = {
 color: "#111827",
 fontSize: "26px",
 fontWeight: 900,
};


const valuesGridStyle: React.CSSProperties = {
 display: "grid",
 gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
 gap: "16px",
};


const valueCardStyle: React.CSSProperties = {
 background: "#ffffff",
 border: "1px solid #e5e7eb",
 borderRadius: "24px",
 padding: "22px 18px",
 textAlign: "center",
};


const valueTitleStyle: React.CSSProperties = {
 fontSize: "18px",
 fontWeight: 800,
 marginBottom: "10px",
 color: "#0f172a",
};


const valueTextStyle: React.CSSProperties = {
 fontSize: "14px",
 lineHeight: 1.75,
 color: "#64748b",
 margin: 0,
};


const promiseSectionStyle: React.CSSProperties = {
 display: "grid",
 gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
 gap: "20px",
};


const promiseCardStyle: React.CSSProperties = {
 background: "#ffffff",
 border: "1px solid #e5e7eb",
 borderRadius: "30px",
 padding: "28px",
 boxShadow: "0 14px 34px rgba(15,23,42,0.04)",
};


const promiseIconWrapBlue: React.CSSProperties = {
 width: "54px",
 height: "54px",
 borderRadius: "16px",
 background: "#eff6ff",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 marginBottom: "16px",
};


const promiseIconWrapGreen: React.CSSProperties = {
 width: "54px",
 height: "54px",
 borderRadius: "16px",
 background: "#ecfdf5",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 marginBottom: "16px",
};


const promiseIconWrapOrange: React.CSSProperties = {
 width: "54px",
 height: "54px",
 borderRadius: "16px",
 background: "#fff7ed",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 marginBottom: "16px",
};


const promiseTitleStyle: React.CSSProperties = {
 fontSize: "26px",
 fontWeight: 900,
 margin: "0 0 6px",
 color: "#111827",
};


const promiseSubTitleStyle: React.CSSProperties = {
 fontSize: "16px",
 fontWeight: 800,
 margin: "0 0 16px",
};


const promiseTextStyle: React.CSSProperties = {
 fontSize: "15px",
 lineHeight: 1.95,
 color: "#64748b",
 margin: "0 0 24px",
};


const promiseButtonStyle: React.CSSProperties = {
 padding: "12px 22px",
 borderRadius: "999px",
 border: "none",
 color: "#fff",
 fontWeight: 800,
 fontSize: "15px",
 cursor: "pointer",
 display: "inline-flex",
 alignItems: "center",
 gap: "8px",
};


const brandStatementStyle: React.CSSProperties = {
 maxWidth: "900px",
 margin: "0 auto",
 padding: "56px 34px",
 background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)",
 border: "1px solid #dcfce7",
 borderRadius: "36px",
 textAlign: "center",
};


const brandStatementTitleStyle: React.CSSProperties = {
 fontSize: "36px",
 fontWeight: 900,
 lineHeight: 1.3,
 letterSpacing: "-0.8px",
 margin: "16px 0 18px",
 color: "#0f172a",
};


const brandStatementTextStyle: React.CSSProperties = {
 fontSize: "17px",
 lineHeight: 1.95,
 color: "#475569",
 margin: 0,
};


const ctaSectionStyle: React.CSSProperties = {
 background: "#0f172a",
 borderRadius: "36px",
 padding: "42px 36px",
 color: "#ffffff",
 display: "flex",
 justifyContent: "space-between",
 alignItems: "center",
 gap: "20px",
 flexWrap: "wrap",
};


const ctaMiniStyle: React.CSSProperties = {
 fontSize: "12px",
 fontWeight: 800,
 letterSpacing: "0.16em",
 color: "rgba(255,255,255,0.72)",
 marginBottom: "12px",
};


const ctaTitleStyle: React.CSSProperties = {
 fontSize: "34px",
 lineHeight: 1.2,
 fontWeight: 900,
 letterSpacing: "-1px",
 margin: "0 0 12px",
};


const ctaTextStyle: React.CSSProperties = {
 fontSize: "15px",
 lineHeight: 1.85,
 color: "rgba(255,255,255,0.78)",
 margin: 0,
 maxWidth: "640px",
};


const ctaButtonRowStyle: React.CSSProperties = {
 display: "flex",
 gap: "14px",
 flexWrap: "wrap",
};


const ctaPrimaryButtonStyle: React.CSSProperties = {
 padding: "14px 24px",
 borderRadius: "999px",
 border: "none",
 background: "#10b981",
 color: "#ffffff",
 fontWeight: 800,
 fontSize: "15px",
 cursor: "pointer",
 display: "inline-flex",
 alignItems: "center",
 gap: "8px",
};


const ctaSecondaryButtonStyle: React.CSSProperties = {
 padding: "14px 24px",
 borderRadius: "999px",
 border: "1px solid rgba(255,255,255,0.16)",
 background: "rgba(255,255,255,0.06)",
 color: "#ffffff",
 fontWeight: 800,
 fontSize: "15px",
 cursor: "pointer",
};

