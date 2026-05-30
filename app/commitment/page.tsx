"use client";

import React from "react";
import Link from "next/link";

export default function CommitmentPage() {
  const promises = [
    { icon: "🛡️", title: "安全優先", desc: "嚴格把關服務者資格" },
    { icon: "📋", title: "一致標準", desc: "標準化 SOP 流程" },
    { icon: "🤝", title: "尊嚴溝通", desc: "同理心與雙向尊重" },
    { icon: "🔍", title: "資訊透明", desc: "費用與背景完全公開" },
    { icon: "📈", title: "持續改善", desc: "滿意度追蹤與優化" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111827", fontFamily: "sans-serif" }}>
      {/* --- 導航欄區塊已移除 --- */}

      {/* --- 標題區 --- */}
      <header style={{ textAlign: "center", padding: "60px 20px 0" }}>
        <div style={badgeStyle}>OUR MISSION</div>
        <h1 style={mainTitleStyle}>服務素質承諾</h1>
        <p style={subTitleStyle}>五大核心原則，築起家庭最安心的防護網</p>
      </header>

      {/* --- 圓環佈局區 --- */}
      <section style={circleContainerSection}>
        <div style={circleWrapper}>
          
          {/* 中心 Logo 核心 */}
          <div style={centerLogoStyle}>
            <div style={logoCircleInner}>
              <span style={{ fontSize: "14px", fontWeight: 800, color: "#10b981" }}>Care</span>
              <div style={{ fontSize: "20px", fontWeight: 900 }}>Bridge</div>
            </div>
          </div>

          {/* 圍繞的五個圓圈卡片 */}
          {promises.map((item, index) => {
            const angle = (index * 72 - 90) * (Math.PI / 180);
            const radius = 220; 
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div 
                key={index} 
                style={{
                  ...promiseCircleStyle,
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "6px" }}>{item.icon}</div>
                <div style={{ fontWeight: 800, fontSize: "16px", marginBottom: "4px", color: "#1e293b" }}>
                  {item.title}
                </div>
                <div style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.4", textAlign: "center" }}>
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- 詳細文字說明區 --- */}
      <section style={textDetailSection}>
        <div style={infoGrid}>
          <div style={infoBox}>
            <h4 style={infoTitle}>🛡️ 安全與專業的守護</h4>
            <p style={infoText}>
              我們深知居家照護的私密性與風險，因此不僅驗證證照，更重視職業倫理評估。
              每一位進入平台的照護夥伴都經過嚴格篩選，確保服務品質的一致性與安全性。
            </p>
          </div>
          <div style={infoBox}>
            <h4 style={infoTitle}>🤝 尊嚴與溫度的連結</h4>
            <p style={infoText}>
              照護不只是技術輸出，更是情感的陪伴。我們致力於建立透明的溝通機制，
              尊重被照顧者的自主權，並協助家屬在繁忙的生活中找到支持的平衡點。
            </p>
          </div>
        </div>
      </section>

      {/* --- 底部行動呼籲 --- */}
      <footer style={{ textAlign: "center", padding: "60px 20px 100px" }}>
        <div style={footerTextContainer}>
          <h2 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "16px" }}>
            「您不需要在資訊混亂中獨自承擔」
          </h2>
          <Link href="/#consult">
            <button style={ctaButtonStyle}>立即聯繫專業顧問</button>
          </Link>
        </div>
      </footer>
    </main>
  );
}

// --- 樣式定義區 ---

const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 12px",
  background: "#f0fdf4",
  color: "#16a34a",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: 800,
  letterSpacing: "0.1em",
  marginBottom: "16px",
};

const mainTitleStyle: React.CSSProperties = {
  fontSize: "42px",
  fontWeight: 900,
  letterSpacing: "-0.02em",
  marginBottom: "16px",
};

const subTitleStyle: React.CSSProperties = {
  fontSize: "18px",
  color: "#64748b",
  maxWidth: "600px",
  margin: "0 auto",
  lineHeight: "1.6",
};

const circleContainerSection: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "650px",
  width: "100%",
  position: "relative",
  overflow: "hidden",
};

const circleWrapper: React.CSSProperties = {
  position: "relative",
  width: "550px",
  height: "550px",
};

const centerLogoStyle: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "150px",
  height: "150px",
  background: "#ffffff",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 15px 45px rgba(0,0,0,0.08)",
  zIndex: 10,
  border: "1px solid #f1f5f9",
};

const logoCircleInner: React.CSSProperties = {
  textAlign: "center",
  border: "2px solid #10b981",
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const promiseCircleStyle: React.CSSProperties = {
  position: "absolute",
  width: "160px",
  height: "160px",
  background: "#ffffff",
  borderRadius: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
  border: "1px solid #f1f5f9",
  padding: "20px",
  boxSizing: "border-box",
};

const textDetailSection: React.CSSProperties = {
  maxWidth: "850px",
  margin: "0 auto",
  padding: "40px 20px",
};

const infoGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "30px",
};

const infoBox: React.CSSProperties = {
  padding: "30px",
  background: "#f8fafc",
  borderRadius: "28px",
  border: "1px solid #f1f5f9",
};

const infoTitle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 800,
  marginBottom: "12px",
  color: "#1e293b",
};

const infoText: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#475569",
};

const footerTextContainer: React.CSSProperties = {
  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
  padding: "60px 40px",
  borderRadius: "40px",
  maxWidth: "800px",
  margin: "0 auto",
};

const ctaButtonStyle: React.CSSProperties = {
  padding: "16px 40px",
  background: "#111827",
  color: "#ffffff",
  border: "none",
  borderRadius: "999px",
  fontWeight: 700,
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
};