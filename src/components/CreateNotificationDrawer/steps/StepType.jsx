"use client";

const options = [
  {
    key: "One-Time",
    description: "Send a notification on a particular date and time.",
  },
  {
    key: "Automated",
    description: "Allows you to send a notification per user request periodically.",
  },
  {
    key: "Recurring",
    description: "Send a notification on a recurring basis.",
  },
  {
    key: "Multiple Days",
    description: "Schedule a notification to be sent on multiple dates and times.",
  },
  {
    key: "API",
    description: "Send a transactional notification via API.",
  },
];

export default function StepType({ formData, setFormData }) {
  const selectedType = formData.type;

  const handleSelect = (key) => {
    setFormData((prev) => ({
      ...prev,
      type: key,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-gray-800">Notification Type</h3>

      <div className="flex flex-col gap-3 mt-2">
        {options.map(({ key, description }) => {
          const isSelected = selectedType === key;

          return (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`flex justify-between items-center border rounded-md px-4 py-3 text-left transition-all ${
                isSelected
                  ? "border-gray-800 bg-gray-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Circle indicator */}
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    isSelected ? "bg-gray-800 border-gray-800" : "border-gray-400"
                  }`}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">{key}</span>
                  <span className="text-xs text-gray-500">{description}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
