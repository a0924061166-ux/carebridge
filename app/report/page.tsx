"use client";

import React from "react";

export default function ResearchPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111827" }}>
      {/* --- 導航欄 --- */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "28px 20px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/" style={{ textDecoration: "none", color: "inherit", fontSize: "24px", fontWeight: 800 }}>
            CareBridge
          </a>
          <nav style={{ display: "flex", gap: "20px" }}>
            <a href="/" style={navLink}>首頁</a>
            <a href="/commitment" style={navLink}>服務承諾</a>
            <a href="/impact" style={navLink}>社會影響</a>
          </nav>
        </header>
      </section>

      {/* --- 文章主體內容 --- */}
      <article style={{ maxWidth: "850px", margin: "0 auto", padding: "40px 20px 100px", lineHeight: "1.8" }}>
        
        <header style={{ marginBottom: "60px", textAlign: "center" }}>
          <h1 style={{ fontSize: "48px", fontWeight: 900, marginBottom: "24px", letterSpacing: "-0.02em" }}>
            研究報告
          </h1>
          <p style={{ fontSize: "20px", color: "#4b5563", fontWeight: 500, maxWidth: "700px", margin: "0 auto" }}>
            台灣長照需求持續上升，照護服務仍存在明顯落差
          </p>
        </header>

        <section style={sectionStyle}>
          <p>
            台灣人口高齡化速度快速。國發會指出，台灣 2018 年已進入高齡社會，並於 2025 年跨入超高齡社會，代表 65 歲以上人口占比已超過 20%。高齡人口上升，意味著失能、失智、慢性病照護等需求同步增加。
          </p>
          <p style={{ marginTop: "20px" }}>
            為回應此趨勢，政府自 2017 年起推動長照 2.0，將服務對象與項目大幅擴張。然而，從使用者經驗與制度執行面來看，仍然存在幾個關鍵缺口。
          </p>
        </section>

        <hr style={hrStyle} />

        {/* 關鍵缺口分析 */}
        <div style={{ display: "grid", gap: "60px" }}>
          <ContentBlock 
            title="1. 制度擴大，但民眾仍面臨「不易用到」" 
            content="長照 2.0 雖然給付項目完整，但許多家庭最大的困難在於資訊理解與連結落差：不清楚資格、不知道申請起點、不確定目前需求應找政府還是民間資源。在緊急需要時，往往沒有時間慢慢研究制度。"
          />

          <ContentBlock 
            title="2. 城鄉與區域資源分布不均" 
            content="立法院資料顯示，長照資源布建存在明顯城鄉差距。真正的問題不是理論上有沒有服務，而是「我現在住的地方找不找到合適的人」、「服務能不能在需要的時間出現」。區域資源落差直接影響了服務的可近性。"
          />

          <ContentBlock 
            title="3. 人力不足與專業化瓶頸" 
            content="監察院與審計部均指出，人力規劃未盡周延，導致照服員負荷重、流動率高。當供給系統不穩定時，家庭在選擇服務時就更容易感到不確定，難以獲得連續且穩定的照護。"
          />

          <ContentBlock 
            title="4. 家庭照顧者壓力依然沉重" 
            content="雖然政策已承認「長照是在照顧整個家庭」，但在現實中，家屬仍面臨照護知識不足、情緒壓力無處消化、以及工作與家庭角色的衝突。真正需要的是更貼近生活節奏、反應更快的支持方式。"
          />

          <ContentBlock 
            title="5. 醫療與居家之間缺乏順暢銜接" 
            content="從醫療到長照之間仍常有斷點。例如出院後不清楚下一步安排，或短期術後需求無法順利銜接居家服務。這些資訊分散在醫院、政府與民間資源中，增加了家庭的負擔。"
          />

          <ContentBlock 
            title="6. 市場仍需要靈活的補充方案" 
            content="即便 2026 年啟動長照 3.0，民眾依然需要更具彈性的解決方案。民間平台在「臨時性需求」、「陪診協助」、「快速媒合」以及「高品質溝通」等方面仍扮演關鍵角色。"
          />
        </div>

        {/* 結論區塊 */}
        <section style={conclusionStyle}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "30px" }}>我們的觀察與結論</h2>
          <p style={{ marginBottom: "20px" }}>目前的挑戰已從「政策建立」轉向如何讓服務真正<strong>「找得到、用得到、接得上、信得過」</strong>。主要的結構性問題包括：</p>
          <ul style={{ textAlign: "left", display: "inline-block", margin: "0 auto", paddingLeft: "20px" }}>
            <li style={{ marginBottom: "10px" }}>服務資訊不直觀，理解成本高。</li>
            <li style={{ marginBottom: "10px" }}>資源分布不均，取得難度差異大。</li>
            <li style={{ marginBottom: "10px" }}>人力穩定性與專業化仍待加強。</li>
            <li style={{ marginBottom: "10px" }}>醫療、長照與家庭間存在銜接斷點。</li>
          </ul>
        </section>

        <section style={footerResearchStyle}>
          <h2 style={{ fontSize: "26px", fontWeight: 800, marginBottom: "20px" }}>這份研究對我們的意義</h2>
          <p style={{ fontSize: "19px", color: "#3730a3", fontWeight: 700, marginBottom: "15px" }}>
            看見一個明確存在的社會缺口。
          </p>
          <p style={{ color: "#4b5563" }}>
            我們投入居家照護配對平台，是為了成為橋樑。讓需要幫助的人，不必在最脆弱的時候，還要花最多力氣去找答案。
          </p>
        </section>

      </article>
    </main>
  );
}

// --- 輔助組件 ---

function ContentBlock({ title, content }: any) {
  return (
    <div style={{ borderLeft: "4px solid #eef2ff", paddingLeft: "24px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "16px", color: "#1e293b" }}>{title}</h2>
      <p style={{ color: "#475569", fontSize: "17px" }}>{content}</p>
    </div>
  );
}

// --- 樣式設定 ---

const navLink: React.CSSProperties = { textDecoration: "none", color: "#4b5563", fontWeight: 600, fontSize: "15px" };
const sectionStyle: React.CSSProperties = { fontSize: "18px", color: "#374151" };
const hrStyle: React.CSSProperties = { border: "none", borderTop: "1px solid #f1f5f9", margin: "60px 0" };
const conclusionStyle: React.CSSProperties = {
  marginTop: "80px", padding: "40px", background: "#f8fafc", borderRadius: "24px", textAlign: "center", border: "1px solid #e2e8f0"
};
const footerResearchStyle: React.CSSProperties = {
  marginTop: "40px", padding: "50px 40px", textAlign: "center"
};