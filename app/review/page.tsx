"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import CodeEditor from "@/components/CodeEditor";
import ReviewPanel from "@/components/ReviewPanel";
import ScoreCard from "@/components/ScoreCard";
import CopyButton from "@/components/CopyButton";
import GithubInput from "@/components/GithubInput";
import HistoryPanel from "@/components/HistoryPanel";
import { saveReview, type HistoryEntry } from "@/lib/history";

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const reviewAccum = useRef("");

  async function handleReview() {
    if (!code.trim()) return;
    setReview("");
    reviewAccum.current = "";
    setLoading(true);

    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language }),
    });

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = decoder.decode(value);
      reviewAccum.current += text;
      setReview(reviewAccum.current);
    }

    setLoading(false);

    saveReview({
      language,
      codeSnippet: code.slice(0, 80),
      review: reviewAccum.current,
    });
  }

  function restoreEntry(entry: HistoryEntry) {
    setCode(entry.codeSnippet);
    setLanguage(entry.language);
    setReview(entry.review);
  }

  return (
    <main className="h-[100dvh] bg-gray-950 text-white p-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 h-full">
        <div className="flex items-center justify-between shrink-0">
          <div>
            <Link
              href="/"
              style={{
                color: "#71717a",
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginBottom: 6,
                textDecoration: "none",
              }}
            >
              ← Back
            </Link>
            <h1 className="text-2xl font-bold text-white">Code Reviewer</h1>
            <p className="text-gray-500 text-sm mt-0.5">Groq · LLaMA 3.3 70B · Real-time streaming</p>
          </div>
          <HistoryPanel onRestore={restoreEntry} />
        </div>

        <GithubInput
          onFetch={(diff) => {
            setCode(diff);
            setLanguage("diff");
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
          <div className="flex flex-col gap-4 overflow-hidden">
            <div className="flex-1 min-h-0 overflow-hidden">
              <CodeEditor
                code={code}
                language={language}
                onChange={setCode}
                onLanguageChange={setLanguage}
              />
            </div>
            <button
              onClick={handleReview}
              disabled={loading || !code.trim()}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-colors shrink-0"
            >
              {loading ? "Reviewing..." : "Review My Code →"}
            </button>
          </div>

          <div className="flex flex-col gap-4 overflow-hidden">
            <div className="shrink-0">
              <ScoreCard review={review} />
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <ReviewPanel review={review} loading={loading} />
            </div>
            {review && !loading && <CopyButton review={review} />}
          </div>
        </div>
      </div>
    </main>
  );
}


