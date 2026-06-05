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
      text: "備餐、餵食協助與營養照顧，幫助家人穩定攝取所需營養。",
      img: "https://plus.unsplash.com/premium_photo-1681995460558-738a8856313c?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "mobility",
      title: "行動與活動協助",
      text: "提供移位、散步陪同、關節活動與日常活動協助。",
      img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "outdoor",
      title: "生活支援與外出陪伴",
      text: "陪同就醫、購物、外出辦事與日常生活支援。",
      img: "https://images.unsplash.com/photo-1532461844054-cee312ab1ce2?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "medical",
      title: "醫療專業護理",
      text: "管路照護、血糖量測、用藥整理與專業護理協助。",
      img: "https://images.unsplash.com/photo-1725870953863-4ad4db0acfc2?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "companionship",
      title: "陪伴與安全照護",
      text: "陪伴、看視、巡視與安全支持，減輕家庭照護壓力。",
      img: "https://plus.unsplash.com/premium_photo-1682089056529-c61c1d776e20?auto=format&fit=crop&q=80&w=800",
    },
  ];

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
      alert("提交失敗：" + error.message);
      return;
    }

    alert(`感謝 ${formData.name}！我們已收到您的諮詢，將聯繫您的電話：${formData.phone}`);

    setFormData({
      name: "",
      phone: "",
      email: "",
      service_type: "長者護理 (沐浴/進食)",
      note: "",
    });
  };

  const openLoginModal = () => {
    window.dispatchEvent(new CustomEvent("open-auth-modal", { detail: "login" }));
  };

  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-bg">
          <img src="/hero-carebridge-family3.jpg" alt="CareBridge" />
          <div className="hero-overlay" />
        </div>

        <div className="hero-inner">
          <div className="hero-badge">專業媒合・照護支持・透明管理</div>

          <h1>
            讓家庭照護更安心
            <br />
            讓專業服務更靠近
          </h1>

          <p>
            CareBridge 協助家庭快速找到合適的照護服務，從需求諮詢、專業媒合到後續支持，
            讓每一次照護安排都更安心、更透明。
          </p>

          <div className="hero-actions">
            <button type="button" onClick={openLoginModal}>
              開始使用
            </button>
            <a href="#consult">免費諮詢</a>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="section-head">
          <span>SERVICES</span>
          <h2>依需求找到合適的照護服務</h2>
          <p>
            從日常照顧到專業護理，CareBridge 提供更清楚、更安心的服務分類與媒合流程。
          </p>
        </div>

        <div className="service-grid">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <a
                key={service.id}
                href={`/services#${service.id}`}
                className={isHovered ? "service-card active" : "service-card"}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="service-text">
                  <div className="service-title-row">
                    <h3>{service.title}</h3>
                    <span>
                      <ChevronRight size={16} />
                    </span>
                  </div>
                  <p>{service.text}</p>
                </div>

                <div className="service-image">
                  <img src={service.img} alt={service.title} />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section id="consult" className="consult-section">
        <div className="consult-inner">
          <div className="consult-info">
            <span>FREE CONSULTATION</span>
            <h2>免費諮詢</h2>
            <p>
              不確定家人需要哪一類照護？填寫表單後，顧問將在 24 小時內聯絡您，
              協助釐清需求並提供更合適的安排建議。
            </p>

            <div className="check-list">
              <div>
                <CheckCircle2 size={18} />
                專業照護評估
              </div>
              <div>
                <CheckCircle2 size={18} />
                客製化方案規劃
              </div>
              <div>
                <CheckCircle2 size={18} />
                媒合流程說明
              </div>
            </div>

            <div className="steps">
              <div className="step">
                <b>1</b>
                <div>
                  <strong>提交表單</strong>
                  <p>留下您的聯絡方式與初步需求</p>
                </div>
              </div>

              <div className="step">
                <b>2</b>
                <div>
                  <strong>顧問聯繫</strong>
                  <p>專業人員將致電進行深度評估</p>
                </div>
              </div>

              <div className="step">
                <b>3</b>
                <div>
                  <strong>方案建議</strong>
                  <p>獲得客製化照護計畫與媒合人選</p>
                </div>
              </div>
            </div>
          </div>

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="two-col">
                <div>
                  <label>姓名</label>
                  <input
                    type="text"
                    placeholder="稱呼"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label>聯絡電話</label>
                  <input
                    type="tel"
                    placeholder="手機"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label>電子郵件</label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label>預約項目</label>
                <select
                  value={formData.service_type}
                  onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                >
                  <option>長者護理 (沐浴/進食)</option>
                  <option>傷口護理</option>
                  <option>陪診服務</option>
                  <option>身心靈支持</option>
                  <option>其他</option>
                </select>
              </div>

              <div>
                <label>備註說明</label>
                <textarea
                  placeholder="請簡述您的需求..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "提交中..." : "立即提交諮詢"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section recruit-section">
        <div className="recruit-card">
          <div>
            <span>RECRUITMENT</span>
            <h2>成為 CareBridge 居家照護夥伴</h2>
            <p>
              加入 CareBridge，成為值得信任的居家照護服務提供者。我們透過更透明的平台機制，
              協助您建立專業價值，讓更多真正有需求的家庭看見您。
            </p>

            <Link href="/recruit-detail">成為照護夥伴</Link>
          </div>

          <div className="recruit-image">
            <img
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800"
              alt="Recruit"
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        .home-page {
          background: #ffffff;
          color: #111827;
          font-family: "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
        }

        .hero {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 120px 20px 80px;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: right center;
          transform: scaleX(-1);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.78) 35%,
            rgba(255, 255, 255, 0.42) 65%,
            rgba(255, 255, 255, 0.18) 100%
          );
          backdrop-filter: blur(2px);
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-flex;
          padding: 9px 18px;
          border-radius: 999px;
          background: rgba(240, 253, 244, 0.92);
          color: #166534;
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 22px;
        }

        .hero h1 {
          max-width: 760px;
          font-size: 76px;
          line-height: 1.06;
          font-weight: 900;
          letter-spacing: -0.03em;
          margin: 0 0 24px;
          color: #0f172a;
        }

        .hero p {
          max-width: 640px;
          font-size: 20px;
          line-height: 1.9;
          color: #475569;
          margin: 0 0 34px;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .hero-actions button,
        .hero-actions a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 150px;
          padding: 16px 30px;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 900;
          text-decoration: none;
          cursor: pointer;
        }

        .hero-actions button {
          border: none;
          background: #10b981;
          color: #ffffff;
        }

        .hero-actions a {
          border: 1px solid rgba(16, 185, 129, 0.28);
          background: rgba(255, 255, 255, 0.9);
          color: #059669;
        }

        .section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 90px 20px;
        }

        .section-head {
          margin-bottom: 34px;
        }

        .section-head span,
        .consult-info span,
        .recruit-card span {
          display: block;
          color: #10b981;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.12em;
          margin-bottom: 10px;
        }

        .section-head h2,
        .consult-info h2,
        .recruit-card h2 {
          font-size: 42px;
          line-height: 1.2;
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 16px;
        }

        .section-head p,
        .consult-info > p,
        .recruit-card p {
          max-width: 760px;
          font-size: 17px;
          line-height: 1.85;
          color: #64748b;
          margin: 0;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .service-card {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          height: 176px;
          overflow: hidden;
          border-radius: 24px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          color: inherit;
          text-decoration: none;
          box-shadow: 0 8px 25px rgba(15, 23, 42, 0.04);
          transition: all 0.25s ease;
        }

        .service-card.active {
          background: #0f172a;
          transform: translateY(-4px);
        }

        .service-text {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .service-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .service-title-row h3 {
          font-size: 20px;
          font-weight: 900;
          color: #0f172a;
          margin: 0;
        }

        .service-card.active h3 {
          color: #ffffff;
        }

        .service-title-row span {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          background: #10b981;
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .service-text p {
          font-size: 14px;
          line-height: 1.7;
          color: #64748b;
          margin: 12px 0 0;
        }

        .service-card.active p {
          color: #cbd5e1;
        }

        .service-image {
          overflow: hidden;
          min-height: 100%;
        }

        .service-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .consult-section {
          background: #f8fafc;
          padding: 100px 20px;
        }

        .consult-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: start;
        }

        .check-list {
          display: flex;
          flex-wrap: wrap;
          gap: 14px 22px;
          margin: 26px 0 34px;
        }

        .check-list div {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #334155;
          font-weight: 800;
        }

        .check-list svg {
          color: #10b981;
        }

        .steps {
          display: grid;
          gap: 20px;
        }

        .step {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .step b {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          background: #10b981;
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .step strong {
          display: block;
          font-size: 17px;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .step p {
          margin: 0;
          color: #64748b;
          line-height: 1.7;
        }

        .form-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 28px;
          padding: 32px;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
        }

        form {
          display: grid;
          gap: 16px;
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        label {
          display: block;
          font-size: 14px;
          font-weight: 800;
          color: #475569;
          margin-bottom: 6px;
        }

        input,
        select,
        textarea {
          width: 100%;
          padding: 13px 14px;
          border-radius: 13px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          font-size: 15px;
          box-sizing: border-box;
          outline: none;
        }

        textarea {
          min-height: 110px;
          resize: vertical;
        }

        form button {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 14px;
          background: #10b981;
          color: #ffffff;
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
        }

        .recruit-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 32px;
          padding: 50px;
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.04);
        }

        .recruit-card a {
          display: inline-flex;
          margin-top: 24px;
          padding: 14px 24px;
          border-radius: 14px;
          border: 1px solid #10b981;
          color: #059669;
          font-weight: 900;
          text-decoration: none;
        }

        .recruit-image {
          height: 390px;
          border-radius: 24px;
          overflow: hidden;
        }

        .recruit-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 768px) {
          .hero {
            min-height: auto;
            padding: 42px 20px 56px;
            align-items: flex-start;
          }

          .hero-overlay {
            background: linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.62),
              rgba(255, 255, 255, 0.28)
            );
            backdrop-filter: blur(1px);
          }

          .hero-bg img {
            object-position: center center;
          }

          .hero-badge {
            font-size: 13px;
            padding: 8px 16px;
            margin-bottom: 20px;
          }

          .hero h1 {
            font-size: 42px;
            line-height: 1.14;
            margin-bottom: 20px;
          }

          .hero p {
            font-size: 16px;
            line-height: 1.85;
            margin-bottom: 26px;
          }

          .hero-actions {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .hero-actions button,
          .hero-actions a {
            min-width: 0;
            width: 100%;
            padding: 14px 12px;
          }

          .section {
            padding: 58px 20px;
          }

          .section-head h2,
          .consult-info h2,
          .recruit-card h2 {
            font-size: 32px;
          }

          .section-head p,
          .consult-info > p,
          .recruit-card p {
            font-size: 16px;
          }

          .service-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .service-card {
            grid-template-columns: 1fr;
            height: auto;
          }

          .service-text {
            padding: 22px;
          }

          .service-title-row h3 {
            font-size: 22px;
            writing-mode: horizontal-tb;
          }

          .service-text p {
            display: block;
            font-size: 15px;
          }

          .service-image {
            height: 190px;
          }

          .consult-section {
            padding: 64px 20px;
          }

          .consult-inner {
            grid-template-columns: 1fr;
            gap: 34px;
          }

          .check-list {
            display: grid;
            gap: 14px;
          }

          .form-card {
            padding: 22px;
          }

          .two-col {
            grid-template-columns: 1fr;
          }

          .recruit-card {
            grid-template-columns: 1fr;
            padding: 26px;
            border-radius: 26px;
            gap: 24px;
          }

          .recruit-image {
            height: 230px;
          }
        }

        @media (max-width: 430px) {
          .hero h1 {
            font-size: 38px;
          }

          .section-head h2,
          .consult-info h2,
          .recruit-card h2 {
            font-size: 30px;
          }
        }
      `}</style>
    </main>
  );
}