"use client";

import React from "react";
import Link from "next/link";
// 請確保環境已安裝 lucide-react：npm install lucide-react
import { CheckCircle2 } from "lucide-react";

export default function AboutUsHeroPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111827" }}>
      {/* 1. 改編後的 Hero Section */}
      <section style={heroSectionStyle}>
        <div style={heroBackgroundContainerStyle}>
          {/* 背景圖片：採用右圖護理師與百葉窗素材 */}
          <img 
            src="https://plus.unsplash.com/premium_photo-1665203562487-e63f5c39abaa?q=80&w=2232&auto=format&fit=crop" 
            alt="CareBridge 專業照護" 
            style={heroBackgroundImageStyle} 
          />
          {/* 關鍵漸層遮罩：模仿右圖的乾淨白底感 */}
          <div style={heroOverlayGradientStyle} />
        </div>

        <div style={heroContentWrapper}>
          <div style={heroTextContent}>
            {/* 樣式參考右圖的單個 Badge */}
            <div style={badgeStyle}>專業媒合・照護支持・透明管理</div>
            
            {/* 標題內容保留，樣式改為大氣的 Hero 風格 */}
            <h1 style={heroTitleStyle}>
              讓照護回到<br />
              <span style={{ color: "#059669" }}>信任、尊嚴與陪伴</span>
            </h1>
            
            {/* 保留原本的描述文字 */}
            <p style={heroDescStyle}>
              CareBridge 致力於打造一個更透明、更溫暖的居家照護媒合平台。我們相信，照護不只是安排一項服務，而是在家庭最需要支持的時候，提供一個更安心、更清楚、也更值得信任的選擇。
            </p>

            {/* 新增功能按鈕組 */}
            <div style={{ display: "flex", gap: "16px" }}>
              <button style={heroPrimaryButton}>開始使用</button>
              <button style={heroGhostButton}>免費諮詢</button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 下方內容區塊 (示範用，可自行替換) */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 900 }}>我們的使命</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }}>
          {["透明媒合", "專業支持", "家庭導向"].map((item) => (
            <div key={item} style={{ padding: "30px", border: "1px solid #e2e8f0", borderRadius: "20px", textAlign: "center" }}>
              <CheckCircle2 size={32} color="#10b981" style={{ marginBottom: "15px" }} />
              <h3 style={{ fontWeight: 800 }}>{item}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// --- 樣式定義 (CSS-in-JS) ---

const heroSectionStyle: React.CSSProperties = { 
  height: "85vh", 
  display: "flex", 
  alignItems: "center", 
  position: "relative", 
  overflow: "hidden",
  background: "#ffffff"
};

const heroBackgroundContainerStyle: React.CSSProperties = { 
  position: "absolute", 
  inset: 0, 
  zIndex: 0 
};

const heroBackgroundImageStyle: React.CSSProperties = { 
  width: "100%", 
  height: "100%", 
  objectFit: "cover", 
  objectPosition: "130% center", // 將圖片中的人物推向右側
  transform: "scale(1.1)" 
};

const heroOverlayGradientStyle: React.CSSProperties = { 
  position: "absolute", 
  inset: 0, 
  // 從左側純白漸變到右側透明，確保文字區域乾淨
  background: "linear-gradient(to right, #ffffff 0%, #ffffff 35%, rgba(255, 255, 255, 0) 100%)",
  zIndex: 1
};

const heroContentWrapper: React.CSSProperties = { 
  width: "100%", 
  maxWidth: "1200px", 
  margin: "0 auto", 
  position: "relative", 
  zIndex: 2, 
  padding: "0 20px" 
};

const heroTextContent: React.CSSProperties = { 
  maxWidth: "650px" 
};

const badgeStyle: React.CSSProperties = { 
  display: "inline-block", 
  padding: "8px 18px", 
  background: "#f0fdf4", 
  color: "#166534", 
  borderRadius: "999px", 
  fontWeight: 700, 
  marginBottom: "24px", 
  fontSize: "14px",
  border: "1px solid rgba(16, 185, 129, 0.2)"
};

const heroTitleStyle: React.CSSProperties = { 
  fontSize: "60px", 
  fontWeight: 900, 
  marginBottom: "24px", 
  lineHeight: 1.15,
  letterSpacing: "-1px"
};

const heroDescStyle: React.CSSProperties = { 
  fontSize: "18px", 
  lineHeight: 1.8, 
  color: "#475569", 
  marginBottom: "40px" 
};

const heroPrimaryButton: React.CSSProperties = { 
  padding: "16px 36px", 
  background: "#10b981", 
  color: "#fff", 
  borderRadius: "12px", 
  fontWeight: 700, 
  border: "none", 
  cursor: "pointer",
  fontSize: "16px",
  boxShadow: "0 10px 20px rgba(16, 185, 129, 0.2)"
};

const heroGhostButton: React.CSSProperties = { 
  padding: "16px 36px", 
  background: "#fff", 
  border: "1px solid #cbd5e1", 
  color: "#1e293b", 
  borderRadius: "12px", 
  fontWeight: 700, 
  cursor: "pointer",
  fontSize: "16px"
};