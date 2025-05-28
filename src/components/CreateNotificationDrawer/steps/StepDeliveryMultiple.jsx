"use client";

import { FiX } from "react-icons/fi";
import SelectableCardRadio from "@/components/SelectableCardRadio"; // adjust this import if needed

export default function StepDeliveryMultiple({ formData, setFormData }) {
  const delivery = formData.delivery || {};

  const updateDeliveryField = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      delivery: {
        ...(prev.delivery || {}),
        [key]: value,
      },
    }));
  };

  const handleAddDateTime = () => {
    const current = delivery.multipleDates || [];
    updateDeliveryField("multipleDates", [...current, ""]);
  };

  const handleChangeDateTime = (index, value) => {
    const updated = [...(delivery.multipleDates || [])];
    updated[index] = value;
    updateDeliveryField("multipleDates", updated);
  };

  const handleRemoveDateTime = (index) => {
    const updated = [...(delivery.multipleDates || [])];
    updated.splice(index, 1);
    updateDeliveryField("multipleDates", updated);
  };

  const multipleDates = delivery.multipleDates || [];

  return (
    <div className="flex flex-col gap-6">
      {/* Scheduled Time Inputs */}
      <div className="flex items-center gap-2 max-w-xs w-full">
        <input
          type="datetime-local"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={multipleDates[0] || ""}
          onChange={(e) => handleChangeDateTime(0, e.target.value)}
        />
        <span className="w-[18px]" />
      </div>

      {multipleDates.slice(1).map((dt, i) => (
        <div key={i + 1} className="flex items-center gap-2 max-w-xs w-full">
          <input
            type="datetime-local"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={dt}
            onChange={(e) => handleChangeDateTime(i + 1, e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleRemoveDateTime(i + 1)}
            className="text-gray-500 hover:text-red-500 mt-0.5"
            aria-label="Remove Date"
          >
            <FiX size={18} />
          </button>
        </div>
      ))}

      {/* Add More */}
      <button
        type="button"
        onClick={handleAddDateTime}
        className="text-xs text-blue-600 hover:text-blue-800 hover:opacity-80 w-fit transition"
      >
        + Add More
      </button>

      {/* Timezone Selection */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-bold text-gray-800 mb-1 block">Timezone</label>
          <div className="flex flex-col sm:flex-row gap-4">
            {[
              {
                key: "fixed",
                title: "Send at the same time to all users",
                description: "All users receive the notification at the exact same moment globally.",
              },
              {
                key: "local",
                title: "Send in user’s local timezone",
                description: "Each user receives it at the same local time based on their device.",
              },
            ].map(({ key, title, description }) => (
              <SelectableCardRadio
                key={key}
                name="timezoneMode"
                value={key}
                selected={delivery.timezoneMode === key}
                onClick={() => updateDeliveryField("timezoneMode", key)}
                title={title}
                description={description}
              />
            ))}
          </div>
        </div>

        {/* Late Behavior (only if local timezone selected) */}
        {delivery.timezoneMode === "local" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-800">
              What if the user is past the scheduled time?
            </label>
            <div className="flex flex-col gap-2 mt-1">
              {[
                { key: "dont-send", label: "Do not send the message" },
                { key: "send-next-day", label: "Deliver the message next day" },
              ].map(({ key, label }) => {
                const selected = delivery.lateBehavior === key;
                return (
                  <label key={key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="lateBehavior"
                      value={key}
                      checked={selected}
                      onChange={() => updateDeliveryField("lateBehavior", key)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-800">{label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Expiration Time */}
      <div>
        <h4 className="text-sm font-bold text-gray-800 mb-1">Expiration Time</h4>
        <p className="text-xs text-gray-500 mb-2">
          Set how long to retry sending if the notification initially fails.
        </p>

        <div className="flex items-center gap-4">
          {/* Days */}
          <div className="relative w-full max-w-[110px]">
            <input
              type="number"
              min={1}
              placeholder="1"
              className="w-full pr-14 text-center border border-gray-300 rounded-md px-3 py-[10px] text-sm placeholder-gray-400"
              value={delivery.expireDays || ""}
              onChange={(e) => updateDeliveryField("expireDays", e.target.value)}
            />
            <span className="absolute right-3 inset-y-0 flex items-center text-sm text-gray-500 pointer-events-none">
              days
            </span>
          </div>

          {/* Hours */}
          <div className="relative w-full max-w-[110px]">
            <input
              type="number"
              min={1}
              max={23}
              placeholder="1"
              className="w-full pr-14 text-center border border-gray-300 rounded-md px-3 py-[10px] text-sm placeholder-gray-400"
              value={delivery.expireHours || ""}
              onChange={(e) => updateDeliveryField("expireHours", e.target.value)}
            />
            <span className="absolute right-3 inset-y-0 flex items-center text-sm text-gray-500 pointer-events-none">
              hours
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
