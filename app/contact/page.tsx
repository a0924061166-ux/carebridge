"use client";

import React, { useState } from "react";

export default function TestFormPage() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "#f8fafc", // 淺灰色背景，方便看清楚表單陰影
      padding: "20px" 
    }}>
      
      {/* --- 這就是你要測試的表單區塊 --- */}
      <div style={formContainerStyle}>
        <h3 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "20px", color: "#1e293b", textAlign: "center" }}>
          預約免費諮詢
        </h3>
        
        <form style={{ display: "flex", flexDirection: "column", gap: "16px" }} onSubmit={(e) => e.preventDefault()}>
          {/* 姓名 */}
          <div>
            <label style={labelStyle}>姓名</label>
            <input type="text" placeholder="如何稱呼您？" style={inputStyle} required />
          </div>

          {/* 電話 */}
          <div>
            <label style={labelStyle}>聯絡電話</label>
            <input type="tel" placeholder="請輸入手機或市話" style={inputStyle} required />
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>電子郵件</label>
            <input type="email" placeholder="example@mail.com" style={inputStyle} required />
          </div>

          {/* 服務需求下拉選單 - 根據你的筆記清單 */}
          <div>
            <label style={labelStyle}>服務需求</label>
            <select style={inputStyle} defaultValue="">
              <option value="" disabled>請選擇照護項目</option>
              <option value="elderly">長者護理（沐浴、洗頭、進食）</option>
              <option value="wound">傷口護理</option>
              <option value="clinic">陪診服務</option>
              <option value="mental">身心靈支持</option>
              <option value="tube">鼻胃管餵食與護理</option>
              <option value="other">其他</option>
            </select>
          </div>

          {/* 其他需求與提問 */}
          <div>
            <label style={labelStyle}>其他需求與提問</label>
            <textarea 
              placeholder="請簡述您的情況或想了解的問題..." 
              style={{ ...inputStyle, minHeight: "120px", resize: "none" }}
            ></textarea>
          </div>

          {/* 送出按鈕 */}
          <button 
            type="submit" 
            style={submitButtonStyle}
          >
            立即送出諮詢
          </button>
        </form>
      </div>
      {/* ------------------------------- */}

    </div>
  );
}

// --- 樣式設定物件 ---

const formContainerStyle: React.CSSProperties = {
  background: "#ffffff",
  padding: "32px",
  borderRadius: "24px",
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  border: "1px solid #e2e8f0",
  width: "100%",
  maxWidth: "420px"
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "14px",
  fontWeight: 600,
  color: "#475569",
  marginBottom: "6px"
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "16px",
  outline: "none",
  color: "#1e293b",
  boxSizing: "border-box" // 確保 padding 不會撐破寬度
};

const submitButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  background: "#3730a3", 
  color: "#ffffff",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: 700,
  cursor: "pointer",
  marginTop: "10px"
};