"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface LatexProblemRendererProps {
  latexCode: string;
}

// Build a self-contained HTML document that renders LaTeX via MathJax.
// Handles exam-style LaTeX commands like \noindent, \vspace, \textbf, \hfill,
// \begin{enumerate}[label=①], \dfrac, \sqrt, etc.
function buildHtml(latex: string): string {
  // Convert common LaTeX document commands to HTML equivalents
  let html = latex
    // Preserve line breaks
    .replace(/\r\n/g, "\n")
    // \noindent → just text (no indent)
    .replace(/\\noindent\s*/g, "")
    // \vspace{...} → a spacer div
    .replace(/\\vspace\{[^}]+\}/g, '<div style="height:1.2em"></div>')
    // \textbf{...} → <strong>
    .replace(/\\textbf\{([^}]+)\}/g, "<strong>$1</strong>")
    // \hfill → push right
    .replace(/\\hfill/g, '<span style="float:right">')
    // \begin{enumerate}[label=...] ... \end{enumerate}
    .replace(/\\begin\{enumerate\}\[label=[^\]]*\]/g, '<ol style="list-style:none;padding-left:0;margin-top:0.8em">')
    .replace(/\\begin\{enumerate\}/g, '<ol style="margin-top:0.8em">')
    .replace(/\\end\{enumerate\}/g, "</ol>")
    // \item → list item
    .replace(/\\item\s*/g, "<li>")
    // \quad → spacer
    .replace(/\\quad/g, "&ensp;&ensp;")
    // Paragraph breaks
    .replace(/\n\n+/g, "<br><br>");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    html, body { margin: 0; padding: 0; font-size: 16px; font-family: 'Times New Roman', serif; color: #1e293b; background: transparent; overflow-x: hidden; }
    p, li { line-height: 1.8; }
    li { margin-bottom: 0.3em; }
    strong { font-weight: 700; }
    ol { padding-left: 1.5em; }
  </style>
  <script>
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$']],
        displayMath: [['$$','$$']],
        packages: {'[+]': ['ams']}
      },
      options: { skipHtmlTags: ['script','noscript','style','textarea'] },
      startup: {
        ready() {
          MathJax.startup.defaultReady();
          MathJax.startup.promise.then(() => {
            document.body.style.opacity = '1';
            // notify parent of rendered height
            window.parent.postMessage({ type: 'resize', height: document.body.scrollHeight }, '*');
          });
        }
      }
    };
  <\/script>
  <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"><\/script>
</head>
<body style="opacity:0;padding:0.1px 1rem 1rem;transition:opacity 0.3s;">
  ${html}
</body>
</html>`;
}

export function LatexProblemRenderer({ latexCode }: LatexProblemRendererProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [height, setHeight] = useState(200);

  useEffect(() => {
    setLoading(true);
    setHeight(200);
  }, [latexCode]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "resize" && typeof e.data.height === "number") {
        setHeight(e.data.height + 24);
        setLoading(false);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <div
      className="relative w-full bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300"
      style={{ minHeight: height }}
    >
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-3 z-10 bg-white/80 backdrop-blur-sm">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-sm font-medium text-slate-500">문제를 렌더링 중...</span>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="w-full border-none block"
        style={{ height, display: "block" }}
        srcDoc={buildHtml(latexCode)}
        sandbox="allow-scripts"
        onLoad={() => {
          // Fallback: show after 4s even if message not received
          setTimeout(() => setLoading(false), 4000);
        }}
      />
    </div>
  );
}
