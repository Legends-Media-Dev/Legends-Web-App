"use client";

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

  const isPlatformSelected = (platform) =>
    (formData.platforms || []).includes(platform);

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
                {/* Circle */}
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition
                    ${selected ? "bg-blue-600 border-blue-600" : "border-gray-400"}
                  `}
                >
                  {selected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
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
    </div>
  );
}
