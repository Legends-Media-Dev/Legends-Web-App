"use client";

import SelectableCardRadio from "@/components/SelectableCardRadio";

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
        <div className="flex mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-md overflow-hidden border border-gray-300">
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

      {/* Timezone Selection */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-gray-800">
          When should this be delivered?
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          {[
            {
              key: "fixed",
              title: "Send at same time to all users",
              description: "Everyone receives it at the same global time.",
            },
            {
              key: "local",
              title: "Send in user’s local timezone",
              description:
                "Each user receives it at the same time of day in their timezone.",
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

      {/* Late Behavior */}
      {delivery.timezoneMode === "local" && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-800">
            What if the user is past the scheduled time?
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            {[
              {
                key: "dont-send",
                title: "Do not send",
                description:
                  "Skip the notification if the time has already passed.",
              },
              {
                key: "send-next-day",
                title: "Send next day",
                description:
                  "Deliver the message at the same time the following day.",
              },
            ].map(({ key, title, description }) => (
              <SelectableCardRadio
                key={key}
                name="lateBehavior"
                value={key}
                selected={delivery.lateBehavior === key}
                onClick={() => updateDeliveryField("lateBehavior", key)}
                title={title}
                description={description}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
