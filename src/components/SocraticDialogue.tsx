"use client";

import { useState, useEffect, useRef } from "react";
import { SocraticCharacter } from "./SocraticCharacter";
import { TypingIndicator } from "./TypingIndicator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Lightbulb, Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

type Message = {
  id: string;
  role: "tutor" | "user";
  content: string;
  image?: string;
};

type SocraticDialogueProps = {
  onProgress?: (progress: number) => void;
  logicSteps: string[];
  hints: string[];
};

export function SocraticDialogue({ onProgress, logicSteps, hints }: SocraticDialogueProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "tutor", content: logicSteps[0] || "Let's solve this problem." },
  ]);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Reset dialogue state if a new problem is selected
  useEffect(() => {
    setStep(0);
    setMessages([{ id: Date.now().toString(), role: "tutor", content: logicSteps[0] || "Let's solve this problem." }]);
    setIsTyping(false);
    setInput("");
    setSelectedImage(null);
  }, [logicSteps]);

  // Report progress based on logical steps
  useEffect(() => {
    if (onProgress) {
      const maxSteps = Math.max(1, logicSteps.length - 1);
      const progressPercent = Math.round((step / maxSteps) * 100);
      onProgress(progressPercent);
    }
  }, [step, logicSteps, onProgress]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSend = () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      image: selectedImage || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSelectedImage(null);
    setIsTyping(true);

    // Simulate backend thinking time for Socratic response
    setTimeout(() => {
      setIsTyping(false);
      const nextStep = Math.min(step + 1, logicSteps.length - 1);
      setStep(nextStep);
      
      const tutorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "tutor",
        content: nextStep === step 
          ? "You've already finished this problem! Want to try another?" 
          : logicSteps[nextStep],
      };
      
      setMessages((prev) => [...prev, tutorMessage]);
    }, 1500);
  };

  const requestHint = () => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "tutor", content: `💡 Hint: ${hints[step] || "No more hints available."}` }
    ]);
  };

  // Utility to render text that might contain KaTeX math formulas roughly
  const renderContent = (text: string) => {
    const parts = text.split(/(\$[^\$]+\$)/g);
    return parts.map((part, i) => {
      if (part.startsWith("$") && part.endsWith("$")) {
        return <InlineMath key={i} math={part.slice(1, -1)} />;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border overflow-hidden">
      {/* Active Dialogue Area */}
      <ScrollArea className="flex-1 min-h-0 p-6">
        <div className="space-y-6 flex flex-col pb-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                {msg.role === "tutor" && <SocraticCharacter />}
                <div
                  className={`p-4 rounded-2xl text-[15px] leading-relaxed flex flex-col gap-2 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted/50 text-foreground rounded-tl-sm border"
                  }`}
                >
                  {msg.image && (
                    <img 
                      src={msg.image} 
                      alt="Uploaded attachment" 
                      className="max-w-[240px] w-full rounded-xl object-contain border border-black/10 bg-white/50" 
                    />
                  )}
                  {msg.content && <div>{renderContent(msg.content)}</div>}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-4 w-fit"
            >
              <SocraticCharacter />
              <TypingIndicator />
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-muted/20 border-t flex flex-col gap-3">
        {selectedImage && (
          <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-primary/20 bg-white group shadow-sm shrink-0">
            <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={requestHint}
            className="shrink-0 text-amber-500 hover:text-amber-600 hover:bg-amber-50 border-amber-200"
            title="Get a Hint"
          >
            <Lightbulb className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="shrink-0 text-slate-500 hover:text-primary hover:bg-primary/5 border-slate-200"
            title="Upload Image"
          >
            <ImageIcon className="w-5 h-5" />
          </Button>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleImageSelect} 
            className="hidden" 
          />
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={selectedImage ? "Add an optional message..." : "Type your response..."}
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-[15px]"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={(!input.trim() && !selectedImage) || isTyping}
              className="absolute right-1 top-1 bottom-1 h-auto rounded-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
