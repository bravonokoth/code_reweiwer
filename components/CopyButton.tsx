"use client";
import { useState } from "react";

interface Props {
  review: string;
}

function extractRefactoredCode(review: string): string | null {
  const match = review.match(/```[\w]*\n([\s\S]*?)```/g);
  if (!match) return null;
  const last = match[match.length - 1];
  return last.replace(/```[\w]*\n/, "").replace(/```$/, "");
}

export default function CopyButton({ review }: Props) {
  const [copied, setCopied] = useState(false);

  const code = extractRefactoredCode(review);
  if (!code) return null;

  async function copy() {
    await navigator.clipboard.writeText(code!);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-medium text-white transition-colors"
    >
      {copied ? (
        <>
          <span>✓</span> Copied!
        </>
      ) : (
        <>
          <span>⎘</span> Copy Refactored Code
        </>
      )}
    </button>
  );
}

