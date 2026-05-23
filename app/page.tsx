import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Code Reviewer — Instant feedback powered by LLaMA 3.3 & Groq",
  description:
    "Paste any code or import a GitHub PR and receive real-time AI-powered feedback on quality, security, performance, and style — free to use.",
};

const FEATURES = [
  {
    icon: "⚡",
    title: "Real-time streaming",
    desc: "Reviews stream token-by-token via ReadableStream — no waiting for a full response.",
  },
  {
    icon: "🧠",
    title: "LLaMA 3.3 70B",
    desc: "Meta's top open-source model running on Groq's ultra-fast LPU hardware.",
  },
  {
    icon: "📊",
    title: "Score visualisation",
    desc: "Animated progress bars and a radial gauge across 4 quality dimensions.",
  },
  {
    icon: "🐙",
    title: "GitHub PR import",
    desc: "Paste any public pull-request URL to fetch and review its diff instantly.",
  },
  {
    icon: "⎘",
    title: "Copy refactored code",
    desc: "One-click extraction of the AI-generated refactored version from the review.",
  },
  {
    icon: "🕒",
    title: "Review history",
    desc: "Last 10 reviews saved locally and restorable with a single click.",
  },
];

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "Go",
  "Rust",
  "C++",
  "PHP",
  "Ruby",
  "Swift",
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* ── Fading square-grid background ── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(37,99,235,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 80%)",
        }}
      />

      {/* ── Nav ── */}
      <nav
        style={{ position: "relative", zIndex: 10 }}
        className="border-b border-blue-900/50 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full"
      >
        <span className="font-bold text-lg tracking-tight">
          ⚡ <span style={{ color: "#3b82f6" }}>AI</span> Code Reviewer
        </span>
        <Link
          href="/review"
          style={{ background: "#1d4ed8" }}
          className="text-sm hover:brightness-110 transition-all px-4 py-2 rounded-lg font-semibold"
        >
          Open Reviewer →
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section
        style={{ position: "relative", zIndex: 10 }}
        className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 gap-8"
      >
        {/* badge */}
        <span
          style={{
            background: "rgba(29,78,216,0.2)",
            color: "#93c5fd",
            borderColor: "rgba(59,130,246,0.4)",
          }}
          className="text-xs font-semibold tracking-widest uppercase border px-3 py-1 rounded-full"
        >
          Groq · LLaMA 3.3 70B · Real-time streaming
        </span>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight max-w-4xl">
          Get instant{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #3b82f6, #1d4ed8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI code reviews
          </span>{" "}
          in seconds
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl">
          Paste any snippet or import a GitHub PR and receive structured
          feedback on quality, security, performance, and style — completely
          free to use.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/review"
            style={{
              background: "#1d4ed8",
              boxShadow: "0 8px 32px rgba(29,78,216,0.35)",
            }}
            className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:brightness-110 hover:scale-[1.03] active:scale-100"
          >
            Start reviewing code →
          </Link>
          <a
            href="https://github.com/bravonokoth/code_reviewer"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-gray-700 hover:border-blue-600 rounded-xl font-semibold text-lg transition-colors text-gray-300 hover:text-white"
          >
            View on GitHub
          </a>
        </div>

        {/* language pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {LANGUAGES.map((lang) => (
            <span
              key={lang}
              className="text-xs font-mono bg-gray-800/80 border border-gray-700 text-gray-400 px-3 py-1 rounded-full"
            >
              {lang}
            </span>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section
        style={{ position: "relative", zIndex: 10 }}
        className="max-w-7xl mx-auto w-full px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {FEATURES.map((f) => (
          <div
            key={f.title}
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
            className="bg-gray-900/70 backdrop-blur border rounded-2xl p-6 flex flex-col gap-3 hover:border-blue-700/60 transition-colors"
          >
            <span className="text-3xl">{f.icon}</span>
            <h2 className="font-bold text-base text-white">{f.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* ── CTA banner ── */}
      <section
        style={{ position: "relative", zIndex: 10 }}
        className="max-w-7xl mx-auto w-full px-6 pb-20"
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(29,78,216,0.25), rgba(37,99,235,0.15))",
            borderColor: "rgba(59,130,246,0.3)",
          }}
          className="border rounded-2xl p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-bold text-xl">Ready to review your code?</p>
            <p className="text-gray-400 text-sm mt-1">
              No sign-up required. 100% free on Groq&apos;s generous free tier.
            </p>
          </div>
          <Link
            href="/review"
            style={{ background: "#1d4ed8" }}
            className="shrink-0 px-8 py-3 rounded-xl font-bold transition-all hover:brightness-110 hover:scale-[1.03] active:scale-100"
          >
            Open Reviewer →
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{ position: "relative", zIndex: 10 }}
        className="border-t border-gray-800 py-6 text-center text-gray-600 text-xs"
      >
        Built with Next.js, Groq &amp; LLaMA 3.3 70B · Deployed on Vercel ·
        $0/month
      </footer>
    </main>
  );
}
