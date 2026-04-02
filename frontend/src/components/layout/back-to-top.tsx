"use client";

import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UI_CONSTANTS } from "@/lib/constants";

import { BackToTopProps } from "@/lib/interfaces";

export default function BackToTop({ show, onClick }: BackToTopProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={onClick}
          className={`fixed bottom-8 right-8 ${UI_CONSTANTS.BACK_TO_TOP.STYLE}`}
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
