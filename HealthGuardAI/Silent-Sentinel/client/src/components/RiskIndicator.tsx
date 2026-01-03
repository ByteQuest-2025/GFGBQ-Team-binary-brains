import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RiskIndicatorProps {
  score: number;
  className?: string;
}

export function RiskIndicator({ score, className }: RiskIndicatorProps) {
  // Determine color and label based on risk score
  let colorClass = "text-green-500 bg-green-50 border-green-200";
  let label = "Low Risk";
  let gradient = "from-green-500 to-emerald-400";

  if (score >= 40 && score < 70) {
    colorClass = "text-orange-500 bg-orange-50 border-orange-200";
    label = "Moderate Risk";
    gradient = "from-orange-500 to-amber-400";
  } else if (score >= 70) {
    colorClass = "text-red-500 bg-red-50 border-red-200";
    label = "High Risk";
    gradient = "from-red-500 to-rose-400";
  }

  return (
    <div className={cn("flex flex-col items-center justify-center p-6", className)}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative mb-4"
      >
        {/* Outer Ring */}
        <div className="w-40 h-40 rounded-full border-8 border-slate-100 flex items-center justify-center relative">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              className="text-slate-100"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="70"
              cx="80"
              cy="80"
            />
            <motion.circle
              className={cn("drop-shadow-lg", score >= 70 ? "text-red-500" : score >= 40 ? "text-orange-500" : "text-green-500")}
              strokeWidth="8"
              strokeDasharray={440}
              strokeDashoffset={440}
              animate={{ strokeDashoffset: 440 - (440 * score) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="70"
              cx="80"
              cy="80"
            />
          </svg>
          
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-slate-800">{score}%</span>
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 mt-1">Risk Score</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={cn(
          "px-4 py-1.5 rounded-full text-sm font-bold border shadow-sm",
          colorClass
        )}
      >
        {label}
      </motion.div>
    </div>
  );
}
