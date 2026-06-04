"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

type Profile = {
  id?: string;
  full_name: string | null;
  phone: string | null;
  account_type: string | null;
  provider_status: string | null;
  bio: string | null;
  specialties: string | null;
};

export default function ProviderMyProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const [bioInput, setBioInput] = useState("");
  const [specialtiesInput, setSpecialtiesInput] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabaseBrowser.auth.getUser();

      if (!user) {
        alert("請先登入");
        window.location.href = "/";
        return;
      }

      const { data, error } = await supabaseBrowser
        .from("profiles")
        .select("id, full_name, phone, account_type, provider_status, bio, specialties")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("profiles query error =", error);
        alert("讀取個人資料失敗");
        return;
      }

      if (!data) {
        alert("找不到這個 provider 的個人資料");
        return;
      }

      if (data.account_type !== "provider") {
        alert("你不是照護者帳號");
        return;
      }

      setProfile(data);
      setEmail(user.email ?? null);
      setBioInput(data.bio || "");
      setSpecialtiesInput(data.specialties || "");
      setLoading(false);
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    if (!profile?.id) return;

    setSaving(true);

    const { data, error } = await supabaseBrowser
      .from("profiles")
      .update({
        bio: bioInput.trim(),
        specialties: specialtiesInput.trim(),
      })
      .eq("id", profile.id)
      .select("id, full_name, phone, account_type, provider_status, bio, specialties")
      .single();

    setSaving(false);

    if (error) {
      console.error("update profile error =", error);
      alert("儲存失敗");
      return;
    }

    setProfile(data);
    setEditing(false);
    alert("已儲存");
  };

  if (loading) {
    return <div style={{ padding: "40px" }}>載入中...</div>;
  }

  const specialtyList = (profile?.specialties || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="provider-me-wrap" style={pageWrapStyle}>
      <div className="provider-me-header" style={headerRowStyle}>
        <h1 className="provider-me-title" style={pageTitleStyle}>
          我的個人檔案
        </h1>

        {!editing ? (
          <button style={editBtnStyle} onClick={() => setEditing(true)}>
            編輯資料
          </button>
        ) : (
          <div className="provider-me-action-row" style={editActionRowStyle}>
            <button
              style={cancelBtnStyle}
              onClick={() => {
                setEditing(false);
                setBioInput(profile?.bio || "");
                setSpecialtiesInput(profile?.specialties || "");
              }}
            >
              取消
            </button>

            <button style={saveBtnStyle} onClick={handleSave} disabled={saving}>
              {saving ? "儲存中..." : "儲存"}
            </button>
          </div>
        )}
      </div>

      <div className="provider-me-card" style={cardStyle}>
        <div style={itemStyle}>
          <div style={labelItemStyle}>姓名</div>
          <div style={valueStyle}>{profile?.full_name || "未填寫"}</div>
        </div>

        <div style={itemStyle}>
          <div style={labelItemStyle}>Email</div>
          <div style={valueStyle}>{email || "未填寫"}</div>
        </div>

        <div style={itemStyle}>
          <div style={labelItemStyle}>電話</div>
          <div style={valueStyle}>{profile?.phone || "未填寫"}</div>
        </div>

        <div style={itemStyle}>
          <div style={labelItemStyle}>身份</div>
          <div style={valueStyle}>照護者</div>
        </div>

        <div style={itemStyle}>
          <div style={labelItemStyle}>審核狀態</div>
          <div style={valueStyle}>{profile?.provider_status || "未審核"}</div>
        </div>

        <div style={itemStyle}>
          <div style={labelItemStyle}>個人簡介</div>

          {!editing ? (
            <div style={bioTextStyle}>
              {profile?.bio?.trim() ? profile.bio : "尚未填寫個人簡介"}
            </div>
          ) : (
            <textarea
              value={bioInput}
              onChange={(e) => setBioInput(e.target.value)}
              placeholder="請輸入你的個人簡介"
              style={textareaStyle}
              rows={5}
            />
          )}
        </div>

        <div style={{ ...itemStyle, borderBottom: "none", paddingBottom: 0 }}>
          <div style={labelItemStyle}>專業特長</div>

          {!editing ? (
            specialtyList.length > 0 ? (
              <div style={tagsWrapStyle}>
                {specialtyList.map((tag) => (
                  <span key={tag} style={tagStyle}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <div style={bioTextStyle}>尚未填寫專業特長</div>
            )
          ) : (
            <>
              <input
                value={specialtiesInput}
                onChange={(e) => setSpecialtiesInput(e.target.value)}
                placeholder="例如：傷口護理,失智照護,基本按摩"
                style={inputStyle}
              />
              <div style={hintStyle}>請用逗號分隔，例如：傷口護理,失智照護,基本按摩</div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .provider-me-wrap {
            padding: 32px 16px !important;
          }

          .provider-me-header {
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .provider-me-title {
            font-size: 28px !important;
          }

          .provider-me-header button {
            width: 100% !important;
          }

          .provider-me-action-row {
            width: 100% !important;
            flex-direction: column !important;
          }

          .provider-me-card {
            padding: 18px !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </div>
  );
}

const pageWrapStyle: React.CSSProperties = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "40px 20px",
};

const headerRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  marginBottom: "24px",
};

const editActionRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "10px",
};

const pageTitleStyle: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: 800,
  color: "#111827",
  margin: 0,
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "20px",
  padding: "24px",
  display: "grid",
  gap: "16px",
};

const itemStyle: React.CSSProperties = {
  borderBottom: "1px solid #f1f5f9",
  paddingBottom: "12px",
};

const labelItemStyle: React.CSSProperties = {
  color: "#6b7280",
  marginBottom: "6px",
  fontSize: "14px",
};

const valueStyle: React.CSSProperties = {
  fontWeight: 700,
  color: "#111827",
  overflowWrap: "anywhere",
};

const bioTextStyle: React.CSSProperties = {
  color: "#111827",
  lineHeight: 1.8,
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  minHeight: "120px",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  boxSizing: "border-box",
  fontSize: "14px",
  lineHeight: 1.6,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  boxSizing: "border-box",
  fontSize: "14px",
};

const hintStyle: React.CSSProperties = {
  marginTop: "8px",
  fontSize: "12px",
  color: "#64748b",
};

const tagsWrapStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "6px",
};

const tagStyle: React.CSSProperties = {
  padding: "8px 14px",
  background: "#f1f5f9",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: 600,
  color: "#475569",
};

const editBtnStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};

const saveBtnStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "12px",
  border: "none",
  background: "#111827",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};

const cancelBtnStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};