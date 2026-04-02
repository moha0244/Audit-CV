"use client";

import { Badge } from "@/components";
import { UI_CONSTANTS } from "@/lib/constants";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ, FAQSectionProps } from "@/lib/interfaces";

const defaultFaqs: readonly FAQ[] = UI_CONSTANTS.FAQ.QUESTIONS;

export default function FAQSection({ faqs = [...defaultFaqs] }: FAQSectionProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary">FAQ</Badge>
          <h2 className="text-3xl font-bold text-slate-900 mt-4 mb-4">
            {UI_CONSTANTS.FAQ.TITLE}
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-slate-800">
                  {faq.question}
                </span>
                {activeFaq === idx ? (
                  <ChevronUp size={20} className="text-blue-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
