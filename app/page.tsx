"use client";




import React, { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import Link from "next/link";
import { ChevronRight, CheckCircle2 } from "lucide-react";




export default function HomePage() {
const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  service_type: "長者護理 (沐浴/進食)",
  note: "",
});




const [loading, setLoading] = useState(false);
const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);




const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);




  const { error } = await supabaseBrowser.from("consultations").insert([
    {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      service_type: formData.service_type,
      note: formData.note,
    },
  ]);




  setLoading(false);




  if (error) {
    console.error("提交失敗:", error);
    alert("提交失敗：" + error.message);
    return;
  }




  alert(
    `感謝 ${formData.name}！我們已收到您的諮詢，將聯繫您的電話：${formData.phone}`
  );




  setFormData({
    name: "",
    phone: "",
    email: "",
    service_type: "長者護理 (沐浴/進食)",
    note: "",
  });
};




const openLoginModal = () => {
  window.dispatchEvent(
    new CustomEvent("open-auth-modal", { detail: "login" })
  );
};




const services = [
  {
    id: "basic-care",
    title: "基本生活照護",
    text: "協助沐浴、更衣、如廁等日常起居，維持尊嚴生活。",
    img: "https://plus.unsplash.com/premium_photo-1664908241440-dda359485a28?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "nutrition",
    title: "飲食與營養照護",
    text: "專業備餐服務、餵食協助與營養評估，確保健康飲食。",
    img: "https://plus.unsplash.com/premium_photo-1681995460558-738a8856313c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "mobility",
    title: "行動與活動協助",
    text: "提供移位協助、陪同散步、關節運動，延緩機能退化。",
    img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "outdoor",
    title: "生活支援與外出陪伴",
    text: "陪同就醫診治、代購物品、社交陪伴，豐富退休生活。",
    img: "https://images.unsplash.com/photo-1532461844054-cee312ab1ce2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "medical",
    title: "醫療專業護理",
    text: "由專業人員進行傷口護理、管路照護、服藥提醒與狀況監測。",
    img: "https://images.unsplash.com/photo-1725870953863-4ad4db0acfc2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "companionship",
    title: "陪伴與安全照護",
    text: "著重心理支持與關懷陪伴，提供溫暖的身心靈照護，減緩壓力。",
    img: "https://plus.unsplash.com/premium_photo-1682089056529-c61c1d776e20?auto=format&fit=crop&q=80&w=800",
  },
];




