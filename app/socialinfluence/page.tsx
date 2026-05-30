"use client";

import React from "react";

export default function ImpactPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#ffffff", color: "#111827" }}>
      {/* --- 導航欄 (與全站保持一致) --- */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "28px 20px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/" style={{ textDecoration: "none", color: "inherit", fontSize: "24px", fontWeight: 800 }}>
            CareBridge
          </a>
          <nav style={{ display: "flex", gap: "20px" }}>
            <a href="/" style={navLink}>首頁</a>
            <a href="/commitment" style={navLink}>服務承諾</a>
            <a href="/#services" style={navLink}>服務項目</a>
          </nav>
        </header>
      </section>

      {/* --- 文章主體內容 --- */}
      <article style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px 100px", lineHeight: "1.8" }}>
        
        <header style={{ marginBottom: "60px", textAlign: "center" }}>
          <h1 style={{ fontSize: "48px", fontWeight: 900, marginBottom: "24px", letterSpacing: "-0.02em" }}>
            社會影響
          </h1>
          <p style={{ fontSize: "20px", color: "#4b5563", fontWeight: 500 }}>
            讓照護更容易被找到，讓家庭不再獨自承擔
          </p>
        </header>

        <section style={sectionStyle}>
          <p>
            我們創立這個平台，不只是為了建立一個服務媒合網站，而是希望回應一個正在快速擴大的社會問題：台灣高齡化正在加速，照護需求持續上升，但家庭往往仍然在資訊分散、人力不足與制度斷裂之間獨自承受壓力。
          </p>
          <div style={statsBoxStyle}>
            <p><strong>社會背景與趨勢：</strong></p>
            <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
              <li>根據國發會資料，台灣於 2018 年已進入高齡社會，並在 2025 年邁入超高齡社會，也就是 65 歲以上人口占比超過 20%。</li>
              <li>衛福部指出，長照 2.0 目標是建立從預防保健、社區支持到家庭照顧支持的完整體系。服務對象已擴大為 8 類，項目增加至 17 項。</li>
            </ul>
          </div>
          <p style={{ marginTop: "24px" }}>
            這代表需求正在變多、情境正在變複雜，而民眾需要的，不只是政策存在，而是能真正被使用、被理解、被連結的服務入口。
          </p>
        </section>

        <hr style={hrStyle} />

        <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "40px", textAlign: "center" }}>我們希望創造的社會價值</h2>

        {/* 社會價值列表 */}
        <div style={{ display: "grid", gap: "50px" }}>
          <ContentBlock 
            num="1" 
            title="降低家庭尋找照護資源的門檻" 
            content="許多家庭在面對術後照護、鼻胃管照護或短期支持時，最先遇到的問題是「不知道去哪裡找」。我們希望把原本分散、仰賴口耳相傳的資訊，變成易懂的服務入口，把家庭從焦慮與不對稱中拉出來。"
          />

          <ContentBlock 
            num="2" 
            title="減輕家庭照顧者的長期壓力" 
            content="衛福部已將照顧者支持納入制度重點。在真實生活中，家屬常同時承擔經濟與情緒壓力。平台的價值是讓照顧者有機會喘息，從「所有事都要自己撐」轉向「有人可以一起承擔」。"
          />

          <ContentBlock 
            num="3" 
            title="提升在地照護與居家老化的可行性" 
            content="「在地老化」是長照政策的重要方向。我們有效連結資源，就能成為在地照護的一部分，減少因照護困境而被迫機構化的情況，讓照顧更貼近生活，而不是只存在制度文件裡。"
          />

          <ContentBlock 
            num="4" 
            title="讓照護工作被看見、被尊重與管理" 
            content="照護工作價值高但可見度低。我們透過平台化管理，提升專業感與被尊重的程度。當品質可被評估時，整個產業更有機會走向專業化與可持續發展。"
          />

          <ContentBlock 
            num="5" 
            title="推動更公平的照護可近性" 
            content="長照需求不應只被高資源家庭滿足。我們希望讓資訊較弱勢的家庭，也能更容易接觸到基本且可信任的支援，讓照護成為更普遍、更有尊嚴的社會支持。"
          />

          <ContentBlock 
            num="6" 
            title="促進公私協力與照護創新" 
            content="超高齡社會需要跨部會、公私協力完備體系。我們扮演的角色不是取代制度，而是補上制度與使用者之間那段最容易斷掉的距離。"
          />
        </div>

        <section style={footerImpactStyle}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "20px" }}>不只是媒合，而是照護生活的不確定</h2>
          <p style={{ color: "#4b5563", marginBottom: "20px" }}>
            照護最令人疲憊的是連續的不確定：不知道何時需要人、找不到對的人、不知道費用與品質。
          </p>
          <p style={{ fontSize: "20px", color: "#3730a3", fontWeight: 700 }}>
            當家庭少一點慌張、照顧者多一點喘息、長者多一點尊嚴，這就是我們真正想創造的社會影響。
          </p>
        </section>

      </article>
    </main>
  );
}

// --- 輔助組件 ---

function ContentBlock({ num, title, content }: any) {
  return (
    <div style={{ position: "relative" }}>
      <div style={numberBadgeStyle}>{num}</div>
      <h2 style={{ fontSize: "26px", fontWeight: 800, marginBottom: "16px", paddingLeft: "50px" }}>{title}</h2>
      <div style={{ paddingLeft: "50px", color: "#374151", fontSize: "17px" }}>
        <p>{content}</p>
      </div>
    </div>
  );
}

// --- 樣式設定 ---

const navLink: React.CSSProperties = { textDecoration: "none", color: "#4b5563", fontWeight: 600, fontSize: "15px" };
const sectionStyle: React.CSSProperties = { fontSize: "18px", color: "#374151" };
const hrStyle: React.CSSProperties = { border: "none", borderTop: "1px solid #e5e7eb", margin: "60px 0" };
const statsBoxStyle: React.CSSProperties = { 
  background: "#f1f5f9", padding: "24px", borderRadius: "16px", marginTop: "24px", fontSize: "16px", borderLeft: "4px solid #64748b" 
};
const numberBadgeStyle: React.CSSProperties = {
  position: "absolute", left: "0", top: "0",
  width: "36px", height: "36px", background: "#eef2ff", color: "#3730a3",
  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
  fontWeight: 800, fontSize: "18px"
};
const footerImpactStyle: React.CSSProperties = {
  marginTop: "80px", padding: "50px 40px", background: "linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)", 
  borderRadius: "32px", textAlign: "center", border: "1px solid #e2e8f0"
};