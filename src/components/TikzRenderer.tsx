"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { buildTikzUrl } from "@/lib/krokiUtils";

export function TikzRenderer({ tikzCode }: { tikzCode: string }) {
  const [svgUrl, setSvgUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const url = buildTikzUrl(tikzCode);
      setSvgUrl(url);
    } catch (e) {
      console.error("Failed to encode Kroki string", e);
      setLoading(false);
    }
  }, [tikzCode]);

  return (
    <div className="relative w-full min-h-[200px] flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden p-6">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-2 z-10 bg-white/50 backdrop-blur-sm transition-opacity duration-300">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-sm font-medium">Generating graph...</span>
        </div>
      )}

      {svgUrl && (
        <img
          src={svgUrl}
          alt="TikZ Graph Visualization"
          className={`max-w-full h-auto transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      )}
    </div>
  );
}
