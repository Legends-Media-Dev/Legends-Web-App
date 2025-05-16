"use client";

export default function StepNavigation({ steps, currentStep, completedSteps }) {
  return (
    <div className="flex items-center justify-between px-1">
      {steps.map((label, idx) => {
        const isCurrent = idx === currentStep;
        const isCompleted = completedSteps.includes(idx);

        const circleClass = isCompleted
          ? "bg-green-600 text-white"
          : isCurrent
          ? "bg-gray-800 text-white"
          : "border border-gray-400 text-gray-600";

        return (
          <div className="flex items-center flex-1" key={label}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${circleClass}`}
            >
              {idx + 1}
            </div>
            {idx !== steps.length - 1 && (
              <div className="flex-1 h-px bg-gray-300 mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
}
