"use client";

import { useState } from "react";

export default function StepDelivery({ formData, setFormData }) {
  const isScheduled = formData.deliveryMethod === "scheduled";

  const handleMethodSelect = (method) => {
    setFormData((prev) => ({
      ...prev,
      deliveryMethod: method,
    }));
  };

  const updateDeliveryField = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      delivery: {
        ...(prev.delivery || {}),
        [key]: value,
      },
    }));
  };

  const delivery = formData.delivery || {};

  return (
    <div className="flex flex-col gap-6">
      {/* Delivery Method Selection */}
      <div>
        <h3 className="text-md font-bold text-black mb-2">Delivery</h3>
        <div className="flex gap-4">
          {/* Send Now */}
          <button
            onClick={() => handleMethodSelect("now")}
            className={`flex-1 border rounded-md px-4 py-3 text-left transition-all
              ${formData.deliveryMethod === "now" ? "border-blue-600 bg-blue-50" : "border-gray-300"}
            `}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 ${
                  formData.deliveryMethod === "now"
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-400"
                }`}
              />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-800">Send now</span>
                <span className="text-xs text-gray-500 leading-snug">
                  Send the push notification immediately, once composition is complete.
                </span>
              </div>
            </div>
          </button>

          {/* Schedule Later */}
          <button
            onClick={() => handleMethodSelect("scheduled")}
            className={`flex-1 border rounded-md px-4 py-3 text-left transition-all
              ${formData.deliveryMethod === "scheduled" ? "border-blue-600 bg-blue-50" : "border-gray-300"}
            `}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 ${
                  formData.deliveryMethod === "scheduled"
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-400"
                }`}
              />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-800">Schedule for later</span>
                <input
                  type="datetime-local"
                  className="mt-1 text-sm border border-gray-300 rounded-md px-2 py-1 w-full"
                  value={delivery.scheduleTime || ""}
                  onChange={(e) => updateDeliveryField("scheduleTime", e.target.value)}
                />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Conditional Section Based on Method */}
      {formData.deliveryMethod === "scheduled" && (
        <div className="flex flex-col gap-4">
          {/* Timezone */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Timezone</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={delivery.timezoneMode || ""}
              onChange={(e) => updateDeliveryField("timezoneMode", e.target.value)}
            >
              <option value="">Select...</option>
              <option value="fixed">Send at same time to all users</option>
              <option value="local">Deliver in user’s local timezone</option>
            </select>
          </div>

          {/* Fallback if timezone = local */}
          {delivery.timezoneMode === "local" && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
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
        </div>
      )}

      {/* Expiration Time */}
      <div className="mt-2">
        <h4 className="text-sm font-medium text-gray-800 mb-1">Expiration Time</h4>
        <p className="text-xs text-gray-500 mb-2">
          Set expiration time for message sending
        </p>
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <label className="text-xs text-gray-600">Days</label>
            <input
              type="number"
              min={0}
              className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm"
              value={delivery.expireDays || ""}
              onChange={(e) => updateDeliveryField("expireDays", e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-600">Hours</label>
            <input
              type="number"
              min={0}
              max={23}
              className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm"
              value={delivery.expireHours || ""}
              onChange={(e) => updateDeliveryField("expireHours", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
