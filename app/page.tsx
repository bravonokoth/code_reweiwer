"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FEATURES = [
  {
    icon: "⚡",
    title: "Streams in real time",
    desc: "Powered by Groq's LPU hardware — results appear token by token at 400+ tokens/sec.",
  },
  {
    icon: "🔍",
    title: "6 review dimensions",
    desc: "Summary, strengths, issues with severity, security, performance, and a refactored version.",
  },
  {
    icon: "📊",
    title: "Instant scoring",
    desc: "Readability, performance, security and overall scored out of 10 with animated visuals.",
  },
  {
    icon: "🐙",
    title: "GitHub PR import",
    desc: "Paste any public pull request URL and review the full diff without copy-pasting.",
  },
  {
    icon: "🕒",
    title: "Review history",
    desc: "Your last 10 reviews are saved locally and restorable with a single click.",
  },
  {
    icon: "🌐",
    title: "10 languages",
    desc: "JavaScript, TypeScript, Python, Java, Go, Rust, C++, PHP, Ruby, and Swift.",
  },
];

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Go",
  "Rust",
  "Java",
  "Swift",
  "C++",
];

const TICKER_CODE = `// Real review. Real time.
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay, ...args);
  };
}`;

export default function LandingPage() {
  const router = useRouter();
  const [typedCode, setTypedCode] = useState("");
  const [langIdx, setLangIdx] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = window.setInterval(() => {
      i++;
      setTypedCode(TICKER_CODE.slice(0, i));
      if (i >= TICKER_CODE.length) window.clearInterval(interval);
    }, 18);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = window.setInterval(() => {
      setLangIdx((i) => (i + 1) % LANGUAGES.length);
    }, 1400);
    return () => window.clearInterval(t);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#09090b",
        color: "#fafafa",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .hero-glow {
          position: absolute;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%);
          top: -200px; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .grid-bg {
          position: fixed; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .fade-up {
          opacity: 0; transform: translateY(24px);
          animation: fadeUp 0.7s ease forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .badge-lang {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid rgba(139,92,246,0.4);
          background: rgba(139,92,246,0.1);
          color: #a78bfa;
          font-family: 'DM Mono', monospace;
          transition: opacity 0.3s;
          min-width: 90px;
          text-align: center;
        }

        .cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px;
          background: #7c3aed;
          color: #fff;
          border: none; border-radius: 12px;
          font-size: 16px; font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 0 0 0 rgba(124,58,237,0.4);
          font-family: inherit;
          text-decoration: none;
        }
        .cta-primary:hover {
          background: #6d28d9;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(124,58,237,0.35);
        }
        .cta-primary:active { transform: translateY(0); }

        .cta-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px;
          background: transparent;
          color: #a1a1aa;
          border: 1px solid #27272a;
          border-radius: 12px;
          font-size: 15px; font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          font-family: inherit;
          text-decoration: none;
        }
        .cta-secondary:hover { border-color: #52525b; color: #fafafa; }

        .code-window {
          background: #111113;
          border: 1px solid #27272a;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6);
        }
        .code-titlebar {
          display: flex; align-items: center; gap: 6px;
          padding: 12px 16px;
          background: #18181b;
          border-bottom: 1px solid #27272a;
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; }

        .feature-card {
          background: #111113;
          border: 1px solid #1c1c1f;
          border-radius: 14px;
          padding: 24px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .feature-card:hover {
          border-color: #3f3f46;
          transform: translateY(-3px);
        }

        .stat-item { text-align: center; }
        .stat-num {
          font-size: 36px; font-weight: 600;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }

        nav a {
          color: #71717a; font-size: 14px; text-decoration: none;
          transition: color 0.2s;
        }
        nav a:hover { color: #fafafa; }
      `}</style>

      <div className="grid-bg" />
      <div className="hero-glow" />

      <nav
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 48px",
          borderBottom: "1px solid #18181b",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>⚡</span>
          <span style={{ fontWeight: 600, fontSize: 16, color: "#fafafa" }}>
            CodeReview AI
          </span>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <button
          className="cta-primary"
          style={{ padding: "8px 20px", fontSize: 14 }}
          onClick={() => router.push("/review")}
        >
          Open App
        </button>
      </nav>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "96px 24px 80px",
          gap: 32,
        }}
      >
        <div className="fade-up" style={{ animationDelay: "0ms" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 99,
              border: "1px solid #27272a",
              background: "#111113",
              fontSize: 13,
              color: "#71717a",
            }}
          >
            <span style={{ color: "#a78bfa" }}>✦</span>
            Powered by Groq · LLaMA 3.3 70B · Free forever
            <span className="badge-lang">{LANGUAGES[langIdx]}</span>
          </div>
        </div>

        <div className="fade-up" style={{ animationDelay: "120ms" }}>
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: 760,
            }}
          >
            Your code, reviewed by{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              a senior engineer
            </span>
            . Instantly.
          </h1>
        </div>

        <div className="fade-up" style={{ animationDelay: "220ms" }}>
          <p
            style={{
              fontSize: 18,
              color: "#71717a",
              maxWidth: 520,
              lineHeight: 1.7,
            }}
          >
            Paste any code or import a GitHub PR. Get a structured review covering
            quality, security, performance, and a refactored version — streaming live.
          </p>
        </div>

        <div
          className="fade-up"
          style={{
            animationDelay: "320ms",
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button className="cta-primary" onClick={() => router.push("/review")}>
            Start reviewing for free
            <span style={{ fontSize: 18 }}>→</span>
          </button>
          <a className="cta-secondary" href="#how-it-works">
            See how it works
          </a>
        </div>

        <div
          className="fade-up"
          style={{
            animationDelay: "440ms",
            width: "100%",
            maxWidth: 680,
            marginTop: 16,
          }}
        >
          <div className="code-window">
            <div className="code-titlebar">
              <div className="dot" style={{ background: "#ef4444" }} />
              <div className="dot" style={{ background: "#f59e0b" }} />
              <div className="dot" style={{ background: "#22c55e" }} />
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 12,
                  color: "#52525b",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                app/utils/debounce.js
              </span>
            </div>
            <div
              style={{
                padding: "20px 24px",
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
                lineHeight: 1.8,
                color: "#a1a1aa",
                minHeight: 160,
                textAlign: "left",
                whiteSpace: "pre",
              }}
            >
              <span style={{ color: "#71717a" }}>{typedCode.match(/\/\/.*$/)?.[0] ?? ""}</span>
              {"\n"}
              <span style={{ color: "#c4b5fd" }}>function </span>
              <span style={{ color: "#6ee7b7" }}>debounce</span>
              <span style={{ color: "#e2e8f0" }}>(fn, delay) {"{"}</span>
              {"\n  "}
              <span style={{ color: "#c4b5fd" }}>let </span>
              <span style={{ color: "#e2e8f0" }}>timer;</span>
              {"\n  "}
              <span style={{ color: "#c4b5fd" }}>return </span>
              <span style={{ color: "#e2e8f0" }}>(...args) {">"} {"{"}</span>
              {"\n    "}
              <span style={{ color: "#6ee7b7" }}>clearTimeout</span>
              <span style={{ color: "#e2e8f0" }}>(timer);</span>
              {"\n    "}
              <span style={{ color: "#e2e8f0" }}>timer = </span>
              <span style={{ color: "#6ee7b7" }}>setTimeout</span>
              <span style={{ color: "#e2e8f0" }}>(fn, delay, ...args);</span>
              {"\n  };\n"}
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: 14,
                  background: "#a78bfa",
                  marginLeft: 2,
                  animation: "blink 1s step-end infinite",
                }}
              />
              {"}"}
            </div>

            <div
              style={{
                borderTop: "1px solid #27272a",
                padding: "12px 24px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#0d0d0f",
              }}
            >
              <span style={{ fontSize: 12, color: "#52525b" }}>AI review complete</span>
              {[
                { label: "Quality", val: 82, color: "#a78bfa" },
                { label: "Security", val: 95, color: "#34d399" },
                { label: "Perf", val: 76, color: "#f59e0b" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 11, color: "#52525b" }}>{s.label}</span>
                  <div
                    style={{
                      width: 48,
                      height: 3,
                      background: "#1c1c1f",
                      borderRadius: 99,
                    }}
                  >
                    <div
                      style={{
                        width: `${s.val}%`,
                        height: "100%",
                        background: s.color,
                        borderRadius: 99,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      color: s.color,
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {s.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid #18181b",
          borderBottom: "1px solid #18181b",
          padding: "48px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 32,
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {[
          { num: "400+", label: "tokens/sec via Groq" },
          { num: "10", label: "languages supported" },
          { num: "6", label: "review dimensions" },
          { num: "$0", label: "cost to run" },
        ].map((s) => (
          <div key={s.label} className="stat-item">
            <div className="stat-num">{s.num}</div>
            <div style={{ fontSize: 13, color: "#52525b", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </section>

      <section
        id="features"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1000,
          margin: "0 auto",
          padding: "96px 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p
            style={{
              fontSize: 12,
              color: "#7c3aed",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Features
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Everything a senior engineer would catch
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card" style={{ animationDelay: `${i * 60}ms` }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: "#fafafa" }}>
                {f.title}
              </div>
              <div style={{ fontSize: 14, color: "#71717a", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 720,
          margin: "0 auto",
          padding: "0 24px 96px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p
            style={{
              fontSize: 12,
              color: "#7c3aed",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            How it works
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Three steps to better code
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            {
              n: "01",
              title: "Paste your code or import a PR",
              desc: "Drop any snippet or paste a GitHub pull request URL. Supports 10 languages.",
            },
            {
              n: "02",
              title: "Watch the review stream live",
              desc: "Groq's LPU delivers tokens at 400+/sec — results appear as the AI thinks.",
            },
            {
              n: "03",
              title: "Copy the refactored version",
              desc: "One click copies the improved code. Scorecard and history saved automatically.",
            },
          ].map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 24,
                paddingBottom: i < 2 ? 40 : 0,
                borderLeft: i < 2 ? "1px solid #27272a" : "none",
                marginLeft: 20,
                paddingLeft: 32,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -16,
                  top: 0,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#7c3aed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "'DM Mono', monospace",
                  flexShrink: 0,
                }}
              >
                {step.n}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#fafafa", marginBottom: 6 }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 14, color: "#71717a", lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          margin: "0 24px 96px",
          maxWidth: 960,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #1a0a2e 0%, #16042a 50%, #0f0218 100%)",
            border: "1px solid #3b0764",
            borderRadius: 24,
            padding: "64px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 400,
              height: 400,
              background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              pointerEvents: "none",
            }}
          />
          <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Ready to write better code?
          </h2>
          <p style={{ fontSize: 16, color: "#71717a", marginBottom: 32 }}>
            No signup. No API key needed. Free forever.
          </p>
          <button className="cta-primary" style={{ fontSize: 16, padding: "16px 40px" }} onClick={() => router.push("/review")}>
            Start your first review →
          </button>
        </div>
      </section>

      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid #18181b",
          padding: "24px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>⚡</span>
          <span style={{ fontSize: 14, color: "#52525b" }}>CodeReview AI · Built with Next.js</span>
        </div>
        <span style={{ fontSize: 13, color: "#3f3f46" }}>Free & open source · $0/month</span>
      </footer>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </main>
  );
}
