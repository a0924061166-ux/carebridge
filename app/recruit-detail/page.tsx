"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

const serviceBaseRates: Record<string, number> = {
  居家陪伴照護: 300,
  長者日常照護: 350,
  陪診服務: 380,
  術後照護: 420,
  失能者照護: 450,
  夜間照護: 500,
};

const regionMultiplier: Record<string, number> = {
  台北市: 1.12,
  新北市: 1.06,
  桃園市: 1.0,
  台中市: 1.0,
  台南市: 0.95,
  高雄市: 0.98,
};

const experienceMultiplier: Record<string, number> = {
  新手: 0.95,
  "1-3 年": 1.0,
  "3-5 年": 1.08,
  "5 年以上": 1.15,
};

const acceptanceRateMap: Record<string, number> = {
  剛加入平台: 0.7,
  穩定接案: 0.85,
  高評價夥伴: 0.95,
};

export default function RecruitDetailPage() {
  const [serviceType, setServiceType] = useState("長者日常照護");
  const [region, setRegion] = useState("台北市");
  const [experience, setExperience] = useState("1-3 年");
  const [caseLevel, setCaseLevel] = useState("穩定接案");
  const [hoursPerWeek, setHoursPerWeek] = useState(40);

  const calculation = useMemo(() => {
    const weeksPerMonth = 4;
    const platformFeeRate = 12;

    const baseRate = serviceBaseRates[serviceType];
    const adjustedRate =
      baseRate *
      regionMultiplier[region] *
      experienceMultiplier[experience];

    const grossIncome =
      adjustedRate *
      hoursPerWeek *
      weeksPerMonth *
      acceptanceRateMap[caseLevel];

    const platformFee = grossIncome * (platformFeeRate / 100);
    const netIncome = grossIncome - platformFee;

    return {
      netIncome: Math.round(netIncome),
    };
  }, [serviceType, region, experience, caseLevel, hoursPerWeek]);

  return (
    <main className="recruit-page" style={pageStyle}>
      <section className="recruit-container" style={containerStyle}>
        

        <section className="recruit-hero" style={heroSectionStyle}>
          <div className="recruit-hero-text" style={heroTextWrapStyle}>
            <p style={heroEyebrowStyle}>為照護專業打造更彈性、更透明的工作方式</p>

            <h1 className="recruit-hero-title" style={heroTitleStyle}>
              用你的專業，
              <br />
              建立穩定收入
            </h1>

            <p className="recruit-hero-desc" style={heroDescStyle}>
              加入 CareBridge，成為值得信任的居家照護夥伴。
              你可以依照自己的專長、可服務時段與地區安排工作，
              透過平台接觸更多家庭需求，建立專業形象，也讓合作流程更清楚、收入更透明。
            </p>

            <div style={heroTagRowStyle}>
              <div style={heroTagStyle}>彈性排班</div>
              <div style={heroTagStyle}>透明收入</div>
              <div style={heroTagStyle}>專業媒合</div>
              <div style={heroTagStyle}>流程支援</div>
            </div>

            <div style={{ display: "grid", gap: 12, marginBottom: 30, maxWidth: 560 }}>
              <div style={pointStyle}>✓ 自由設定每週可服務時段與地區</div>
              <div style={pointStyle}>✓ 平台協助媒合需求、管理流程與建立專業形象</div>
              <div style={pointStyle}>✓ 適合想兼職、全職或逐步建立穩定案源的照護工作者</div>
            </div>

            <div className="recruit-button-row" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button type="button" style={heroPrimaryButton} onClick={openRegisterModal}>
                立即申請
              </button>
              <a href="#why-join" style={{ textDecoration: "none" }}>
                <button style={heroGhostButton}>了解合作方式</button>
              </a>
            </div>
          </div>

          <div className="calculator-wrap" style={heroCalculatorWrapStyle}>
            <div className="calculator-card" style={calculatorCardStyle}>
              <div style={smallCapsStyle}>收入試算</div>
              <h2 className="calculator-title" style={calculatorTitleStyle}>看看你每月大約能接多少</h2>

              <div style={{ display: "grid", gap: 12, marginBottom: 18 }}>
                <div>
                  <label style={labelStyle}>服務類型</label>
                  <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} style={fieldStyle}>
                    {Object.keys(serviceBaseRates).map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>服務地區</label>
                  <select value={region} onChange={(e) => setRegion(e.target.value)} style={fieldStyle}>
                    {Object.keys(regionMultiplier).map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>服務經驗</label>
                  <select value={experience} onChange={(e) => setExperience(e.target.value)} style={fieldStyle}>
                    {Object.keys(experienceMultiplier).map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>接案狀態</label>
                  <select value={caseLevel} onChange={(e) => setCaseLevel(e.target.value)} style={fieldStyle}>
                    {Object.keys(acceptanceRateMap).map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>每週可服務時數</label>
                  <select value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} style={fieldStyle}>
                    {[10, 20, 30, 40, 50, 60].map((hour) => (
                      <option key={hour} value={hour}>{hour} 小時 / 週</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={resultBoxStyle}>
                <div style={resultLabelStyle}>預估實拿收入</div>
                <div className="result-value" style={resultValueStyle}>
                  NT${calculation.netIncome.toLocaleString()}
                  <span style={resultUnitStyle}>/ 每月</span>
                </div>
                <p style={resultNoteStyle}>
                  依每月 4 週、平台服務費率 12% 估算。實際收入會依案件類型、可接時段、服務地區與合作穩定度有所不同。
                </p>
              </div>

              <button type="button" style={{ ...heroPrimaryButton, width: "100%", marginTop: 18 }} onClick={openRegisterModal}>
                立即申請
              </button>
            </div>
          </div>
        </section>

        <section id="why-join" className="recruit-section" style={sectionSpacingStyle}>
          <div style={sectionHeaderWrapStyle}>
            <div style={smallCapsStyle}>Why CareBridge</div>
            <h2 className="section-title" style={sectionHeadingStyle}>為什麼加入 CareBridge？</h2>
            <p style={sectionDescStyle}>我們希望讓照護工作者不只是接案，而是用更安心、更有秩序的方式建立長期合作與專業價值。</p>
          </div>

          <div className="four-grid" style={fourGridStyle}>
            {[
              ["⏰", "工作安排更彈性", "依照自己的可服務時段、地區與生活節奏安排接案，不必被固定班表綁住。"],
              ["💰", "收入更透明", "透過平台清楚了解服務類型、時數與收入估算，讓每次合作更容易評估。"],
              ["🫶", "建立專業信任", "透過完整個人檔案、服務資訊與合作紀錄，讓家庭更安心選擇適合的照護夥伴。"],
              ["🤝", "平台流程支援", "從媒合、溝通到合作安排都有清楚流程，降低你自己單打獨鬥的負擔。"],
            ].map(([icon, title, text]) => (
              <div key={title} style={featureCardStyle}>
                <div style={featureIconStyle}>{icon}</div>
                <h3 style={featureTitleStyle}>{title}</h3>
                <p style={featureTextStyle}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="recruit-section" style={sectionSpacingStyle}>
          <div className="split-section" style={splitSectionStyle}>
            <div>
              <div style={smallCapsStyle}>Requirements</div>
              <h2 className="section-title" style={leftHeadingStyle}>你需要具備</h2>
              <p style={leftDescStyle}>
                依不同服務內容，平台可設定不同資格門檻。若屬於較高專業度照護項目，
                建議要求更完整的證明文件與經驗資料，以提升平台信任度。
              </p>
            </div>

            <div style={requirementPanelStyle}>
              {[
                "年滿 18 歲，具合法工作資格",
                "可提供基本身份驗證資料",
                "具備照護、陪診或相關服務經驗更佳",
                "若為專業照護項目，可上傳證照或訓練證明",
                "能清楚設定可服務區域與時段",
                "願意依平台流程完成合作與溝通",
              ].map((item) => (
                <div key={item} style={requirementRowStyle}>
                  <span style={requirementTickStyle}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="recruit-section" style={sectionSpacingStyle}>
          <div style={sectionHeaderWrapStyle}>
            <div style={smallCapsStyle}>How it works</div>
            <h2 className="section-title" style={sectionHeadingStyle}>平台怎麼幫你開始接案</h2>
            <p style={sectionDescStyle}>不只是把你放上平台，而是讓照護者可以更清楚管理工作安排、合作資訊與收入節奏。</p>
          </div>

          <div className="four-grid" style={fourGridStyle}>
            {[
              ["01", "設定你的服務條件", "填寫專長、服務地區、可服務日期與時段，建立適合你的合作範圍。"],
              ["02", "完成資料與審核", "上傳基本資料與必要文件，讓平台與家庭在合作前更有信任基礎。"],
              ["03", "接收合適媒合", "依照你的條件媒合需求，減少不合適案件，提高合作效率。"],
              ["04", "累積評價與收入", "隨著合作次數增加，你的專業頁面與穩定度會逐步形成更好的案源循環。"],
            ].map(([no, title, text]) => (
              <div key={no} style={stepCardStyle}>
                <div style={stepNoStyle}>{no}</div>
                <h3 style={stepTitleStyle}>{title}</h3>
                <p style={stepTextStyle}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="recruit-section" style={sectionSpacingStyle}>
          <div style={sectionHeaderWrapStyle}>
            <div style={smallCapsStyle}>Benefits</div>
            <h2 className="section-title" style={sectionHeadingStyle}>加入後可以期待的合作優勢</h2>
          </div>

          <div className="benefit-wrap" style={benefitWrapStyle}>
            <div className="benefit-card-large" style={benefitCardLargeStyle}>
              <h3 style={benefitTitleStyle}>更自由的工作節奏</h3>
              <p style={benefitTextStyle}>
                適合兼職、斜槓或想逐步建立穩定案源的照護者。你可以決定自己想接哪些類型、在哪些區域、什麼時段服務。
              </p>
            </div>

            <div className="benefit-grid" style={benefitGridStyle}>
              {[
                ["透明案件資訊", "更容易評估時薪、工時與合作內容。"],
                ["專業形象累積", "讓家庭理解你的經驗、專長與服務特質。"],
                ["合作流程更清楚", "減少溝通混亂，提升媒合與服務效率。"],
                ["長期合作機會", "不只是單次接案，也能逐步建立穩定合作。"],
              ].map(([title, text]) => (
                <div key={title} style={benefitCardStyle}>
                  <h3 style={benefitSmallTitleStyle}>{title}</h3>
                  <p style={benefitSmallTextStyle}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="recruit-section" style={sectionSpacingStyle}>
          <div style={sectionHeaderWrapStyle}>
            <div style={smallCapsStyle}>Open roles</div>
            <h2 className="section-title" style={sectionHeadingStyle}>目前適合加入的平台角色</h2>
            <p style={sectionDescStyle}>你可以依自己的服務能力與經驗，選擇適合的合作方向。</p>
          </div>

          <div className="three-grid" style={threeGridStyle}>
            {[
              ["居家陪伴照護", "適合擅長陪伴、生活協助與基本照護支持的夥伴，協助家庭日常照顧安排。", ["陪伴", "日常支持", "基本照護"]],
              ["長者 / 術後照護", "適合有長輩照顧、術後恢復、移動協助與生活支持經驗的照護工作者。", ["長者照護", "術後恢復", "生活協助"]],
              ["陪診 / 特殊需求支持", "適合能陪同就醫、協助交通往返、現場照應與具特殊照護經驗的夥伴。", ["陪診", "就醫協助", "特殊支持"]],
            ].map(([title, text, tags]) => (
              <div key={title as string} style={roleCardStyle}>
                <h3 style={roleTitleStyle}>{title as string}</h3>
                <p style={roleTextStyle}>{text as string}</p>
                <div style={roleTagWrapStyle}>
                  {(tags as string[]).map((tag) => (
                    <span key={tag} style={roleTagStyle}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="process" className="recruit-section" style={sectionSpacingStyle}>
          <div style={sectionHeaderWrapStyle}>
            <div style={smallCapsStyle}>Join process</div>
            <h2 className="section-title" style={sectionHeadingStyle}>加入流程</h2>
          </div>

          <div className="process-grid" style={processTimelineStyle}>
            {[
              ["01", "填寫申請", "建立基本資料，填寫專長、服務時段、服務地區與合作偏好。"],
              ["02", "資格審核", "平台確認基本資料與必要文件，提升合作信任基礎。"],
              ["03", "建立個人檔案", "整理你的經驗、服務內容與可預約資訊，讓家庭更容易了解你。"],
              ["04", "開始接案", "依地區、時段與需求進行媒合，逐步建立穩定合作機會。"],
            ].map(([no, title, text]) => (
              <div key={no} style={timelineCardStyle}>
                <div style={timelineNoStyle}>{no}</div>
                <h3 style={timelineTitleStyle}>{title}</h3>
                <p style={timelineTextStyle}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="recruit-section" style={sectionSpacingStyle}>
          <div style={sectionHeaderWrapStyle}>
            <div style={smallCapsStyle}>FAQ</div>
            <h2 className="section-title" style={sectionHeadingStyle}>常見問題</h2>
          </div>

          <div style={{ display: "grid", gap: 16, maxWidth: 980, margin: "0 auto" }}>
            {[
              ["一定要有證照才能加入嗎？", "不一定，會依服務類型而定。若是較專業或特殊照護項目，建議要求上傳相關證明，讓家庭更容易建立信任。"],
              ["收入試算一定等於實際收入嗎？", "不一定。這是依服務類型、地區、經驗與接案狀態做出的估算，實際收入仍會受到案件數量、可服務時段、評價與合作穩定度影響。"],
              ["我可以自由安排時間嗎？", "可以。平台可以依照你的可服務時段、服務地區與專長進行媒合，讓合作方式比傳統排班更彈性。"],
              ["加入後就一定有案件嗎？", "不一定，仍需依需求量、區域、可服務時段與個人條件而定。但完整的個人資料與清楚的服務設定，通常會更有利於媒合。"],
            ].map(([q, a]) => (
              <div key={q} style={faqCardStyle}>
                <h3 style={faqQStyle}>{q}</h3>
                <p style={faqAStyle}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="recruit-section" style={ctaSectionStyle}>
          <div className="recruit-cta" style={ctaInnerStyle}>
            <div>
              <div style={smallCapsStyleDark}>Start now</div>
              <h2 className="cta-title" style={ctaTitleStyle}>開始建立你的照護工作節奏</h2>
              <p style={ctaTextStyle}>如果你希望用更清楚、更專業的方式接案，現在就加入 CareBridge。</p>
            </div>

            <div className="recruit-button-row" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button type="button" style={heroPrimaryButton} onClick={openRegisterModal}>
                立即申請
              </button>
              <a href="/#consult" style={{ textDecoration: "none" }}>
                <button style={ctaSecondaryButton}>先聯絡我們</button>
              </a>
            </div>
          </div>
        </section>

        <style jsx>{`
          @media (max-width: 1024px) {
            .recruit-hero,
            .split-section,
            .benefit-wrap {
              grid-template-columns: 1fr !important;
            }

            .four-grid,
            .process-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }

            .three-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 768px) {
            .recruit-container {
              padding: 12px 20px 72px !important;
            }
          
          
            .benefit-card-large {
  min-height: auto !important;
  padding: 26px 22px !important;
}
  
            .recruit-hero {
              grid-template-columns: 1fr !important;
              gap: 30px !important;
              min-height: auto !important;
            }

            .recruit-hero-text {
              padding-top: 18px !important;
              max-width: 100% !important;
            }

            .recruit-hero-title {
              font-size: 42px !important;
              line-height: 1.15 !important;
              letter-spacing: -1px !important;
            }

            .recruit-hero-desc {
              font-size: 16px !important;
              line-height: 1.85 !important;
            }

            .calculator-wrap {
              justify-content: stretch !important;
              width: 100% !important;
            }

            .calculator-card {
              max-width: 100% !important;
              padding: 22px !important;
              border-radius: 24px !important;
            }

            .calculator-title,
            .section-title,
            .cta-title {
              font-size: 30px !important;
              line-height: 1.25 !important;
              letter-spacing: -0.6px !important;
            }

            .result-value {
              font-size: 34px !important;
            }

            .four-grid,
            .three-grid,
            .process-grid,
            .benefit-grid {
              grid-template-columns: 1fr !important;
            }

            .split-section,
            .benefit-wrap {
              grid-template-columns: 1fr !important;
            }

            .recruit-section {
              padding-top: 64px !important;
            }

            .recruit-button-row {
              display: grid !important;
              grid-template-columns: 1fr !important;
              width: 100% !important;
            }

            .recruit-button-row button,
            .recruit-button-row a {
              width: 100% !important;
            }

            .recruit-button-row button {
              justify-content: center !important;
            }

            .recruit-cta {
              flex-direction: column !important;
              align-items: stretch !important;
              padding: 30px 24px !important;
              border-radius: 26px !important;
            }
          }

          @media (max-width: 430px) {
            .recruit-hero-title {
              font-size: 38px !important;
            }

            .calculator-title,
            .section-title,
            .cta-title {
              font-size: 28px !important;
            }

            .result-value {
              font-size: 30px !important;
            }
          }
        `}</style>
      </section>
    </main>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 42%, #f8fafc 100%)",
  color: "#111827",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "12px 20px 100px",
};



const sectionSpacingStyle: React.CSSProperties = {
  paddingTop: "84px",
};

const sectionHeaderWrapStyle: React.CSSProperties = {
  textAlign: "center",
  maxWidth: "760px",
  margin: "0 auto 30px",
};

const smallCapsStyle: React.CSSProperties = {
  display: "inline-block",
  fontSize: "12px",
  fontWeight: 800,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#10b981",
  marginBottom: "12px",
};

const smallCapsStyleDark: React.CSSProperties = {
  display: "inline-block",
  fontSize: "12px",
  fontWeight: 800,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.75)",
  marginBottom: "12px",
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: "40px",
  fontWeight: 900,
  lineHeight: 1.15,
  letterSpacing: "-1.2px",
  margin: "0 0 14px",
};

const sectionDescStyle: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.9,
  color: "#6b7280",
  margin: 0,
};

const heroSectionStyle: React.CSSProperties = {
  padding: "0 0 8px",
  display: "grid",
  gridTemplateColumns: "1.05fr 0.95fr",
  gap: "28px",
  alignItems: "start",
  minHeight: "calc(100vh - 150px)",
};

const heroTextWrapStyle: React.CSSProperties = {
  maxWidth: "620px",
  paddingTop: "36px",
};

const heroCalculatorWrapStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "0px",
};

const heroEyebrowStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 800,
  color: "#059669",
  marginBottom: "16px",
};

const heroTitleStyle: React.CSSProperties = {
  fontSize: "66px",
  lineHeight: 1.06,
  fontWeight: 900,
  letterSpacing: "-2.2px",
  margin: "0 0 18px",
};

const heroDescStyle: React.CSSProperties = {
  fontSize: "18px",
  lineHeight: 1.95,
  color: "#4b5563",
  maxWidth: "600px",
  marginBottom: "22px",
};

const heroTagRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "24px",
};

const heroTagStyle: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.82)",
  border: "1px solid #d1fae5",
  color: "#065f46",
  fontSize: "13px",
  fontWeight: 800,
};

const pointStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#374151",
  fontWeight: 700,
};

const heroPrimaryButton: React.CSSProperties = {
  padding: "15px 28px",
  borderRadius: "14px",
  background: "#111827",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: 800,
  fontSize: "16px",
  boxShadow: "0 12px 24px rgba(17,24,39,0.15)",
};

const heroGhostButton: React.CSSProperties = {
  padding: "15px 28px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.85)",
  color: "#111827",
  border: "1px solid #d1d5db",
  cursor: "pointer",
  fontWeight: 800,
  fontSize: "16px",
};

const calculatorCardStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "430px",
  background: "rgba(255,255,255,0.96)",
  border: "1px solid rgba(229,231,235,0.9)",
  borderRadius: "28px",
  padding: "24px",
  boxShadow: "0 20px 48px rgba(15,23,42,0.10)",
  backdropFilter: "blur(8px)",
};

const calculatorTitleStyle: React.CSSProperties = {
  fontSize: "30px",
  fontWeight: 900,
  margin: "0 0 18px",
  color: "#111827",
  lineHeight: 1.2,
  letterSpacing: "-0.8px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 800,
  color: "#374151",
  marginBottom: "7px",
};

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 14px",
  borderRadius: "13px",
  border: "1px solid #d1d5db",
  background: "#fff",
  fontSize: "15px",
  boxSizing: "border-box",
  outline: "none",
};

const resultBoxStyle: React.CSSProperties = {
  padding: "20px",
  borderRadius: "20px",
  background: "linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)",
  border: "1px solid #e5e7eb",
};

const resultLabelStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#6b7280",
  marginBottom: "8px",
  fontWeight: 800,
};

const resultValueStyle: React.CSSProperties = {
  fontSize: "42px",
  fontWeight: 900,
  letterSpacing: "-1.2px",
  lineHeight: 1.08,
};

const resultUnitStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  marginLeft: "6px",
};

const resultNoteStyle: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: 1.8,
  color: "#6b7280",
  margin: "10px 0 0",
};

const fourGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "18px",
};

const threeGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "18px",
};

const featureCardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eef2f7",
  borderRadius: "24px",
  padding: "28px 24px",
  boxShadow: "0 12px 34px rgba(15,23,42,0.04)",
};

const featureIconStyle: React.CSSProperties = {
  width: "54px",
  height: "54px",
  borderRadius: "16px",
  background: "#f0fdf4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  marginBottom: "16px",
};

const featureTitleStyle: React.CSSProperties = {
  fontSize: "21px",
  fontWeight: 800,
  margin: "0 0 10px",
};

const featureTextStyle: React.CSSProperties = {
  color: "#6b7280",
  lineHeight: 1.9,
  fontSize: "15px",
  margin: 0,
};

const splitSectionStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "0.9fr 1.1fr",
  gap: "28px",
  alignItems: "start",
};

const leftHeadingStyle: React.CSSProperties = {
  fontSize: "40px",
  fontWeight: 900,
  lineHeight: 1.15,
  letterSpacing: "-1px",
  margin: "0 0 16px",
};

const leftDescStyle: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "16px",
  lineHeight: 1.9,
  margin: 0,
  maxWidth: "520px",
};

const requirementPanelStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eef2f7",
  borderRadius: "28px",
  padding: "28px",
  display: "grid",
  gap: "14px",
  boxShadow: "0 14px 35px rgba(15,23,42,0.04)",
};

const requirementRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  fontSize: "15px",
  lineHeight: 1.8,
  color: "#374151",
};

const requirementTickStyle: React.CSSProperties = {
  width: "24px",
  height: "24px",
  borderRadius: "999px",
  background: "#ecfdf5",
  color: "#059669",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
  flexShrink: 0,
  marginTop: "1px",
};

const stepCardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #eef2f7",
  borderRadius: "24px",
  padding: "24px",
  boxShadow: "0 12px 30px rgba(15,23,42,0.035)",
};

const stepNoStyle: React.CSSProperties = {
  width: "46px",
  height: "46px",
  borderRadius: "999px",
  background: "#ecfdf5",
  color: "#059669",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 900,
  marginBottom: "14px",
};

const stepTitleStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 800,
  margin: "0 0 10px",
};

const stepTextStyle: React.CSSProperties = {
  color: "#6b7280",
  lineHeight: 1.85,
  fontSize: "15px",
  margin: 0,
};

const benefitWrapStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1.15fr",
  gap: "18px",
};

const benefitCardLargeStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
  color: "#fff",
  borderRadius: "30px",
  padding: "34px",
};

const benefitTitleStyle: React.CSSProperties = {
  fontSize: "34px",
  fontWeight: 900,
  lineHeight: 1.15,
  letterSpacing: "-1px",
  margin: "0 0 14px",
};

const benefitTextStyle: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.95,
  color: "rgba(255,255,255,0.8)",
  margin: 0,
};

const benefitGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "18px",
};

const benefitCardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eef2f7",
  borderRadius: "24px",
  padding: "24px",
  boxShadow: "0 12px 28px rgba(15,23,42,0.04)",
};

const benefitSmallTitleStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 800,
  margin: "0 0 10px",
};

const benefitSmallTextStyle: React.CSSProperties = {
  color: "#6b7280",
  lineHeight: 1.85,
  fontSize: "15px",
  margin: 0,
};

const roleCardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eef2f7",
  borderRadius: "26px",
  padding: "26px",
  boxShadow: "0 12px 30px rgba(15,23,42,0.04)",
};

const roleTitleStyle: React.CSSProperties = {
  fontSize: "23px",
  fontWeight: 800,
  margin: "0 0 12px",
};

const roleTextStyle: React.CSSProperties = {
  color: "#6b7280",
  lineHeight: 1.9,
  fontSize: "15px",
  margin: "0 0 16px",
};

const roleTagWrapStyle: React.CSSProperties = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const roleTagStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: "999px",
  background: "#f3f4f6",
  fontSize: "13px",
  color: "#374151",
  fontWeight: 700,
};

const processTimelineStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "18px",
};

const timelineCardStyle: React.CSSProperties = {
  position: "relative",
  background: "#fff",
  border: "1px solid #eef2f7",
  borderRadius: "24px",
  padding: "24px",
};

const timelineNoStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 900,
  letterSpacing: "0.14em",
  color: "#10b981",
  marginBottom: "10px",
};

const timelineTitleStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 800,
  margin: "0 0 10px",
};

const timelineTextStyle: React.CSSProperties = {
  fontSize: "15px",
  color: "#6b7280",
  lineHeight: 1.85,
  margin: 0,
};

const faqCardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #eef2f7",
  borderRadius: "22px",
  padding: "24px 26px",
  boxShadow: "0 10px 25px rgba(15,23,42,0.03)",
};

const faqQStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 800,
  margin: "0 0 10px",
};

const faqAStyle: React.CSSProperties = {
  color: "#6b7280",
  lineHeight: 1.9,
  fontSize: "15px",
  margin: 0,
};

const ctaSectionStyle: React.CSSProperties = {
  paddingTop: "84px",
};

const ctaInnerStyle: React.CSSProperties = {
  borderRadius: "32px",
  background: "linear-gradient(135deg, #0f172a 0%, #111827 100%)",
  color: "#fff",
  padding: "38px 34px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const ctaTitleStyle: React.CSSProperties = {
  fontSize: "34px",
  fontWeight: 900,
  lineHeight: 1.15,
  letterSpacing: "-1px",
  margin: "0 0 10px",
};

const ctaTextStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.78)",
  lineHeight: 1.85,
  margin: 0,
  fontSize: "15px",
};

const ctaSecondaryButton: React.CSSProperties = {
  padding: "15px 24px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  fontWeight: 800,
  fontSize: "16px",
  cursor: "pointer",
};

const openRegisterModal = () => {
  window.dispatchEvent(
    new CustomEvent("open-auth-modal", {
      detail: "register",
    })
  );
};