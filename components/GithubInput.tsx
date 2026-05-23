"use client";
import { useState } from "react";

interface Props {
  onFetch: (code: string) => void;
}

export default function GithubInput({ onFetch }: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchPR() {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      onFetch(data.diff);
    } catch {
      setError("Failed to fetch PR. Check the URL.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-gray-400">Or import from GitHub PR</label>
      <div className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/owner/repo/pull/123"
          className="flex-1 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 placeholder:text-gray-600"
        />
        <button
          onClick={fetchPR}
          disabled={loading || !url.trim()}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-40 rounded-lg text-sm font-medium text-white transition-colors whitespace-nowrap"
        >
          {loading ? "Fetching..." : "Import PR"}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

