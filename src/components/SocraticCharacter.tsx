"use client";

import { motion } from "framer-motion";

export function SocraticCharacter() {
  return (
    <div
      className="w-16 h-16 bg-white border-[3px] border-primary/20 rounded-full flex items-center justify-center shrink-0 overflow-hidden shadow-md"
    >
      <motion.img
        src="/philos.png"
        alt="Philos Avatar"
        className="w-[130%] h-[130%] max-w-none object-cover mt-2 origin-bottom"
        animate={{ 
          y: [0, -2, 0],
          rotate: [-1, 1.5, -1],
          scale: [1, 1.02, 1] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    </div>
  );
}
