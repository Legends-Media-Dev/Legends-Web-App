"use client";

import SelectableCardRadio from "@/components/SelectableCardRadio";

export default function StepDeliveryOneTime({ formData, setFormData }) {
  const delivery = formData.delivery || {};
  const method = formData.deliveryMethod || "";

  const updateDeliveryField = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      delivery: {
        ...(prev.delivery || {}),
        [key]: value,
      },
    }));
  };

  const handleMethodSelect = (method) => {
    setFormData((prev) => ({
      ...prev,
      deliveryMethod: method,
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Delivery Method */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-4">
          {[
            {
              key: "now",
              title: "Send now",
              description: "Send the push notification immediately after composing.",
            },
            {
              key: "scheduled",
              title: "Schedule for later",
              description: "Choose a specific date and time for delivery.",
            },
          ].map(({ key, title, description }) => (
            <SelectableCardRadio
              key={key}
              name="deliveryMethod"
              value={key}
              selected={method === key}
              onClick={() => handleMethodSelect(key)}
              title={title}
              description={description}
            />
          ))}
        </div>
      </div>

      {/* Scheduled Time Input */}
      {method === "scheduled" && (
        <div className="w-full sm:w-1/2">
          <label className="text-sm font-bold text-gray-800 mb-1 block">Scheduled Time</label>
          <input
            type="datetime-local"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={delivery.scheduleTime || ""}
            onChange={(e) => updateDeliveryField("scheduleTime", e.target.value)}
          />
        </div>
      )}

      {/* Timezone Selection */}
      {method === "scheduled" && (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-gray-800 mb-1 block">Timezone</label>
            <div className="flex flex-col sm:flex-row gap-4">
              {[
                {
                  key: "fixed",
                  title: "Send at the same time to all users",
                  description:
                    "All users receive the notification at the exact same moment globally.",
                },
                {
                  key: "local",
                  title: "Send in user’s local timezone",
                  description:
                    "Each user receives it at the same local time based on their device.",
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
          )}
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
