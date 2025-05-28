"use client";

import SelectableCardRadio from "@/components/SelectableCardRadio"; // adjust path as needed

const options = [
  {
    key: "One-Time",
    description: "Send a notification on a particular date and time.",
  },
  {
    key: "Recurring",
    description: "Send a notification on a recurring basis.",
  },
  {
    key: "Multiple Days",
    description: "Schedule a notification to be sent on multiple dates and times.",
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
      <h3 className="text-md font-bold text-black">Notification Type</h3>

      <div className="flex flex-col gap-3 mt-2">
        {options.map(({ key, description }) => (
          <SelectableCardRadio
            key={key}
            selected={selectedType === key}
            onClick={() => handleSelect(key)}
            title={key}
            description={description}
          />
        ))}
      </div>
    </div>
  );
}
