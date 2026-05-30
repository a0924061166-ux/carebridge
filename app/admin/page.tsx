<button onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: 'register' }))}>
  開始使用
</button>
export default function AdminHomePage() {
 return (
   <div>
     <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>
       管理者首頁
     </h1>
     <p style={{ fontSize: 16, color: "#4b5563", marginBottom: 24 }}>
       請從左側選單選擇要管理的內容。
     </p>


     <div
       style={{
         display: "grid",
         gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
         gap: 20,
       }}
     >
       <div style={cardStyle}>
         <h2 style={cardTitleStyle}>審核</h2>
         <p style={cardTextStyle}>管理 provider 審核狀態。</p>
       </div>


       <div style={cardStyle}>
         <h2 style={cardTitleStyle}>案件管理</h2>
         <p style={cardTextStyle}>管理需求單狀態與指派 provider。</p>
       </div>


       <div style={cardStyle}>
         <h2 style={cardTitleStyle}>諮詢表單管理</h2>
         <p style={cardTextStyle}>查看表單諮詢資料與回覆狀態。</p>
       </div>
     </div>
   </div>
 );
}


const cardStyle: React.CSSProperties = {
 background: "#fff",
 border: "1px solid #e5e7eb",
 borderRadius: 16,
 padding: 20,
};


const cardTitleStyle: React.CSSProperties = {
 fontSize: 20,
 fontWeight: 700,
 marginBottom: 10,
};


const cardTextStyle: React.CSSProperties = {
 color: "#6b7280",
 lineHeight: 1.6,
};

