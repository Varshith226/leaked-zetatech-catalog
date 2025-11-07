import { useEffect, useState } from "react";

const TraceWidget = () => {
  const [tracePercent, setTracePercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTracePercent((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (tracePercent / 100) * circumference;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative w-[100px] h-[100px]">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="hsl(var(--border))"
            strokeWidth="4"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="hsl(var(--warning-red))"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300"
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[10px] font-terminal text-destructive">TRACE:</div>
          <div className="text-xl font-terminal text-destructive font-bold">
            {tracePercent}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraceWidget;
