"use client";
import { useMemo } from "react";

const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "go",
  "rust",
  "c++",
  "php",
  "ruby",
  "swift",
];

interface Props {
  code: string;
  language: string;
  onChange: (code: string) => void;
  onLanguageChange: (lang: string) => void;
}

export default function CodeEditor({ code, language, onChange, onLanguageChange }: Props) {
  const lineCount = useMemo(() => code?.split("\n").length ?? 1, [code]);

  return (
      <div className="flex flex-col gap-3 h-full">

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-gray-500 font-mono">code.{language}</span>
        </div>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div className="relative flex bg-gray-900 rounded-xl border border-gray-700 overflow-hidden focus-within:border-purple-500 transition-colors flex-1 min-h-0">
        <div className="select-none pt-4 pb-4 pl-3 pr-2 text-right text-gray-600 font-mono text-sm leading-6 bg-gray-950 min-w-[40px] overflow-hidden">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          placeholder="// Paste your code here..."
          spellCheck={false}
          className="flex-1 bg-transparent text-green-400 font-mono text-sm p-4 pl-2 resize-none focus:outline-none leading-6 min-h-0 h-full overflow-y-auto"
          style={{ tabSize: 2 } as React.CSSProperties}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              const start = e.currentTarget.selectionStart;
              const end = e.currentTarget.selectionEnd;
              const newCode = code.substring(0, start) + "  " + code.substring(end);
              onChange(newCode);
            }
          }}
        />
      </div>


      <div className="flex justify-between text-xs text-gray-600 font-mono px-1">
        <span>{lineCount} lines</span>
        <span>{code.length} chars</span>
      </div>
    </div>
  );
}

