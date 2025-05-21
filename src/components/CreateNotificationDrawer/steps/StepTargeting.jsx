"use client";

import { useState } from "react";

const availableLocations = ["Los Angeles", "New York", "Chicago", "Miami"];
const availableTags = ["active-sub", "vip-gold", "vip-silver", "vip-platinum"];
const orderDateOptions = ["Last 7 days", "Last 30 days", "Last 90 days"];

export default function StepTargeting({ formData, setFormData }) {
  const pushUserCount = 1248; // placeholder

  const togglePlatform = (platform) => {
    const current = formData.platforms || [];
    const exists = current.includes(platform);
    const updated = exists
      ? current.filter((p) => p !== platform)
      : [...current, platform];

    setFormData((prev) => ({ ...prev, platforms: updated }));
  };

  const selectTargeting = (value) => {
    setFormData((prev) => ({ ...prev, targeting: value }));
  };

  const updateSegmentationField = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      segmentation: {
        ...(prev.segmentation || {}),
        [key]: value,
      },
    }));
  };

  const isPlatformSelected = (platform) =>
    (formData.platforms || []).includes(platform);

  const selectedSegmentation = formData.segmentation || {};

  return (
    <div className="flex flex-col gap-6">
      {/* Platforms */}
      <div>
        <h3 className="text-md font-bold text-black mb-2">Platforms</h3>
        <div className="flex gap-6">
          {["Android", "iOS"].map((platform) => {
            const selected = isPlatformSelected(platform);
            return (
              <label
                key={platform}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selected}
                  onChange={() => togglePlatform(platform)}
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 transition
                    ${selected ? "bg-blue-600 border-blue-600" : "border-gray-400"}
                  `}
                />
                <span className={`text-sm ${selected ? "text-blue-600" : "text-gray-600"}`}>
                  {platform}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Targeting */}
      <div>
        <h3 className="text-md font-bold text-black mb-2">Targeting</h3>
        <div className="flex gap-4">
          {/* All Users */}
          <button
            onClick={() => selectTargeting("all")}
            className={`flex-1 border rounded-md px-4 py-3 text-left transition-all
              ${formData.targeting === "all" ? "border-blue-600 bg-blue-50" : "border-gray-300"}
            `}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 ${
                  formData.targeting === "all"
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-400"
                }`}
              />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-800">
                  All push-enabled users
                </span>
                <div className="text-sm text-gray-800 font-semibold">
                  {pushUserCount}
                  <span className="text-xs text-gray-500 ml-2">
                    Push-enabled users
                  </span>
                </div>
              </div>
            </div>
          </button>

          {/* Segmentation */}
          <button
            onClick={() => selectTargeting("segmentation")}
            className={`flex-1 border rounded-md px-4 py-3 text-left transition-all
              ${formData.targeting === "segmentation" ? "border-blue-600 bg-blue-50" : "border-gray-300"}
            `}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 ${
                  formData.targeting === "segmentation"
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-400"
                }`}
              />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-800">
                  Use segmentation
                </span>
                <span className="text-xs text-gray-500 leading-snug">
                  Send to users based on specific segmentation such as cohorts or locations.
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Segmentation Options */}
      {formData.targeting === "segmentation" && (
        <div className="flex flex-col gap-6 mt-2">
          {/* Locations */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Location(s)
            </label>
            <div className="flex flex-wrap gap-2">
                {availableLocations.map((location) => {
                    const selected = selectedSegmentation.locations?.includes(location);
                    return (
                    <button
                        key={location}
                        type="button"
                        onClick={() => {
                        const current = selectedSegmentation.locations || [];
                        const updated = selected
                            ? current.filter((l) => l !== location)
                            : [...current, location];
                        updateSegmentationField("locations", updated);
                        }}
                        className={`px-3 py-1 rounded-full text-sm border transition
                        ${selected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}
                        `}
                    >
                        {location}
                    </button>
                    );
                })}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              User Tag(s)
            </label>
            <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => {
                    const selected = selectedSegmentation.tags?.includes(tag);
                    return (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => {
                        const current = selectedSegmentation.tags || [];
                        const updated = selected
                            ? current.filter((t) => t !== tag)
                            : [...current, tag];
                        updateSegmentationField("tags", updated);
                        }}
                        className={`px-3 py-1 rounded-full text-sm border transition
                        ${selected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}
                        `}
                    >
                        {tag}
                    </button>
                    );
                })}
            </div>
          </div>

          {/* Last Order Date */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Last Order Date
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={selectedSegmentation.lastOrderDate || ""}
              onChange={(e) =>
                updateSegmentationField("lastOrderDate", e.target.value)
              }
            >
              <option value="">Select...</option>
              {orderDateOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
