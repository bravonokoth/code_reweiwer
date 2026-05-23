import { NextRequest } from "next/server";
import groq from "@/lib/groq";

export async function POST(req: NextRequest) {
  const { code, language } = await req.json();

  if (!code || code.trim().length === 0) {
    return new Response("No code provided", { status: 400 });
  }

  const stream = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    max_tokens: 1500,
    stream: true,
    messages: [
      {
        role: "system",
        content: `You are a senior engineer at a top tech firm doing a code review.
Analyze the code and return your review in this exact structure:

## 🔍 Summary
One sentence verdict.

## ✅ What's Good
Bullet points of strengths.

## ⚠️ Issues Found
Each issue with: severity (Critical/Major/Minor), explanation, and fix.

## 🔒 Security
Any vulnerabilities or "No issues found."

## ⚡ Performance
Bottlenecks or "Looks efficient."

## 🛠 Refactored Version
Provide the improved code in a code block.

## 📊 Scores
- Readability: X/10
- Performance: X/10
- Security: X/10
- Overall: X/10

Be direct, technical, and specific. No fluff.`,
      },
      {
        role: "user",
        content: `Review this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``,
      },
    ],
  });

  const encoder = new TextEncoder();

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
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}

