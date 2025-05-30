"use client";

export default function StepContent({ formData, setFormData }) {
  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Format Type */}
      <div>
        <h3 className="text-md font-bold text-black mb-1">Notification Format</h3>
        <p className="text-xs text-gray-500 mb-2">
          Choose how this notification will be delivered.
        </p>
        <div className="flex gap-3">
          {["Message", "Silent"].map((type) => {
            const selected = formData.notificationType === type;
            return (
              <button
                key={type}
                onClick={() => updateField("notificationType", type)}
                className={`px-4 py-2 rounded-md text-sm border transition ${
                  selected
                    ? "bg-blue-50 text-blue-700 border-blue-600 font-medium"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Message Title */}
      <div>
        <label className="text-sm font-bold text-gray-800 mb-1 block">
          Message Title (Optional)
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          placeholder="Enter title"
          value={formData.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
        />
      </div>

      {/* Message Text */}
      <div>
        <label className="text-sm font-bold text-gray-800 mb-1 block">
          Message Body
        </label>
        <textarea
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm min-h-[100px]"
          placeholder="Write your message here"
          maxLength={4096}
          value={formData.body || ""}
          onChange={(e) => updateField("body", e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">
          Max 4096 characters (Android), 2048 (iOS)
        </p>
      </div>

      {/* Media URL */}
      <div>
        <label className="text-sm font-bold text-gray-800 mb-1 block">
          Media URL (optional)
        </label>
        <input
          type="url"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          placeholder="https://example.com/image.jpg"
          value={formData.mediaUrl || ""}
          onChange={(e) => updateField("mediaUrl", e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">
          iOS 10+ and Android (images only) support media. Older iOS versions do not.
        </p>
      </div>

      {/* Future: Buttons + Variables */}
      {/* Placeholder for buttons and personalization */}
    </div>
  );
}
