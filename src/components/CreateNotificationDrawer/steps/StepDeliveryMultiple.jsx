"use client";

import { FiX } from "react-icons/fi";

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

  return (
    <div className="flex flex-col gap-6">
      {/* Multiple Date/Time Inputs */}
      <div className="flex flex-col gap-3">
        {(delivery.multipleDates || []).map((dt, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="datetime-local"
              className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={dt}
              onChange={(e) => handleChangeDateTime(i, e.target.value)}
            />
            <button
              type="button"
              onClick={() => handleRemoveDateTime(i)}
              className="text-gray-500 hover:text-red-500 mt-0.5"
              aria-label="Remove Date"
            >
              <FiX size={18} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDateTime}
          className="text-sm text-blue-600 hover:underline w-fit mt-1"
        >
          + Add More
        </button>
      </div>

      {/* Timezone Selection */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-800">Timezone</label>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={delivery.timezoneMode || ""}
          onChange={(e) => updateDeliveryField("timezoneMode", e.target.value)}
        >
          <option value="">Select timezone mode...</option>
          <option value="fixed">Send at same time to all users</option>
          <option value="local">Deliver in user’s local timezone</option>
        </select>
      </div>

      {/* Late Behavior */}
      {delivery.timezoneMode === "local" && (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-gray-800">
            If user is past the scheduled time
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={delivery.lateBehavior || ""}
            onChange={(e) => updateDeliveryField("lateBehavior", e.target.value)}
          >
            <option value="">Select behavior...</option>
            <option value="dont-send">Don’t send</option>
            <option value="send-next-day">Send next day at same time</option>
          </select>
        </div>
      )}

      {/* Expiration Time */}
      <div>
        <h4 className="text-sm font-bold text-gray-800 mb-1">Expiration Time</h4>
        <p className="text-xs text-gray-500 mb-2">
          Set how long to retry sending if the notification initially fails.
        </p>
        <div className="flex items-center gap-4">
          <input
            type="number"
            min={0}
            placeholder="Days"
            className="w-24 border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400"
            value={delivery.expireDays || ""}
            onChange={(e) => updateDeliveryField("expireDays", e.target.value)}
          />
          <input
            type="number"
            min={0}
            max={23}
            placeholder="Hours"
            className="w-24 border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400"
            value={delivery.expireHours || ""}
            onChange={(e) => updateDeliveryField("expireHours", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
