"use client";

export default function StepDeliveryRecurring({ formData, setFormData }) {
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

  return (
    <div className="flex flex-col gap-6">
      {/* Start Date & Time */}
      <div className="w-full max-w-xs">
        <label className="text-sm font-bold text-gray-800 mb-1 block">
          Recurring Push Start Date
        </label>
        <input
          type="datetime-local"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={delivery.startDate || ""}
          onChange={(e) => updateDeliveryField("startDate", e.target.value)}
        />
      </div>

      {/* End Date Toggle */}
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <div
          className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out ${
            delivery.hasEndDate ? "bg-blue-500 justify-end" : "bg-gray-300 justify-start"
          }`}
          onClick={() => updateDeliveryField("hasEndDate", !delivery.hasEndDate)}
        >
          <div className="w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out" />
        </div>
        <span className="text-sm text-gray-800">Set End Date</span>
      </label>

      {/* End Date & Time */}
      {delivery.hasEndDate && (
        <div className="w-full max-w-xs pl-4">
          <input
            type="datetime-local"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={delivery.endDate || ""}
            onChange={(e) => updateDeliveryField("endDate", e.target.value)}
          />
        </div>
      )}

      {/* Notification Frequency */}
      <div>
        <label className="text-sm font-bold text-gray-800 mb-2 block">
          Notification Frequency
        </label>
        <div className="flex mx-auto w-full max-w-md rounded-md overflow-hidden border border-gray-300">
          {["daily", "weekly", "monthly"].map((freq) => {
            const isSelected = delivery.frequency === freq;
            const label = freq.charAt(0).toUpperCase() + freq.slice(1);

            return (
              <button
                key={freq}
                type="button"
                onClick={() => updateDeliveryField("frequency", freq)}
                className={`flex-1 text-sm py-2 px-4 text-center transition-colors ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Repeat Every */}
      <div className="w-full max-w-[160px]">
        <label className="text-sm font-bold text-gray-800 mb-1 block">
          Repeat for every
        </label>
        <div className="relative flex items-center">
          <input
            type="number"
            min={1}
            placeholder="1"
            className="w-full pr-12 text-center border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400"
            value={delivery.repeatEvery || ""}
            onChange={(e) => updateDeliveryField("repeatEvery", e.target.value)}
          />
          <span className="absolute right-3 text-sm text-gray-500">
            {delivery.frequency === "weekly"
              ? "weeks"
              : delivery.frequency === "monthly"
              ? "months"
              : "days"}
          </span>
        </div>
      </div>

      {/* Repeat At */}
      <div className="w-full max-w-[160px]">
        <label className="text-sm font-bold text-gray-800 mb-1 block">
          Repeat at
        </label>
        <div className="relative flex items-center">
          <input
            type="time"
            className="w-full pl-10 pr-3 border border-gray-300 rounded-md py-2 text-sm text-gray-700"
            value={delivery.repeatAt || ""}
            onChange={(e) => updateDeliveryField("repeatAt", e.target.value)}
          />
        </div>
      </div>

      {/* Late Behavior (always show now) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-800">
          What if the user is past the scheduled time?
        </label>
        <div className="flex flex-col gap-2 mt-1">
          {[
            {
              key: "dont-send",
              label: "Do not send the message",
            },
            {
              key: "send-next-day",
              label: "Deliver the message next day",
            },
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
    </div>
  );
}
