"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import type { ServerProblem } from "@/lib/serverProblem";
import { buildTikzUrl } from "@/lib/krokiUtils";

// ─────────────────────────────────────────────
// Math text iframe (renders inline $...$ math)
// ─────────────────────────────────────────────

function buildMathHtml(problem: ServerProblem): string {
  const { main_text, sub_question, choices } = problem.problem_statement;
  const { source, points } = problem.problem_info;

  // Build numbered choices as ① ② ③ ④ ⑤
  const circledNums = ["①", "②", "③", "④", "⑤"];
  const choicesHtml = choices
    .map((c, i) => `<span class="choice">${circledNums[i]} \\(${c}\\)</span>`)
    .join("&emsp;");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    html, body {
      margin: 0; padding: 0;
      font-size: 15px;
      font-family: 'Times New Roman', serif;
      color: #1e293b;
      background: transparent;
      line-height: 1.9;
    }
    .source { font-size: 11px; color: #94a3b8; margin-bottom: 10px; }
    .main-text { margin-bottom: 10px; }
    .sub-question { margin-bottom: 14px; }
    .badge { 
      display: inline-block; font-size: 11px; font-weight: 700;
      background: #ede9fe; color: #7c3aed;
      border-radius: 6px; padding: 1px 8px; margin-left: 6px;
      font-family: sans-serif; vertical-align: middle;
    }
    .choices { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px 20px; }
    .choice { white-space: nowrap; }
  </style>
  <script>
    window.MathJax = {
      tex: { inlineMath: [['$', '$'], ['\\\\(', '\\\\)']], displayMath: [['$$','$$']], packages: {'[+]': ['ams']} },
      options: { skipHtmlTags: ['script','noscript','style','textarea'] },
      startup: {
        ready() {
          MathJax.startup.defaultReady();
          MathJax.startup.promise.then(() => {
            document.body.style.opacity = '1';
            window.parent.postMessage({ type: 'problem-height', height: document.body.scrollHeight }, '*');
          });
        }
      }
    };
  <\/script>
  <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"><\/script>
</head>
<body style="opacity:0; padding: 16px 18px 14px; transition: opacity 0.3s;">
  <div class="source">${source}&nbsp;<span class="badge">${points}점</span></div>
  <div class="main-text">${main_text}</div>
  <div class="sub-question">${sub_question}</div>
  <div class="choices">${choicesHtml}</div>
</body>
</html>`;
}

// ─────────────────────────────────────────────
// TikZ graph via Kroki API (SVG image)
// ─────────────────────────────────────────────

function TikzGraph({ code, caption }: { code: string; caption?: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    setState("loading");
    try {
      setUrl(buildTikzUrl(code));
    } catch {
      setState("error");
    }
  }, [code]);

  return (
    <div className="w-full">
      <div className="relative w-full min-h-[220px] bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex items-center justify-center">
        {state === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/80 backdrop-blur-sm z-10">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-xs font-medium text-slate-400">그래프 생성 중...</span>
          </div>
        )}
        {state === "error" && (
          <div className="flex flex-col items-center gap-2 text-slate-400 p-6">
            <AlertCircle className="w-6 h-6" />
            <span className="text-xs">그래프를 불러오지 못했습니다.</span>
          </div>
        )}
        {url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt="Graph"
            className="max-w-full h-auto p-3"
            style={{ opacity: state === "ok" ? 1 : 0, transition: "opacity 0.4s" }}
            onLoad={() => setState("ok")}
            onError={() => setState("error")}
          />
        )}
      </div>
      {caption && (
        <p className="text-center text-xs text-slate-400 mt-2 italic">{caption}</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main exported component
// ─────────────────────────────────────────────

interface ProblemViewerProps {
  problem: ServerProblem;
}

export function ProblemViewer({ problem }: ProblemViewerProps) {
  const [mathHeight, setMathHeight] = useState(200);
  const [mathLoading, setMathLoading] = useState(true);

  // Listen for iframe height messages
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "problem-height" && typeof e.data.height === "number") {
        setMathHeight(e.data.height + 16);
        setMathLoading(false);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  // Reset on problem change
  useEffect(() => {
    setMathLoading(true);
    setMathHeight(200);
  }, [problem]);

  const viz = problem.visualization;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Problem text panel */}
      <div
        className="relative w-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300"
        style={{ minHeight: mathHeight }}
      >
        {mathLoading && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-white/80 z-10">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="text-sm text-slate-400 font-medium">문제 렌더링 중...</span>
          </div>
        )}
        <iframe
          className="w-full border-none block"
          style={{ height: mathHeight }}
          srcDoc={buildMathHtml(problem)}
          sandbox="allow-scripts"
          onLoad={() => setTimeout(() => setMathLoading(false), 3500)}
        />
      </div>

      {/* TikZ visualization */}
      {viz?.engine === "tikz" && (
        <TikzGraph code={viz.code} caption={viz.caption} />
      )}
    </div>
  );
}
