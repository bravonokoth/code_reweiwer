import { createHighlighter } from "shiki";

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

export async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-dark"],
      langs: [
        "javascript",
        "typescript",
        "python",
        "java",
        "go",
        "rust",
        "cpp",
        "php",
        "ruby",
        "swift",
      ],
    });
  }
  return highlighter;
}

export async function highlightCode(code: string, lang: string): Promise<string> {
  const h = await getHighlighter();
  return h.codeToHtml(code, { lang, theme: "github-dark" });
}

