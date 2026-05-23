export interface HistoryEntry {
  id: string;
  language: string;
  codeSnippet: string;
  review: string;
  timestamp: number;
}

const KEY = "code-review-history";

export function saveReview(entry: Omit<HistoryEntry, "id" | "timestamp">) {
  const history = getHistory();
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  const updated = [newEntry, ...history].slice(0, 10);
  localStorage.setItem(KEY, JSON.stringify(updated));
  return newEntry;
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}

