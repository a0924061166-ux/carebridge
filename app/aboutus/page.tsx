"use client";

import Link from "next/link";
import React from "react";
import {
  Heart,
  UserCheck,
  Users,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function AboutUsPage() {
  const coreValues = [
    ["安全優先", "嚴格把關服務者資格與合作流程，讓家庭在選擇照護時更安心。"],
    ["一致標準", "建立清楚的服務原則與 SOP，降低照護安排中的不確定性。"],
    ["尊嚴溝通", "重視受照護者、家屬與照護者三方感受，讓合作建立在尊重上。"],
    ["資訊透明", "服務內容、合作方式與流程說明更清楚，減少資訊不對稱。"],
    ["持續改善", "透過回饋與實務經驗持續優化平台機制與服務品質。"],
  ];

  const issues = [
    "高齡人口快速增加，照護需求持續上升。",
    "許多家庭不清楚從哪裡開始找資源，也不確定如何判斷服務是否合適。",
    "城鄉與地區之間存在服務取得差異，真正需要時不一定能快速找到支持。",
    "照護人力不足與高流動率，讓穩定合作變得更困難。",
    "出院後、術後、陪診等臨時需求，常落在制度與市場之間的空白地帶。",
  ];

  const responses = [
    ["讓資訊更容易理解", "把複雜的照護資訊整理成家庭可以快速理解的內容，減少自行摸索的壓力。"],
    ["讓媒合更透明", "透過更清楚的服務資料、流程說明與合作機制，建立更高的信任基礎。"],
    ["讓支持更貼近生活", "不只回應長期照護，也關注陪診、術後照顧、短期協助與生活支持。"],
  ];

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="/patty-brito-Y-3Dt0us7e0-unsplash.jpg" alt="CareBridge about" />
          <div />
        </div>

        <div className="about-hero-inner">
          <span>ABOUT CAREBRIDGE</span>
          <h1>
            讓照護回到
            <br />
            <b>信任、尊嚴與陪伴</b>
          </h1>
          <p>
            CareBridge 致力於打造一個更透明、更溫暖的居家照護媒合平台。
            我們相信，照護不只是安排一項服務，而是在家庭最需要支持的時候，
            提供一個更安心、更清楚、也更值得信任的選擇。
          </p>

          <div className="hero-pills">
            <em>透明媒合</em>
            <em>專業支持</em>
            <em>家庭導向</em>
            <em>溫暖陪伴</em>
          </div>
        </div>
      </section>

      <section className="about-section center">
        <span>OUR PURPOSE</span>
        <h2>我們為什麼存在</h2>
        <p>
          當台灣正式邁入超高齡社會，越來越多家庭正面臨照護安排的現實壓力。
          真正困難的地方，往往是知道照護的重要性，但當需求發生時，
          不知道該找誰、不確定怎麼判斷、不清楚哪一種支持才真正適合當下的家人。
        </p>
        <p>
          CareBridge 想做的，是成為這段過程中的橋樑。連結家庭、受照護者與專業照護者，
          讓照護不再只是資訊混亂中的臨時決定，而是一個可以被理解、被信任、被好好安排的過程。
        </p>
      </section>

      <section className="about-section">
        <div className="section-head">
          <span>WHAT WE SEE</span>
          <h2>我們看見的照護現況</h2>
          <p>
            問題早已不只是「有沒有服務」，而是「找不找得到、用不用得起、接不接得上、信不信得過」。
          </p>
        </div>

        <div className="issue-box">
          <div className="issue-title">
            照護需求正在增加，
            <br />
            但家庭仍常被困在
            <b>資訊斷裂與選擇焦慮</b>之中。
          </div>

          <div className="issue-list">
            {issues.map((item) => (
              <div key={item}>
                <CheckCircle2 size={18} />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="section-head">
          <span>OUR RESPONSE</span>
          <h2>CareBridge 如何回應這些問題</h2>
        </div>

        <div className="three-grid">
          {responses.map(([title, text]) => (
            <div className="info-card" key={title}>
              <i>
                <Sparkles size={20} />
              </i>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="section-head">
          <span>QUALITY COMMITMENT</span>
          <h2>我們的五大服務承諾</h2>
          <p>真正值得信任的平台，不只要有溫度，也要有原則。</p>
        </div>

        <div className="values-box">
          {coreValues.map(([title, text]) => (
            <div className="value-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="section-head">
          <span>WHO WE SERVE</span>
          <h2>我們對每一方的承諾</h2>
        </div>

        <div className="promise-grid">
          <div className="promise-card blue">
            <UserCheck size={28} />
            <h3>對於照護人員</h3>
            <h4>賦能專業，成就尊嚴</h4>
            <p>建立更公平、透明且有秩序的合作環境，讓專業被看見、勞動價值被尊重。</p>
            <Link href="/recruit-detail">了解加入方式 <ChevronRight size={16} /></Link>
          </div>

          <div className="promise-card green">
            <Heart size={28} />
            <h3>對於受照護者</h3>
            <h4>溫暖守護，自在安老</h4>
            <p>讓受照護者在熟悉的生活環境中，獲得兼具專業與同理心的支持。</p>
            <Link href="/services">了解服務內容 <ChevronRight size={16} /></Link>
          </div>

          <div className="promise-card orange">
            <Users size={28} />
            <h3>對於家屬</h3>
            <h4>分擔重擔，提供喘息</h4>
            <p>用更清楚的資訊與流程，幫助家庭減少摸索與壓力。</p>
            <Link href="/#consult">聯繫專業顧問 <ChevronRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="statement">
          <ShieldCheck size={28} />
          <h2>
            我們想成為的，不只是媒合平台，
            <br />
            而是家庭在照護決策中可以安心依靠的橋樑。
          </h2>
          <p>當家庭面對最需要支持的時刻，不必再花最多力氣去找答案。</p>
        </div>
      </section>

      <section className="about-section">
        <div className="cta">
          <div>
            <span>START WITH CAREBRIDGE</span>
            <h2>讓我們一起把照護這件事，做得更安心</h2>
            <p>無論你是正在尋找照護支持的家庭，或希望加入平台的專業照護夥伴。</p>
          </div>

          <div className="cta-actions">
  <Link
    href="/#consult"
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "14px 24px",
      borderRadius: "999px",
      background: "#10b981",
      color: "#ffffff",
      fontWeight: 900,
      textDecoration: "none",
      minWidth: "150px",
    }}
  >
    免費諮詢
  </Link>

  <Link
    href="/recruit-detail"
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "14px 24px",
      borderRadius: "999px",
      background: "#ffffff",
      color: "#0f172a",
      fontWeight: 900,
      textDecoration: "none",
      minWidth: "150px",
    }}
  >
    加入照護夥伴
  </Link>
</div>
        </div>
      </section>

      <style jsx>{`
        .about-page {
          background: #ffffff;
          color: #0f172a;
          font-family: "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
        }

        .about-hero {
          position: relative;
          min-height: 88vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 120px 20px 80px;
        }

        .about-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .about-hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: right center;
          filter: blur(3px);
          transform: scale(1.04);
        }

        .about-hero-bg div {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.96) 0%,
            rgba(255, 255, 255, 0.86) 42%,
            rgba(255, 255, 255, 0.38) 100%
          );
        }

        .about-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }

        span {
          display: block;
          color: #059669;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.14em;
          margin-bottom: 12px;
        }

        .about-hero h1 {
          font-size: 64px;
          line-height: 1.08;
          font-weight: 900;
          letter-spacing: -0.04em;
          margin: 0 0 24px;
        }

        .about-hero h1 b {
          color: #059669;
        }

        .about-hero p {
          max-width: 660px;
          font-size: 18px;
          line-height: 1.95;
          color: #475569;
          margin: 0 0 26px;
        }

        .hero-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .hero-pills em {
          font-style: normal;
          padding: 9px 14px;
          border-radius: 999px;
          background: #ffffff;
          border: 1px solid #dcfce7;
          color: #166534;
          font-weight: 800;
          font-size: 14px;
        }

        .about-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 88px 20px 0;
        }

        .center {
          text-align: center;
          max-width: 940px;
        }

        .about-section h2,
        .section-head h2 {
          font-size: 42px;
          line-height: 1.2;
          font-weight: 900;
          letter-spacing: -0.03em;
          margin: 0 0 16px;
        }

        .about-section p {
          font-size: 17px;
          line-height: 1.9;
          color: #64748b;
          margin: 0;
        }

        .center p {
          font-size: 18px;
          color: #475569;
          margin-bottom: 16px;
        }

        .section-head {
          max-width: 760px;
          margin: 0 auto 34px;
          text-align: center;
        }

        .issue-box {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 24px;
        }

        .issue-title {
          border-radius: 30px;
          padding: 34px;
          background: linear-gradient(135deg, #f0fdf4, #ffffff);
          border: 1px solid #dcfce7;
          font-size: 32px;
          line-height: 1.35;
          font-weight: 900;
        }

        .issue-title b {
          color: #059669;
        }

        .issue-list {
          display: grid;
          gap: 14px;
          padding: 30px;
          border-radius: 30px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.04);
        }

        .issue-list div {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .issue-list svg,
        .info-card svg,
        .statement svg {
          color: #10b981;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .three-grid,
        .promise-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .info-card,
        .promise-card,
        .value-card {
          border: 1px solid #e5e7eb;
          border-radius: 28px;
          padding: 28px;
          background: #ffffff;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.04);
        }

        .info-card i {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: #f0fdf4;
          margin-bottom: 16px;
        }

        .info-card h3,
        .value-card h3,
        .promise-card h3 {
          font-size: 22px;
          font-weight: 900;
          margin: 0 0 10px;
        }

        .values-box {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          padding: 30px;
          border-radius: 34px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
        }

        .value-card {
          text-align: center;
          box-shadow: none;
        }

        .value-card p {
          font-size: 14px;
        }

        .promise-card svg {
          margin-bottom: 16px;
        }

        .promise-card h4 {
          font-size: 16px;
          font-weight: 900;
          margin: 0 0 14px;
        }

        .blue h4,
        .blue svg {
          color: #2563eb;
        }

        .green h4,
        .green svg {
          color: #10b981;
        }

        .orange h4,
        .orange svg {
          color: #f97316;
        }

        .promise-card a {
          margin-top: 22px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 999px;
          color: #ffffff;
          font-weight: 900;
          text-decoration: none;
        }

        .blue a {
          background: #2563eb;
        }

        .green a {
          background: #10b981;
        }

        .orange a {
          background: #f97316;
        }

        .statement {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          padding: 56px 34px;
          border-radius: 34px;
          background: linear-gradient(135deg, #f0fdf4, #ffffff);
          border: 1px solid #dcfce7;
        }

        .statement h2 {
          font-size: 34px;
          line-height: 1.35;
          margin: 18px 0;
        }

        .cta {
  background: #0f172a;
  color: #ffffff;
  border-radius: 34px;
  padding: 42px 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 36px;
  margin-bottom: 100px;
}

.cta > div:first-child {
  flex: 1;
  min-width: 0;
}

.cta-actions {
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  flex-shrink: 0;
  margin-left: 0;
}

        .cta h2 {
  color: #ffffff;
  margin-bottom: 12px;
  white-space: nowrap;
}

        .cta p {
          color: rgba(255, 255, 255, 0.78);
        }



        .cta-actions a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 900;
  white-space: nowrap;
  min-width: 150px;
}

.cta-primary-btn {
  background: #10b981;
  color: #ffffff !important;
}

.cta-secondary-btn {
  background: #ffffff;
  color: #0f172a !important;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

        @media (max-width: 768px) {
          .about-hero {
            min-height: auto;
            padding: 70px 22px 64px;
            align-items: flex-start;
          }

          .about-hero-bg img {
            object-position: center;
          }

          .about-hero-bg div {
            background: linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.9),
              rgba(255, 255, 255, 0.55)
            );
          }

          .about-hero h1 {
            font-size: 40px;
            line-height: 1.15;
          }

          .about-hero p,
          .center p,
          .about-section p {
            font-size: 16px;
            line-height: 1.85;
          }

          .about-section {
            padding: 64px 22px 0;
          }

          .about-section h2,
          .section-head h2 {
            font-size: 30px;
          }

          .issue-box,
          .three-grid,
          .promise-grid,
          .values-box {
            grid-template-columns: 1fr;
          }

          .issue-title {
            font-size: 26px;
            padding: 26px;
          }

          .issue-list,
          .info-card,
          .promise-card,
          .value-card {
            padding: 24px;
            border-radius: 24px;
          }

          .values-box {
            padding: 18px;
          }

          .value-card {
            text-align: left;
          }

          .promise-card a {
            width: 100%;
            justify-content: center;
          }

          .statement {
            padding: 34px 22px;
          }

          .statement h2 {
            font-size: 26px;
          }

          .cta {
            flex-direction: column;
            align-items: stretch;
            padding: 30px 24px;
            border-radius: 28px;
          }

          .cta-actions {
            display: grid;
            grid-template-columns: 1fr;
          }

          .cta-actions a {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}