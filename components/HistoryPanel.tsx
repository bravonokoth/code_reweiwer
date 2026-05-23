"use client";
import { useEffect, useState } from "react";

import { getHistory, clearHistory, type HistoryEntry } from "@/lib/history";

interface Props {
  onRestore: (entry: HistoryEntry) => void;
}

export default function HistoryPanel({ onRestore }: Props) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [open, setOpen] = useState(false);

  // Avoid directly setting state during effect execution; instead defer.
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      setHistory(getHistory());
    }, 0);
    return () => window.clearTimeout(id);
  }, [open]);

  function clear() {
    clearHistory();
    setHistory([]);
  }

  const count = history.length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors border border-gray-700"
      >
        🕒 History
        {count > 0 && <span className="bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full">{count}</span>}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            <span className="text-sm font-medium text-white">Recent Reviews</span>
            <button onClick={clear} className="text-xs text-red-400 hover:text-red-300">
              Clear all
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-gray-800">
            {count === 0 ? (
              <p className="text-gray-500 text-sm text-center py-6">No history yet</p>
            ) : (
              history.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => {
                    onRestore(entry);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-purple-400">{entry.language}</span>
                    <span className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate font-mono">{entry.codeSnippet}</p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

