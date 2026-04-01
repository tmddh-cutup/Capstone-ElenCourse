"use client";

import { motion } from "framer-motion";

export function SocraticCharacter() {
  return (
    <div
      className="w-12 h-12 bg-primary/10 text-primary border-2 border-primary/20 rounded-full flex items-center justify-center shrink-0"
    >
      {/* TODO: Add minimalist Greek philosopher Logo inside here */}
      <motion.span
        className="font-semibold text-sm"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        Philos
      </motion.span>
    </div>
  );
}