return (
  <main
  style={{
    minHeight: "100vh",
    background: "#ffffff",
    color: "#111827",
    scrollBehavior: "smooth",
    fontFamily:
      '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "Helvetica Neue", Arial, sans-serif',
  }}
>
    {/* 1. Hero Section */}
    <section style={heroSectionStyle}>
      <div style={heroBackgroundContainerStyle}>
<img
  src="/hero-carebridge-family3.jpg"
  alt="Hero"
  style={heroBackgroundImageStyle}
/>
<div style={heroLeftBlurOverlayStyle} />
<div style={heroOverlayGradientStyle} />
</div>




      <div style={heroContentWrapper}>
        <div style={heroTextContent}>
          <div style={badgeStyle}>專業媒合・照護支持・透明管理</div>




          <h1 style={heroTitleStyle}>
            讓家庭照護更安心
            <br />
            讓專業服務更靠近
          </h1>




          <p style={heroSubtitleStyle}>
            CareBridge 協助家庭快速找到合適的照護服務，從需求諮詢、專業媒合到後續支持，
            讓每一次照護安排都更安心、更透明。
          </p>




          <div style={heroButtonRowStyle}>
            <button
              type="button"
              style={heroPrimaryButton}
              onClick={openLoginModal}
            >
              開始使用
            </button>




            <a href="#consult" style={{ textDecoration: "none" }}>
              <button type="button" style={heroGhostButton}>
                免費諮詢
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>




    {/* 2. 六宮格服務區塊 */}
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "88px 20px",
      }}
    >
      <div style={sectionIntroStyle}>
        <p style={sectionEyebrowStyle}>SERVICES</p>
        <h2 style={sectionTitleStyle}>依需求找到合適的照護服務</h2>
        <p style={sectionDescStyle}>
          從日常照顧到專業護理，CareBridge 提供更清楚、更安心的服務分類與媒合流程。
        </p>
      </div>




      <div style={serviceGridContainer}>
        {services.map((service, index) => {
          const isHovered = hoveredIndex === index;




          return (
            <a
              key={service.id}
              href={`/services#${service.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  ...horizontalCardStyle,
                  background: isHovered ? "#0f172a" : "#ffffff",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  transition:
                    "all 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  boxShadow: isHovered
                    ? "0 22px 45px rgba(15,23,42,0.12)"
                    : "0 8px 25px rgba(0,0,0,0.03)",
                }}
              >
                <div style={cardContentArea}>
                  <div style={cardHeaderRow}>
                    <h4
                      style={{
                        ...cardTitleStyle,
                        color: isHovered ? "#ffffff" : "#1e293b",
                      }}
                    >
                      {service.title}
                    </h4>




                    <div
                      style={{
                        ...cardCircleArrow,
                        background: isHovered ? "#ffffff" : "#10b981",
                      }}
                    >
                      <ChevronRight
                        size={14}
                        color={isHovered ? "#111827" : "#fff"}
                      />
                    </div>
                  </div>




                  <p
                    style={{
                      ...cardDescStyle,
                      color: isHovered ? "#cbd5e1" : "#64748b",
                    }}
                  >
                    {service.text}
                  </p>
                </div>




                <div style={cardImageArea}>
                  <div
                    style={{
                      ...greenArcDecoration,
                      background: isHovered
                        ? "rgba(255,255,255,0.05)"
                        : "#f0fdf4",
                    }}
                  />
                  <img
                    src={service.img}
                    alt={service.title}
                    style={{
                      ...cardImgStyle,
                      filter: isHovered ? "brightness(0.82)" : "none",
                      transform: isHovered ? "scale(1.04)" : "scale(1)",
                    }}
                  />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>




    {/* 3. 免費諮詢表單區塊 */}
    <section
      id="consult"
      style={{
        width: "100%",
        background: "#f8fafc",
        padding: "110px 20px",
      }}
    >
      <div style={consultContainerStyle}>
        <div>
          <h2
            style={{
              fontSize: "42px",
              fontWeight: 900,
              marginBottom: "20px",
              color: "#0f172a",
              lineHeight: 1.2,
            }}
          >
            免費諮詢
          </h2>




          <p
            style={{
              fontSize: "17px",
              color: "#4b5563",
              lineHeight: 1.8,
              marginBottom: "24px",
            }}
          >
            不確定家人需要哪一類照護？填寫表單後，顧問將在 24
            小時內聯絡您，協助釐清需求並提供更合適的安排建議。
          </p>




          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "40px",
              flexWrap: "wrap",
            }}
          >
            <div style={checkStyle}>
              <CheckCircle2 size={18} color="#10b981" />
              專業照護評估
            </div>
            <div style={checkStyle}>
              <CheckCircle2 size={18} color="#10b981" />
              客製化方案規劃
            </div>
            <div style={checkStyle}>
              <CheckCircle2 size={18} color="#10b981" />
              媒合流程說明
            </div>
          </div>




          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              paddingLeft: "10px",
            }}
          >
            <div style={verticalLineStyle} />




            <div style={stepItemVertical}>
              <span style={stepNumberStyle}>1</span>
              <div>
                <strong style={stepTitleStyle}>提交表單</strong>
                <span style={stepDescStyle}>留下您的聯絡方式與初步需求</span>
              </div>
            </div>




            <div style={stepItemVertical}>
              <span style={stepNumberStyle}>2</span>
              <div>
                <strong style={stepTitleStyle}>顧問聯繫</strong>
                <span style={stepDescStyle}>專業人員將致電進行深度評估</span>
              </div>
            </div>




            <div style={stepItemVertical}>
              <span style={stepNumberStyle}>3</span>
              <div>
                <strong style={stepTitleStyle}>方案建議</strong>
                <span style={stepDescStyle}>
                  獲得客製化照護計畫與媒合人選
                </span>
              </div>
            </div>
          </div>
        </div>




        <div style={formCardStyle}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <div>
                <label style={labelStyle}>姓名</label>
                <input
                  type="text"
                  placeholder="稱呼"
                  style={inputStyle}
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>




              <div>
                <label style={labelStyle}>聯絡電話</label>
                <input
                  type="tel"
                  placeholder="手機"
                  style={inputStyle}
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>




            <div>
              <label style={labelStyle}>電子郵件</label>
              <input
                type="email"
                placeholder="example@mail.com"
                style={inputStyle}
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>




            <div>
              <label style={labelStyle}>預約項目</label>
              <select
                style={inputStyle}
                value={formData.service_type}
                onChange={(e) =>
                  setFormData({ ...formData, service_type: e.target.value })
                }
              >
                <option>長者護理 (沐浴/進食)</option>
                <option>傷口護理</option>
                <option>陪診服務</option>
                <option>身心靈支持</option>
                <option>其他</option>
              </select>
            </div>




            <div>
              <label style={labelStyle}>備註說明</label>
              <textarea
                placeholder="請簡述您的需求..."
                style={textareaStyle}
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
              />
            </div>




            <button type="submit" disabled={loading} style={submitButtonStyle}>
              {loading ? "提交中..." : "立即提交諮詢"}
            </button>
          </form>
        </div>
      </div>
    </section>




    {/* 4. 成為夥伴招募區塊 */}
    <section
      id="recruit"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "88px 20px 100px",
      }}
    >
      <div style={recruitSectionStyle}>
        <div>
          <p style={recruitTagStyle}>RECRUITMENT</p>
          <h2 style={recruitTitleStyle}>成為 CareBridge 居家照護夥伴</h2>
          <p style={recruitTextStyle}>
            加入 CareBridge，成為值得信任的居家照護服務提供者。我們透過更透明的平台機制，
            協助您建立專業價值，讓更多真正有需求的家庭看見您。
          </p>




          <Link href="/recruit-detail">
            <button style={recruitButtonStyle}>成為照護夥伴</button>
          </Link>
        </div>




        <div style={recruitImageWrapStyle}>
          <img
            src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800"
            alt="Recruit"
            style={recruitImageStyle}
          />
        </div>
      </div>
    </section>
  </main>
);
}




// ===== Hero =====
const heroSectionStyle: React.CSSProperties = {
minHeight: "100vh",
display: "flex",
alignItems: "center",
position: "relative",
overflow: "hidden",
padding: "120px 0 70px",
};




const heroBackgroundContainerStyle: React.CSSProperties = {
position: "absolute",
inset: 0,
zIndex: 0,
};




const heroBackgroundImageStyle: React.CSSProperties = {
width: "100%",
height: "100%",
objectFit: "cover",
objectPosition: "right center",
transform: "scaleX(-1)",
zIndex: 1,
};




const heroOverlayGradientStyle: React.CSSProperties = {
position: "absolute",
inset: 0,
background: `
  linear-gradient(
    to right,
    rgba(255,255,255,0.88) 0%,
    rgba(255,255,255,0.80) 18%,
    rgba(255,255,255,0.66) 32%,
    rgba(255,255,255,0.46) 48%,
    rgba(255,255,255,0.26) 64%,
    rgba(255,255,255,0.14) 80%,
    rgba(255,255,255,0.08) 100%
  )
`,
zIndex: 2,
pointerEvents: "none",
};




const heroContentWrapper: React.CSSProperties = {
width: "100%",
maxWidth: "1320px",
margin: "0 auto",
position: "relative",
zIndex: 1,
padding: "0 32px",
};




const heroTextContent: React.CSSProperties = {
maxWidth: "760px",
marginTop: "-100px"
};




const badgeStyle: React.CSSProperties = {
display: "inline-block",
padding: "8px 18px",
background: "rgba(240,253,244,0.9)",
color: "#166534",
borderRadius: "999px",
fontWeight: 700,
marginBottom: "24px",
fontSize: "14px",
border: "1px solid rgba(16,185,129,0.15)",
backdropFilter: "blur(8px)",
};




const heroTitleStyle: React.CSSProperties = {
fontSize: "76px",
fontWeight: 900,
marginBottom: "22px",
lineHeight: 1.06,
letterSpacing: "-0.02em",
color: "#0f172a",
};




const heroSubtitleStyle: React.CSSProperties = {
fontSize: "20px",
lineHeight: 1.9,
color: "#475569",
margin: "0 0 34px",
maxWidth: "640px",
};




const heroButtonRowStyle: React.CSSProperties = {
display: "flex",
gap: "14px",
flexWrap: "wrap",
};




const heroPrimaryButton: React.CSSProperties = {
padding: "16px 30px",
background: "#10b981",
color: "#fff",
borderRadius: "12px",
fontWeight: 800,
border: "none",
cursor: "pointer",
fontSize: "16px",
boxShadow: "0 14px 30px rgba(16,185,129,0.22)",
};




const heroGhostButton: React.CSSProperties = {
padding: "16px 30px",
background: "rgba(255,255,255,0.88)",
border: "1px solid rgba(16,185,129,0.22)",
color: "#059669",
borderRadius: "12px",
fontWeight: 800,
cursor: "pointer",
fontSize: "16px",
backdropFilter: "blur(8px)",
};




// ===== Section intro =====
const sectionIntroStyle: React.CSSProperties = {
marginBottom: "34px",
};




const sectionEyebrowStyle: React.CSSProperties = {
color: "#10b981",
fontWeight: 800,
letterSpacing: "0.08em",
fontSize: "13px",
margin: "0 0 10px",
};




const sectionTitleStyle: React.CSSProperties = {
fontSize: "40px",
lineHeight: 1.2,
fontWeight: 900,
color: "#0f172a",
margin: "0 0 14px",
};




const sectionDescStyle: React.CSSProperties = {
fontSize: "17px",
lineHeight: 1.8,
color: "#64748b",
maxWidth: "760px",
margin: 0,
};




// ===== Services =====
const serviceGridContainer: React.CSSProperties = {
display: "grid",
gridTemplateColumns: "repeat(2, 1fr)",
gap: "24px",
width: "100%",
};




const horizontalCardStyle: React.CSSProperties = {
borderRadius: "22px",
overflow: "hidden",
border: "1px solid #f1f5f9",
display: "grid",
gridTemplateColumns: "0.62fr 0.38fr",
height: "168px",
alignItems: "stretch",
};




const cardContentArea: React.CSSProperties = {
padding: "24px",
display: "flex",
flexDirection: "column",
justifyContent: "center",
overflow: "hidden",
};




const cardHeaderRow: React.CSSProperties = {
display: "flex",
alignItems: "center",
gap: "10px",
marginBottom: "8px",
};




const cardTitleStyle: React.CSSProperties = {
fontSize: "18px",
fontWeight: 900,
margin: 0,
};




const cardCircleArrow: React.CSSProperties = {
minWidth: "24px",
height: "24px",
borderRadius: "50%",
display: "flex",
alignItems: "center",
justifyContent: "center",
};




const cardDescStyle: React.CSSProperties = {
fontSize: "14px",
lineHeight: 1.7,
margin: 0,
display: "-webkit-box",
WebkitLineClamp: 2,
WebkitBoxOrient: "vertical",
overflow: "hidden",
};




const cardImageArea: React.CSSProperties = {
position: "relative",
height: "100%",
overflow: "hidden",
};




const cardImgStyle: React.CSSProperties = {
width: "100%",
height: "100%",
objectFit: "cover",
position: "relative",
zIndex: 2,
transition: "transform 0.5s ease, filter 0.3s ease",
};




const greenArcDecoration: React.CSSProperties = {
position: "absolute",
bottom: "0",
right: "-20%",
width: "140%",
height: "120px",
borderRadius: "50%",
zIndex: 1,
transform: "translateY(20%)",
transition: "all 0.3s ease",
};




// ===== Consult =====
const consultContainerStyle: React.CSSProperties = {
display: "grid",
gridTemplateColumns: "1fr 1fr",
gap: "60px",
maxWidth: "1200px",
margin: "0 auto",
alignItems: "start",
};




const verticalLineStyle: React.CSSProperties = {
position: "absolute",
top: "15px",
bottom: "15px",
left: "25px",
width: "2px",
background: "#e2e8f0",
zIndex: 0,
};




const stepItemVertical: React.CSSProperties = {
display: "flex",
gap: "20px",
alignItems: "start",
position: "relative",
zIndex: 1,
};




const stepNumberStyle: React.CSSProperties = {
width: "32px",
height: "32px",
background: "#10b981",
color: "#fff",
borderRadius: "50%",
display: "flex",
alignItems: "center",
justifyContent: "center",
fontSize: "14px",
fontWeight: "bold",
flexShrink: 0,
};




const stepTitleStyle: React.CSSProperties = {
display: "block",
fontSize: "16px",
color: "#1e293b",
fontWeight: 700,
marginBottom: "4px",
};




const stepDescStyle: React.CSSProperties = {
fontSize: "14px",
color: "#64748b",
};




const checkStyle: React.CSSProperties = {
display: "flex",
gap: "8px",
fontWeight: 600,
alignItems: "center",
color: "#4b5563",
fontSize: "15px",
};




const formCardStyle: React.CSSProperties = {
background: "#fff",
padding: "32px",
borderRadius: "24px",
border: "1px solid #e2e8f0",
boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
};




const inputStyle: React.CSSProperties = {
width: "100%",
padding: "12px 14px",
borderRadius: "12px",
border: "1px solid #cbd5e1",
boxSizing: "border-box",
fontSize: "15px",
outline: "none",
background: "#ffffff",
};




const textareaStyle: React.CSSProperties = {
...inputStyle,
minHeight: "110px",
resize: "none",
};




const labelStyle: React.CSSProperties = {
display: "block",
fontSize: "14px",
fontWeight: 600,
marginBottom: "6px",
color: "#475569",
};




const submitButtonStyle: React.CSSProperties = {
width: "100%",
padding: "15px",
background: "#10b981",
color: "#fff",
border: "none",
borderRadius: "12px",
fontWeight: 800,
cursor: "pointer",
marginTop: "10px",
fontSize: "15px",
boxShadow: "0 14px 30px rgba(16,185,129,0.18)",
};




// ===== Recruit =====
const recruitSectionStyle: React.CSSProperties = {
display: "grid",
gridTemplateColumns: "1fr 1fr",
gap: "40px",
alignItems: "center",
background: "#ffffff",
border: "1px solid #e5e7eb",
borderRadius: "32px",
padding: "50px",
boxShadow: "0 16px 40px rgba(0,0,0,0.04)",
};




const recruitTagStyle: React.CSSProperties = {
color: "#10b981",
fontWeight: 800,
marginBottom: "10px",
};




const recruitTitleStyle: React.CSSProperties = {
fontSize: "42px",
fontWeight: 900,
lineHeight: 1.2,
margin: "0 0 20px",
color: "#0f172a",
};




const recruitTextStyle: React.CSSProperties = {
fontSize: "17px",
lineHeight: 1.8,
color: "#4b5563",
marginBottom: "24px",
};




const recruitButtonStyle: React.CSSProperties = {
padding: "14px 28px",
borderRadius: "12px",
border: "1px solid #10b981",
background: "#fff",
color: "#10b981",
fontWeight: 800,
cursor: "pointer",
};




const recruitImageWrapStyle: React.CSSProperties = {
width: "100%",
height: "400px",
borderRadius: "24px",
overflow: "hidden",
};




const recruitImageStyle: React.CSSProperties = {
width: "100%",
height: "100%",
objectFit: "cover",
};




const heroLeftBlurOverlayStyle: React.CSSProperties = {
position: "absolute",
inset: 0,
backdropFilter: "blur(16px)",
WebkitBackdropFilter: "blur(16px)",
background: "rgba(255,255,255,0.01)",
maskImage: `
  linear-gradient(
    to right,
    rgba(0,0,0,1) 0%,
    rgba(0,0,0,1) 20%,
    rgba(0,0,0,0.94) 32%,
    rgba(0,0,0,0.78) 44%,
    rgba(0,0,0,0.52) 56%,
    rgba(0,0,0,0.28) 68%,
    rgba(0,0,0,0.12) 80%,
    rgba(0,0,0,0.06) 90%,
    rgba(0,0,0,0.03) 100%
  )
`,
WebkitMaskImage: `
  linear-gradient(
    to right,
    rgba(0,0,0,1) 0%,
    rgba(0,0,0,1) 20%,
    rgba(0,0,0,0.94) 32%,
    rgba(0,0,0,0.78) 44%,
    rgba(0,0,0,0.52) 56%,
    rgba(0,0,0,0.28) 68%,
    rgba(0,0,0,0.12) 80%,
    rgba(0,0,0,0.06) 90%,
    rgba(0,0,0,0.03) 100%
  )
`,
zIndex: 1,
pointerEvents: "none",
};





