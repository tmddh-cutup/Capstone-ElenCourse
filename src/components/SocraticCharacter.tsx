"use client";

import { motion } from "framer-motion";

type SocraticCharacterProps = {
  type?: "philos" | "crow";
};

export function SocraticCharacter({ type = "philos" }: SocraticCharacterProps) {
  const isCrow = type === "crow";

  return (
    <div
      className={`w-16 h-16 border-[3px] rounded-full flex items-center justify-center shrink-0 overflow-hidden shadow-md ${isCrow ? "bg-[#d8d8d8] border-amber-400/40" : "bg-white border-primary/20"
        }`}
    >
      <motion.img
        src={isCrow ? "/crow.png" : "/philos.png"}
        alt={`${isCrow ? "Crow" : "Philos"} Avatar`}
        className={`w-[120%] h-[120%] max-w-none object-cover origin-bottom ${isCrow ? "mt-4" : "mt-4"}`}
        animate={isCrow ? {
          y: [0, -8, 0, 0, -4, 0, 0, 0],
          rotate: [0, 8, 0, 0, -5, 0, 0, 0],
          scale: 1
        } : {
          y: [-1, -3, -1],
          scale: [1, 1.02, 1]
        }}
        transition={isCrow ? {
          duration: 3,
          repeat: 0,
          times: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.5, 1],
          ease: "easeInOut"
        } : {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
