"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRef, useEffect } from "react";

interface Props {
  review: string;
  loading: boolean;
}

export default function ReviewPanel({ review, loading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [review]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-gray-300">Review</label>
        {loading && (
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0ms]" />
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:150ms]" />
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:300ms]" />
            <span className="text-xs text-purple-400">streaming...</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-900 rounded-xl border border-gray-700 p-5 text-sm text-gray-200 leading-relaxed">
        {review ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => (
                <h2 className="text-base font-bold text-white mt-5 mb-2 first:mt-0">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-sm font-semibold text-purple-300 mt-4 mb-1">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-300 mb-3 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-1 mb-3 text-gray-300">{children}</ul>
              ),
              li: ({ children }) => <li className="text-gray-300">{children}</li>,
              code: ({ children, className }) => {
                const isBlock = className?.includes("language-");
                return isBlock ? (
                  <pre className="bg-gray-950 rounded-lg p-4 overflow-x-auto my-3 border border-gray-700">
                    <code className="text-green-400 font-mono text-xs">{children}</code>
                  </pre>
                ) : (
                  <code className="bg-gray-800 text-purple-300 px-1.5 py-0.5 rounded font-mono text-xs">
                    {children}
                  </code>
                );
              },
              strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-purple-500 pl-3 text-gray-400 italic my-3">{children}</blockquote>
              ),
            }}
          >
            {review}
          </ReactMarkdown>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-600 text-center">
              Paste code on the left and hit
              <br />
              <span className="text-purple-500 font-medium">Review My Code</span> to get started
            </p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

