"use client";

import { UI_CONSTANTS } from "@/lib/constants";
import { HowItWorksStep, HowItWorksSectionProps } from "@/lib/interfaces";
import { Badge } from "@/components";
import { Step } from "@/components/progress";
import { Upload, Search, BarChart3, Clock } from "lucide-react";
import { motion } from "framer-motion";

const defaultSteps: HowItWorksStep[] = UI_CONSTANTS.HOW_IT_WORKS.STEPS.map((step, index) => {
  const iconElements = [
    <Upload key="upload" className="text-blue-500" />,
    <Search key="search" className="text-blue-500" />,
    <BarChart3 key="chart" className="text-blue-500" />
  ];
  return {
    icon: iconElements[index],
    ...step
  };
}) as HowItWorksStep[];

export default function HowItWorksSection({ steps = defaultSteps }: HowItWorksSectionProps) {
  return (
    <section className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="warning" icon={Clock}>
            {UI_CONSTANTS.HOW_IT_WORKS.BADGE_TEXT}
          </Badge>
          <h2 className="text-2xl font-bold text-center text-slate-900 mt-4">
            {UI_CONSTANTS.HOW_IT_WORKS.TITLE}
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Step
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
