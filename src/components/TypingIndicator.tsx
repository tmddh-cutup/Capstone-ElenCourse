"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex space-x-1.5 p-4 bg-muted/50 rounded-2xl w-fit items-center h-[42px]">
      <motion.div
        className="w-2 h-2 bg-primary/60 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="w-2 h-2 bg-primary/60 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.div
        className="w-2 h-2 bg-primary/60 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
    </div>
  );
}
