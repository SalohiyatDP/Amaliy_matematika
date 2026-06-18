import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number; // 0..1
  className?: string;
  color?: string;
  showLabel?: boolean;
  height?: number;
}

export default function ProgressBar({
  value,
  className = "",
  color = "bg-gradient-to-r from-brand-500 to-accent-400",
  showLabel = false,
  height = 10,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="relative w-full overflow-hidden rounded-full bg-ink-200 dark:bg-ink-800"
        style={{ height }}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
      {showLabel && (
        <span className="w-10 shrink-0 text-right text-sm font-semibold tabular-nums">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
