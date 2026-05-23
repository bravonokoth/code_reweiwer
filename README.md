# ⚡ AI Code Reviewer

> A real-time AI-powered code review tool built with **Next.js 14**, **Groq API**, and **LLaMA 3.3 70B**. Paste any code or import a GitHub PR and receive instant, streaming feedback on quality, security, performance, and more — completely free to run and deploy.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![Groq](https://img.shields.io/badge/Groq-LLaMA%203.3%2070B-orange)](https://groq.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
  - [1. Code Input Layer](#1-code-input-layer)
  - [2. API Route (Backend)](#2-api-route-backend)
  - [3. Groq Streaming](#3-groq-streaming)
  - [4. Frontend Rendering](#4-frontend-rendering)
  - [5. GitHub PR Import](#5-github-pr-import)
  - [6. Score Parsing](#6-score-parsing)
  - [7. Review History](#7-review-history)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Deployment](#deployment)
- [API Reference](#api-reference)
- [Component Reference](#component-reference)
- [Design Decisions](#design-decisions)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

AI Code Reviewer is a full-stack AI application that acts as a senior engineer reviewing your code in real time. It leverages **Groq's ultra-fast LPU inference** to stream structured feedback back to the user token by token — giving the impression of a live reviewer typing their thoughts as they read your code.

The project is designed as a portfolio piece demonstrating:

- Full-stack Next.js with App Router and server-side API routes
- AI/LLM integration with streaming responses
- Real-world UI patterns (line numbers, markdown rendering, score visualization)
- External API integration (GitHub REST API)
- Client-side state persistence (localStorage history)
- Production deployment on Vercel

---

## Live Demo

> 🔗 **[ai-code-reviewer.vercel.app](https://code-reweiwer.vercel.app/)**

---

## Features

| Feature | Description |
|---|---|
| ⚡ Real-time streaming | Reviews stream token-by-token via `ReadableStream`, no waiting for full response |
| 🧠 AI-powered analysis | LLaMA 3.3 70B reviews code for quality, security, performance, and style |
| 📊 Score visualization | Animated progress bars and a radial chart show scores across 4 dimensions |
| 🎨 Syntax-aware editor | Line numbers, tab support, and language-aware placeholder |
| 📝 Markdown rendering | Review output rendered as rich markdown with styled headings, code blocks, and lists |
| 🐙 GitHub PR import | Paste any public GitHub PR URL to fetch and review its diff automatically |
| ⎘ Copy refactored code | One-click extraction and copy of the AI-generated refactored version |
| 🕒 Review history | Last 10 reviews saved locally and restorable with one click |
| 🌐 10 languages | JavaScript, TypeScript, Python, Java, Go, Rust, C++, PHP, Ruby, Swift |
| 🆓 Completely free | Groq free tier + Vercel hobby plan = $0/month |

---

## Tech Stack

**Frontend**
- [Next.js 14](https://nextjs.org) — React framework with App Router
- [TypeScript](https://www.typescriptlang.org) — type safety across the entire codebase
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) — GitHub-flavored markdown rendering

**Backend**
- Next.js API Routes — built-in server layer, no Express needed
- [Groq SDK](https://www.npmjs.com/package/groq-sdk) — official Groq client for Node.js
- GitHub REST API — fetches PR file diffs for import

**AI**
- [Groq](https://groq.com) — ultra-low-latency LLM inference via Language Processing Units (LPUs)
- [LLaMA 3.3 70B Versatile](https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct) — Meta's open-source large language model

**Infrastructure**
- [Vercel](https://vercel.com) — serverless deployment, automatic CI/CD from GitHub

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Browser                          │
│                                                         │
│  ┌──────────────┐    ┌──────────────────────────────┐  │
│  │  CodeEditor  │    │       ReviewPanel             │  │
│  │  (textarea)  │    │  (streaming markdown output)  │  │
│  └──────┬───────┘    └──────────────▲────────────────┘  │
│         │                           │                   │
│  ┌──────▼───────┐    ┌──────────────┴────────────────┐  │
│  │ GithubInput  │    │  ScoreCard  │  CopyButton      │  │
│  └──────┬───────┘    └───────────────────────────────┘  │
│         │                           ▲                   │
│         │   fetch POST /api/review  │ ReadableStream    │
└─────────┼───────────────────────────┼───────────────────┘
          │                           │
┌─────────▼───────────────────────────┴───────────────────┐
│                  Next.js Server (Vercel)                 │
│                                                         │
│  ┌──────────────────────┐   ┌─────────────────────────┐ │
│  │  /api/review         │   │  /api/github            │ │
│  │  route.ts            │   │  route.ts               │ │
│  │                      │   │                         │ │
│  │  - Validates input   │   │  - Parses PR URL        │ │
│  │  - Builds prompt     │   │  - Calls GitHub API     │ │
│  │  - Calls Groq SDK    │   │  - Returns diff text    │ │
│  │  - Pipes stream back │   │                         │ │
│  └──────────┬───────────┘   └──────────────┬──────────┘ │
└─────────────┼──────────────────────────────┼────────────┘
              │                              │
┌─────────────▼──────────────┐  ┌───────────▼────────────┐
│      Groq API              │  │     GitHub REST API     │
│  LLaMA 3.3 70B Versatile   │  │  /repos/{owner}/{repo}  │
│  (streaming enabled)       │  │  /pulls/{id}/files      │
└────────────────────────────┘  └────────────────────────┘
```

---

## Project Structure

```
ai-code-reviewer/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (HTML shell, fonts)
│   ├── globals.css               # Tailwind base + custom variables
│   ├── page.tsx                  # Main page — orchestrates all components
│   └── api/
│       ├── review/
│       │   └── route.ts          # POST /api/review — Groq streaming endpoint
│       └── github/
│           └── route.ts          # POST /api/github — PR diff fetcher
│
├── components/
│   ├── CodeEditor.tsx            # Textarea with line numbers + tab support
│   ├── ReviewPanel.tsx           # Streaming markdown output renderer
│   ├── ScoreCard.tsx             # Animated score bars + radial chart
│   ├── CopyButton.tsx            # Extracts + copies refactored code
│   ├── GithubInput.tsx           # GitHub PR URL input + fetch trigger
│   └── HistoryPanel.tsx          # Dropdown of past 10 reviews
│
├── lib/
│   ├── groq.ts                   # Groq client singleton
│   ├── highlight.ts              # Shiki highlighter singleton
│   └── history.ts                # localStorage read/write helpers
│
├── .env.local                    # Secret keys (never committed)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## How It Works

### 1. Code Input Layer

The user interacts with `CodeEditor.tsx` — a styled `<textarea>` enhanced with:

- **Line number sidebar** — computed dynamically by splitting `code` on `\n` and rendering a number per line
- **Tab key support** — intercepts `Tab` keydown, prevents default browser behavior (focus shift), and inserts 2 spaces at the cursor position
- **Language selector** — a `<select>` dropdown that sets the `language` state, passed into the API call to contextualize the review prompt

No third-party code editor library is used — this keeps the bundle small and the component fully controllable.

### 2. API Route (Backend)

`app/api/review/route.ts` is a Next.js Route Handler (the App Router equivalent of a pages API route). It runs **server-side only**, which means:

- The `GROQ_API_KEY` is never exposed to the browser
- The Groq SDK runs in a Node.js environment on Vercel's edge/serverless infrastructure

The route receives `{ code, language }` from a `POST` request, validates input, constructs a detailed system prompt that instructs the model to return a structured review with specific sections, and initiates a **streaming chat completion** via the Groq SDK.

### 3. Groq Streaming

This is the core of the application. Groq's API supports **server-sent streaming**, meaning tokens arrive as they are generated rather than waiting for the full response.

The implementation uses the Web Streams API:

```typescript
// Groq returns an async iterable of chunks
const stream = await groq.chat.completions.create({ stream: true, ... });

// Wrap it in a ReadableStream for the HTTP response
const readable = new ReadableStream({
  async start(controller) {
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || "";
      controller.enqueue(encoder.encode(text));
    }
    controller.close();
  },
});

return new Response(readable, {
  headers: { "Content-Type": "text/plain; charset=utf-8" }
});
```

On the **client side** (`page.tsx`), the response body is read chunk by chunk using the Fetch API's `ReadableStream` reader:

```typescript
const reader = res.body!.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  setReview(prev => prev + decoder.decode(value));
}
```

This produces the real-time typewriter effect visible in the review panel.

### 4. Frontend Rendering

The streaming text accumulates in the `review` state string and is passed to `ReviewPanel.tsx`, which renders it via `react-markdown` with custom component overrides. Every heading, paragraph, list, and code block maps to a custom-styled Tailwind component — giving the review output a polished, readable appearance rather than plain text.

The panel auto-scrolls to the bottom as new content arrives using a `useEffect` that watches the `review` state and calls `scrollIntoView` on a bottom sentinel `<div>`.

### 5. GitHub PR Import

`GithubInput.tsx` accepts a GitHub pull request URL in the format:

```
https://github.com/{owner}/{repo}/pull/{number}
```

It sends this to `app/api/github/route.ts`, which:

1. Parses the URL with a regex to extract `owner`, `repo`, and `pull` number
2. Calls the GitHub REST API endpoint `GET /repos/{owner}/{repo}/pulls/{number}/files`
3. Extracts the `patch` field from the first 5 changed files (to stay within token limits)
4. Concatenates them into a single reviewable diff string
5. Returns it to the frontend, which populates the code editor

If a `GITHUB_TOKEN` is set in environment variables, it is included as a Bearer token to increase the API rate limit from 60 to 5,000 requests per hour.

### 6. Score Parsing

`ScoreCard.tsx` receives the full review string and uses regex to extract numeric scores the model embeds in its response:

```typescript
const regex = new RegExp(`${key}[:\\s]+([0-9]+)(?:\\/10)?`, "i");
const match = review.match(regex);
const value = match ? Math.min(10, parseInt(match[1])) : 0;
```

It looks for patterns like `Readability: 8/10` or `Security: 7` across four dimensions. These values drive:

- Animated horizontal progress bars (CSS transition on `width`)
- A circular SVG radial gauge for the Overall score using `stroke-dasharray`
- A verdict label (Excellent / Good / Needs Work / Poor) based on the overall threshold

The component returns `null` while scores are all zero (before the model has streamed far enough to emit them), so it appears smoothly once data is available.

### 7. Review History

`lib/history.ts` provides a simple localStorage-backed persistence layer:

- `saveReview()` — called after each completed review, stores the language, a code snippet preview (first 80 chars), and the full review string. Keeps the last 10 entries.
- `getHistory()` — reads and parses the stored JSON array
- `clearHistory()` — removes the key entirely

`HistoryPanel.tsx` renders these as a dropdown list. Clicking an entry calls `onRestore`, which repopulates the code editor and review panel with the saved content — letting users revisit past reviews without re-running the API call.

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- A free [Groq account](https://console.groq.com) for an API key
- (Optional) A [GitHub personal access token](https://github.com/settings/tokens) for higher PR import rate limits

### Installation

```bash
# Clone the repository
git clone https://github.com/bravonokoth/code_reviewer.git
cd ai-code-reviewer

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Required
GROQ_API_KEY=gsk_your_key_here

# Optional — increases GitHub API rate limit from 60 to 5000 req/hr
GITHUB_TOKEN=ghp_your_token_here
```

> ⚠️ Never commit `.env.local` to version control. It is already listed in `.gitignore` by default.

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---


```

Then go to your **Vercel Dashboard → Project → Settings → Environment Variables** and add:

```
GROQ_API_KEY = gsk_your_key_here
GITHUB_TOKEN = ghp_your_token_here  (optional)
```

Trigger a redeploy after adding variables. Your app will be live at a `*.vercel.app` URL within seconds.

### Build for production locally

```bash
npm run build
npm start
```

---

## API Reference

### `POST /api/review`

Reviews a code snippet using Groq + LLaMA 3.3 70B. Returns a streaming plain text response.

**Request body**

```json
{
  "code": "function add(a, b) { return a + b }",
  "language": "javascript"
}
```

**Response**

`Content-Type: text/plain; charset=utf-8` — streamed markdown string.

**Review structure returned by the model:**

```
## 🔍 Summary
## ✅ What's Good
## ⚠️ Issues Found
## 🔒 Security
## ⚡ Performance
## 🛠 Refactored Version
## 📊 Scores
```

---

### `POST /api/github`

Fetches the diff from a public GitHub pull request.

**Request body**

```json
{
  "url": "https://github.com/owner/repo/pull/42"
}
```

**Response**

```json
{
  "diff": "// File: src/index.ts\n@@ -1,3 +1,5 @@\n...",
  "fileCount": 3
}
```

**Error responses**

```json
{ "error": "Invalid GitHub PR URL" }
{ "error": "Failed to fetch PR" }
```

---

## Component Reference

### `CodeEditor`

| Prop | Type | Description |
|---|---|---|
| `code` | `string` | Current code value |
| `language` | `string` | Selected language (controls placeholder text) |
| `onChange` | `(code: string) => void` | Called on every keystroke |
| `onLanguageChange` | `(lang: string) => void` | Called when language selector changes |

### `ReviewPanel`

| Prop | Type | Description |
|---|---|---|
| `review` | `string` | Accumulated review markdown string |
| `loading` | `boolean` | Shows streaming indicator when `true` |

### `ScoreCard`

| Prop | Type | Description |
|---|---|---|
| `review` | `string` | Full review text to parse scores from |

Returns `null` until at least one score is detected.

### `CopyButton`

| Prop | Type | Description |
|---|---|---|
| `review` | `string` | Full review text — extracts the last code block |

Returns `null` if no code block is found in the review.

### `GithubInput`

| Prop | Type | Description |
|---|---|---|
| `onFetch` | `(diff: string) => void` | Called with the raw diff when PR is fetched |

### `HistoryPanel`

| Prop | Type | Description |
|---|---|---|
| `onRestore` | `(entry: HistoryEntry) => void` | Called when user clicks a history entry |

---

## Design Decisions

**Why Groq over OpenAI?**
Groq's LPU hardware delivers 300-500 tokens/second vs OpenAI's ~60-80 tokens/second. For a streaming app where perceived speed is part of the user experience, this is a significant UX advantage. The free tier is also generous enough for portfolio demonstration.

**Why Next.js API routes over a separate Express server?**
Keeping the backend inside Next.js eliminates a separate process, simplifies deployment to a single Vercel project, and keeps the `GROQ_API_KEY` server-side without any extra configuration. For a project of this scope, a separate backend adds complexity with no benefit.

**Why no code editor library (e.g. Monaco, CodeMirror)?**
Monaco adds ~2MB to the bundle and requires dynamic imports. For a portfolio project where the editor is secondary to the AI output, a lightweight custom textarea is simpler, faster, and more maintainable. The line numbers and tab support cover 90% of the UX value.

**Why localStorage for history?**
No database setup, no auth, no cost — and it works offline. For a portfolio demo, the goal is showing the pattern (persist, retrieve, restore) rather than production-grade storage. Swapping to a database like Supabase would be straightforward.

**Why `temperature: 0.3` in the Groq call?**
Lower temperature produces more consistent, deterministic output — important when the model needs to follow a specific structured format (the `## Section` headers) reliably across every review. Higher temperature would produce creative but structurally inconsistent output that breaks the markdown rendering.

---

## Future Improvements

- [ ] **Auth + cloud history** — Supabase auth + Postgres to persist reviews across devices
- [ ] **Shareable review links** — generate a unique URL for each review result
- [ ] **Diff view** — side-by-side original vs refactored code with highlighted changes
- [ ] **Private GitHub repos** — OAuth GitHub login to review code in private repositories
- [ ] **Multi-file review** — upload a ZIP or connect a repo for project-wide analysis
- [ ] **Custom rubrics** — let users define their own review criteria (e.g. company style guide)
- [ ] **VS Code extension** — trigger reviews directly from the editor

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: describe your change"
git push origin feature/your-feature-name
# Open a PR
```

Please follow the existing TypeScript + Tailwind conventions and run `npm run build` before submitting to ensure no type errors.

---

## License

[MIT](LICENSE) — free to use, modify, and distribute.

---

<p align="center">Built with Next.js, Groq, and LLaMA 3.3 70B · Deployed on Vercel · $0/month</p>