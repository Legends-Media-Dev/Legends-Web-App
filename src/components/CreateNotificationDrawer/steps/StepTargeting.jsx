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
      {/* Target Devices */}
      <div>
        <h3 className="text-md font-bold text-black mb-1">Target Devices</h3>
        <p className="text-xs text-gray-500 mb-2">
          Choose which devices to send this notification to
        </p>
        <div className="flex gap-4 mb-4">
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
                  className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center text-white text-[10px]
                    ${selected ? "bg-blue-600 border-blue-600" : "border-gray-400"}
                  `}
                >
                  {selected && <FiCheck className="w-3 h-3" />}
                </div>
                <span
                  className={`text-sm ${
                    selected ? "text-blue-600 font-medium" : "text-gray-700"
                  }`}
                >
                  {platform}
                </span>
              </label>
            );
          })}
        </div>

        {/* Audience Selection */}
        <div>
          <h3 className="text-md font-bold text-black mb-1">Audience</h3>
          <p className="text-xs text-gray-500 mb-2">
            Choose who should receive this notification
          </p>
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
      </div>

      {/* Segmentation Options */}
      {formData.targeting === "segmentation" && (
        <div className="flex flex-col gap-6 mt-2">
          {/* Locations */}
          <div>
            <h3 className="text-md font-bold text-black mb-1">Locations</h3>
            <p className="text-xs text-gray-500 mb-2">
              Filters users by selected geographic locations
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableLocations.map((location) => {
                const selected = selectedSegmentation.locations?.includes(location);
                return (
                  <label
                    key={location}
                    className={`flex items-center gap-3 border rounded-md px-3 py-2 text-sm cursor-pointer transition
                      ${
                        selected
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white hover:bg-gray-50"
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => {
                        const current = selectedSegmentation.locations || [];
                        const updated = selected
                          ? current.filter((l) => l !== location)
                          : [...current, location];
                        updateSegmentationField("locations", updated);
                      }}
                      className="accent-blue-600"
                    />
                    {location}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-md font-bold text-black mb-1">User Tags</h3>
            <p className="text-xs text-gray-500 mb-2">
              Target users based on custom tags
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableTags.map((tag) => {
                const selected = selectedSegmentation.tags?.includes(tag);
                return (
                  <label
                    key={tag}
                    className={`flex items-center gap-3 border rounded-md px-3 py-2 text-sm cursor-pointer transition
                      ${
                        selected
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white hover:bg-gray-50"
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => {
                        const current = selectedSegmentation.tags || [];
                        const updated = selected
                          ? current.filter((t) => t !== tag)
                          : [...current, tag];
                        updateSegmentationField("tags", updated);
                      }}
                      className="accent-blue-600"
                    />
                    {tag}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Last Order Date */}
          <div>
            <h3 className="text-md font-bold text-black mb-1">Recent Order Activity</h3>
            <p className="text-xs text-gray-500 mb-2">
              Send notifications to users who placed an order in this timeframe
            </p>
            <div className="flex flex-wrap gap-2">
              {orderDateOptions.map((option) => {
                const selected = selectedSegmentation.lastOrderDate === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      updateSegmentationField("lastOrderDate", option)
                    }
                    className={`px-3 py-1 rounded-full text-sm border transition
                      ${
                        selected
                          ? "text-blue-600 border-blue-600 font-medium bg-blue-50"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }
                    `}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
