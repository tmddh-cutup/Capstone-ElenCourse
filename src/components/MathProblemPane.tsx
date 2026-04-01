"use client";

import { useState, useRef, useEffect } from "react";
import { BlockMath } from "react-katex";
import { Camera, Edit2, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TikzRenderer } from "./TikzRenderer";
import { LatexProblemRenderer } from "./LatexProblemRenderer";
import { ProblemViewer } from "./ProblemViewer";
import type { ServerProblem } from "@/lib/serverProblem";
import "katex/dist/katex.min.css";

type MathProblemPaneProps = {
  problemString: string;
  tikzString?: string;
  latexString?: string;
  serverProblem?: ServerProblem;
};

export function MathProblemPane({ problemString, tikzString, latexString, serverProblem }: MathProblemPaneProps) {
  const [mathString, setMathString] = useState(problemString);
  const [currentTikz, setCurrentTikz] = useState(tikzString);
  const [currentLatex, setCurrentLatex] = useState(latexString);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [editMathValue, setEditMathValue] = useState("");
  const [editTikzValue, setEditTikzValue] = useState("");
  const [editLatexValue, setEditLatexValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMathString(problemString);
    setCurrentTikz(tikzString);
    setCurrentLatex(latexString);
  }, [problemString, tikzString, latexString]);

  const startEditing = () => {
    setEditMathValue(mathString);
    setEditTikzValue(currentTikz || "");
    setEditLatexValue(currentLatex || "");
    setIsEditing(true);
  };

  const saveEdit = () => {
    setMathString(editMathValue);
    setCurrentTikz(editTikzValue || undefined);
    setCurrentLatex(editLatexValue || undefined);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const processFile = (file: File) => {
    setIsUploading(true);
    setTimeout(() => {
      // Mock result of the OCR for demonstration
      setMathString("\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}");
      setIsUploading(false);
      
      // Reset input so the same file could be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const dragCounter = useRef(0);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    }
  };

  return (
    <div 
      className={`flex flex-col h-full rounded-2xl p-6 shadow-inner relative overflow-hidden transition-all duration-200 border-2 ${isDragging ? "border-primary bg-primary/5 border-dashed" : "bg-slate-50 border-transparent"}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 z-50 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="bg-white px-8 py-6 rounded-2xl shadow-xl flex flex-col items-center gap-4 text-primary border border-primary/20">
            <Camera className="w-12 h-12 animate-bounce" />
            <p className="font-bold text-lg tracking-tight">Drop image to upload</p>
          </div>
        </div>
      )}
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-tr-full pointer-events-none" />
      
      <div className="flex w-full justify-between items-center mb-4 z-10 flex-shrink-0">
        <h2 className="text-base font-semibold text-slate-500 tracking-wide">
          Current Problem
        </h2>
        
        {/* Actions Menu */}
        <div className="flex gap-2">
          {!isEditing && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={triggerUpload}
                disabled={isUploading}
                className="text-slate-600 bg-white"
              >
                {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Camera className="w-4 h-4 mr-2" />}
                {isUploading ? "Scanning..." : "Upload Photo"}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={startEditing}
                disabled={isUploading}
                className="text-slate-600 bg-white"
                title="Edit Math LaTeX"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Hidden File Input for the Camera/Upload */}
      <input 
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />
      
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto min-h-0 w-full z-10 pr-1">
      <div className="bg-white flex items-start justify-center p-5 sm:p-7 rounded-2xl shadow-sm border border-slate-100 w-full text-center font-serif text-2xl relative flex-col">
        {isUploading ? (
          <div className="flex flex-col items-center text-slate-400 font-sans text-base">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-primary" />
            <p>Analyzing problem image...</p>
          </div>
        ) : isEditing ? (
          <div className="w-full flex flex-col font-sans text-left">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Math Formula (LaTeX)</label>
            <textarea
              className="w-full p-3 border rounded-lg text-lg min-h-[80px] outline-none focus:ring-2 focus:ring-primary/50 text-slate-700 font-mono mb-4"
              value={editMathValue}
              onChange={(e) => setEditMathValue(e.target.value)}
              placeholder="Enter LaTeX math code..."
            />
            
            {currentTikz !== undefined && (
              <>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">TikZ Graph Variables & Code</label>
                <textarea
                  className="w-full p-4 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50 text-slate-700 font-mono bg-slate-50/50"
                  style={{ minHeight: "220px" }}
                  value={editTikzValue}
                  onChange={(e) => setEditTikzValue(e.target.value)}
                  placeholder="Enter TikZ code..."
                  spellCheck={false}
                />
              </>
            )}

            {currentLatex !== undefined && (
              <>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">LaTeX Problem Code</label>
                <textarea
                  className="w-full p-4 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/50 text-slate-700 font-mono bg-slate-50/50"
                  style={{ minHeight: "280px" }}
                  value={editLatexValue}
                  onChange={(e) => setEditLatexValue(e.target.value)}
                  placeholder="Enter full LaTeX problem code..."
                  spellCheck={false}
                />
              </>
            )}

            <div className="flex justify-end gap-3 mt-5">
              <Button variant="ghost" size="sm" onClick={cancelEdit} className="text-slate-500 hover:bg-slate-100">
                <X className="w-4 h-4 mr-1" /> Cancel
              </Button>
              <Button variant="default" size="sm" onClick={saveEdit} className="shadow-md">
                <Check className="w-4 h-4 mr-1" /> Render Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-5">
            {/* Priority: serverProblem > latexString > plain KaTeX */}
            {serverProblem ? (
              <div className="w-full">
                <ProblemViewer problem={serverProblem} />
              </div>
            ) : currentLatex ? (
              <div className="w-full">
                <LatexProblemRenderer latexCode={currentLatex} />
              </div>
            ) : (
              <div className="w-full overflow-x-auto pb-2">
                <BlockMath math={mathString} />
              </div>
            )}

            {/* TikZ graph (only shown if there's no serverProblem — it handles its own viz) */}
            {!serverProblem && currentTikz && (
              <div className="w-full transition-all duration-300">
                <TikzRenderer tikzCode={currentTikz} />
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
