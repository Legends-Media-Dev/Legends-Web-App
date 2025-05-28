"use client";

import SelectableCardRadio from "@/components/SelectableCardRadio";
import { FiCheck } from "react-icons/fi";

const availableLocations = ["Los Angeles", "New York", "Chicago", "Miami"];
const availableTags = ["active-sub", "vip-gold", "vip-silver", "vip-platinum"];
const orderDateOptions = ["Last 7 days", "Last 30 days", "Last 90 days"];

export default function StepTargeting({ formData, setFormData }) {
  const pushUserCount = 1248;

  const togglePlatform = (platform) => {
    const current = formData.platforms || [];
    const updated = current.includes(platform)
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

  const selectedSegmentation = formData.segmentation || [];

  return (
    <div className="flex flex-col gap-6">
    {/* Platforms */}
    <div>
        <h3 className="text-md font-bold text-black mb-2">Platforms</h3>
        <div className="flex gap-4">
            {["Android", "iOS"].map((platform) => {
            const selected = (formData.platforms || []).includes(platform);
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
                    className={`w-4 h-4 border-2 flex items-center justify-center text-white text-[10px]
                    ${selected ? "bg-blue-600 border-blue-600" : "border-gray-400"}
                    `}
                >
                    {selected && <FiCheck className="w-3 h-3" />}
                </div>
                <span className={`text-sm ${selected ? "text-blue-600" : "text-gray-700"}`}>
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
          <SelectableCardRadio
            selected={formData.targeting === "all"}
            onClick={() => selectTargeting("all")}
            title="All push-enabled users"
            description={`${pushUserCount} total users`}
          />
          <SelectableCardRadio
            selected={formData.targeting === "segmentation"}
            onClick={() => selectTargeting("segmentation")}
            title="Use segmentation"
            description="Target by cohorts, tags, or locations"
          />
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
                      ${
                        selected
                          ? "text-blue-600 border-blue-600 font-medium"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }
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
                      ${
                        selected
                          ? "text-blue-600 border-blue-600 font-medium"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }
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
