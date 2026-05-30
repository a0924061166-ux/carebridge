"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

// 1. 定義資料結構
interface Requester {
  id: string;
  name: string;
  avatar: string;
  location: string;
  identityType: "本人" | "親屬" | "社工/醫護" | "法律代理人" | "鄰居/友人";
  relationText: string; 
  category: string;
  timeSlot: string;
  budget: string;
  urgency: "急尋" | "一般";
  tags: string[];
  // 環境與狀態指標
  hasElevator: boolean;
  hasPet: boolean;
  hasCCTV: boolean;
  updateTime: string;
  applicantCount: number;
}

export default function RequesterListPage() {
  // --- 2. 篩選狀態 ---
  const [filters, setFilters] = useState({
    location: "全部地區",
    identity: "全部身份",
    category: "全部需求",
    urgency: "全部程度"
  });

  // --- 3. 模擬資料庫 ---
  const allRequesters: Requester[] = [
    {
      id: "REQ-001",
      name: "張伯伯",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang",
      location: "台北市",
      identityType: "親屬",
      relationText: "兒子代訂",
      category: "失智照護",
      timeSlot: "週二四六 早上",
      budget: "$650/hr",
      urgency: "急尋",
      tags: ["備餐", "陪伴就醫"],
      hasElevator: true,
      hasPet: false,
      hasCCTV: true,
      updateTime: "2小時前",
      applicantCount: 5
    },
    {
      id: "REQ-002",
      name: "李奶奶",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Li",
      location: "新北市",
      identityType: "本人",
      relationText: "本人申請",
      category: "術後照護",
      timeSlot: "每日 下午",
      budget: "$700/hr",
      urgency: "一般",
      tags: ["傷口護理", "洗澡協助"],
      hasElevator: false,
      hasPet: true,
      hasCCTV: false,
      updateTime: "5小時前",
      applicantCount: 2
    },
    {
      id: "REQ-003",
      name: "陳小姐",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chen",
      location: "台北市",
      identityType: "社工/醫護",
      relationText: "醫院社工轉介",
      category: "居家生活",
      timeSlot: "平日 夜間",
      budget: "$600/hr",
      urgency: "急尋",
      tags: ["翻身拍背", "更換尿潔"],
      hasElevator: true,
      hasPet: false,
      hasCCTV: true,
      updateTime: "10分鐘前",
      applicantCount: 8
    }
  ];

  // --- 4. 篩選邏輯 ---
  const filteredData = useMemo(() => {
    return allRequesters.filter((item) => {
      const matchLoc = filters.location === "全部地區" || item.location === filters.location;
      const matchIden = filters.identity === "全部身份" || item.identityType === filters.identity;
      const matchCat = filters.category === "全部需求" || item.category === filters.category;
      const matchUrg = filters.urgency === "全部程度" || item.urgency === filters.urgency;
      return matchLoc && matchIden && matchCat && matchUrg;
    });
  }, [filters]);

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", paddingBottom: "100px" }}>
      
      {/* 標題區 */}
      <div style={{ background: "#fff", padding: "40px 20px", borderBottom: "1px solid #e5e7eb", textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800 }}>案件需求看板</h1>
        <p style={{ color: "#6b7280", marginTop: "8px" }}>瀏覽當前等待媒合的個案需求</p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* 篩選組件 */}
        <section style={filterContainerStyle}>
          <FilterSelect label="服務地區" options={["全部地區", "台北市", "新北市", "桃園市"]} value={filters.location} onChange={(v: string) => setFilters({...filters, location: v})} />
          <FilterSelect label="申請人身份" options={["全部身份", "本人", "親屬", "社工/醫護", "法律代理人", "鄰居/友人"]} value={filters.identity} onChange={(v: string) => setFilters({...filters, identity: v})} />
          <FilterSelect label="照護類別" options={["全部需求", "失智照護", "術後照護", "居家生活", "陪伴就醫"]} value={filters.category} onChange={(v: string) => setFilters({...filters, category: v})} />
          <FilterSelect label="緊急程度" options={["全部程度", "急尋", "一般"]} value={filters.urgency} onChange={(v: string) => setFilters({...filters, urgency: v})} />
          <button onClick={() => setFilters({location: "全部地區", identity: "全部身份", category: "全部需求", urgency: "全部程度"})} style={resetBtnStyle}>重設</button>
        </section>

        {/* 列表網格 */}
        <div style={gridStyle}>
          {filteredData.map((req) => (
            <div key={req.id} style={cardStyle}>
              
              {/* 右上角熱度與狀態 */}
              <div style={{ position: "absolute", top: "24px", right: "24px", textAlign: "right" }}>
                <div style={urgencyTagStyle(req.urgency)}>{req.urgency}</div>
                <div style={{ fontSize: "11px", color: "#f59e0b", fontWeight: 700, marginTop: "8px" }}>🔥 {req.applicantCount} 人應徵中</div>
              </div>
              
              {/* 人物頭部 */}
              <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "20px" }}>
                <div style={avatarWrapper}><img src={req.avatar} alt="avatar" style={{width:'100%'}}/></div>
                <div style={{ textAlign: "left" }}>
                  <h3 style={{ fontSize: "19px", fontWeight: 800, margin: 0 }}>{req.name}</h3>
                  <div style={identityBadgeStyle(req.identityType)}>
                    {req.identityType} · {req.relationText}
                  </div>
                </div>
              </div>

              {/* 環境快速指標 */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                <span style={envTagStyle}>{req.hasElevator ? "🛗 有電梯" : "🪜 無電梯"}</span>
                <span style={envTagStyle}>{req.hasPet ? "🐕 有寵物" : "🚫 無寵物"}</span>
                <span style={envTagStyle}>{req.hasCCTV ? "📹 設監控" : "🔓 無監控"}</span>
              </div>

              <div style={divider} />

              {/* 地點與預算 */}
              <div style={infoGrid}>
                <div>
                  <span style={labelStyle}>服務地點</span>
                  <span style={valStyle}>{req.location}</span>
                </div>
                <div>
                  <span style={labelStyle}>薪資預算</span>
                  <span style={{ ...valStyle, color: "#059669" }}>{req.budget}</span>
                </div>
              </div>

              {/* 時段區 */}
              <div style={{ textAlign: "left", marginTop: "16px" }}>
                <span style={labelStyle}>需求時段</span>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#1e40af", margin: "4px 0" }}>{req.timeSlot}</p>
              </div>

              {/* 標籤區 */}
              <div style={tagContainer}>
                {req.tags.map(tag => <span key={tag} style={miniTagStyle}>#{tag}</span>)}
              </div>

              {/* 底部按鈕與時間 */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "10px" }}>
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>更新於 {req.updateTime}</span>
                
                {/* 核心連結：跳轉至單一詳情頁 */}
                <Link href={`/requester-profile/${req.id}`}>
                  <button style={detailBtnStyle}>查看詳情</button>
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// --- 內部組件 ---
function FilterSelect({ label, options, value, onChange }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: "150px" }}>
      <label style={{ fontSize: "12px", fontWeight: 700, color: "#9ca3af" }}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={selectStyle}>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

// --- 樣式系統 ---
const filterContainerStyle: React.CSSProperties = { display: "flex", gap: "16px", background: "#fff", padding: "24px", borderRadius: "20px", border: "1px solid #e5e7eb", marginTop: "-30px", marginBottom: "40px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", flexWrap: "wrap", alignItems: "flex-end" };
const selectStyle: React.CSSProperties = { padding: "10px", borderRadius: "10px", border: "1px solid #e5e7eb", background: "#f9fafb", fontSize: "14px", fontWeight: 600, outline: "none" };
const resetBtnStyle = { padding: "10px 20px", borderRadius: "10px", border: "none", background: "#f3f4f6", color: "#6b7280", fontWeight: 700, cursor: "pointer", height: "41px" };

const gridStyle: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" };
const cardStyle: React.CSSProperties = { background: "#fff", borderRadius: "32px", padding: "32px", border: "1px solid #e5e7eb", position: "relative", display: "flex", flexDirection: "column", transition: "all 0.2s" };
const avatarWrapper = { width: "56px", height: "56px", borderRadius: "50%", background: "#f3f4f6", overflow: "hidden" };
const divider = { height: "1px", background: "#f1f5f9", margin: "20px 0" };
const labelStyle = { display: "block", fontSize: "11px", color: "#9ca3af", fontWeight: 700, marginBottom: "2px" };
const valStyle = { fontSize: "15px", fontWeight: 700, color: "#1e293b" };
const infoGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" };
const tagContainer = { display: "flex", gap: "6px", flexWrap: "wrap" as const, margin: "16px 0 20px" };
const miniTagStyle = { fontSize: "12px", color: "#64748b", background: "#f8fafc", padding: "2px 8px", borderRadius: "6px" };

const envTagStyle: React.CSSProperties = { background: "#f1f5f9", padding: "4px 8px", borderRadius: "8px", fontSize: "11px", fontWeight: 700, color: "#475569" };

const detailBtnStyle: React.CSSProperties = { 
  padding: "12px 24px", 
  background: "#111827", 
  color: "#fff", 
  border: "none", 
  borderRadius: "14px", 
  fontWeight: 700, 
  fontSize: "14px",
  cursor: "pointer" 
};

const urgencyTagStyle = (urg: string): React.CSSProperties => ({
  fontSize: "11px", fontWeight: 800, padding: "2px 10px", borderRadius: "999px",
  background: urg === "急尋" ? "#fef2f2" : "#f1f5f9", color: urg === "急尋" ? "#ef4444" : "#64748b", display: "inline-block"
});

const identityBadgeStyle = (type: string): React.CSSProperties => {
  const colors: any = {
    "本人": { bg: "#eff6ff", text: "#3b82f6" },
    "親屬": { bg: "#f0fdfa", text: "#0d9488" },
    "社工/醫護": { bg: "#f5f3ff", text: "#7c3aed" },
    "法律代理人": { bg: "#fff7ed", text: "#ea580c" },
    "鄰居/友人": { bg: "#fdf2f8", text: "#db2777" },
  };
  const color = colors[type] || { bg: "#f1f5f9", text: "#475569" };
  return { display: "inline-block", padding: "2px 8px", borderRadius: "6px", background: color.bg, color: color.text, fontSize: "11px", fontWeight: 700, marginTop: "4px" };
};