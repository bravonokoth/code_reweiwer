import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  const match = url?.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/);
  if (!match) {
    return NextResponse.json({ error: "Invalid GitHub PR URL" }, { status: 400 });
  }

  const [, owner, repo, pull] = match;

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${pull}/files`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      ...(process.env.GITHUB_TOKEN
        ? {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }
        : {}),
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch PR" }, { status: 500 });
  }

  const files = (await res.json()) as Array<{ filename: string; patch?: string }>;

  const diff = files
    .slice(0, 5)
    .map((f) => `// File: ${f.filename}\n${f.patch ?? "// Binary or no diff available"}`)
    .join("\n\n---\n\n");

  return NextResponse.json({ diff, fileCount: files.length });
}

