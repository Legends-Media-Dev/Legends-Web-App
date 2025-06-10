"use client";

import NotificationPreview from "../NotificationPreview";
import ButtonInputGroup from "../ButtonInputGroup";

export default function StepContent({ formData, setFormData }) {
  const updateField = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateButton = (index, field, value) => {
    const buttons = [...(formData.buttons || [])];
    buttons[index] = { ...buttons[index], [field]: value };
    updateField("buttons", buttons);
  };

  const addButton = () => {
    if ((formData.buttons || []).length >= 2) return;
    updateField("buttons", [...(formData.buttons || []), { text: "", url: "" }]);
  };

  const removeButton = (index) => {
    const updated = [...formData.buttons];
    updated.splice(index, 1);
    updateField("buttons", updated);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Preview */}
      <div className="md:w-1/3 flex justify-center">
        <div className="w-[280px]">
            <h3 className="text-sm font-semibold text-gray-700 mb-2 text-center">Live Preview</h3>
            <NotificationPreview formData={formData} />
        </div>
      </div>

      {/* Left: Form */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Section: Message Content */}
        <div>
          <h3 className="text-md font-bold text-black mb-1">Message Content</h3>
          <p className="text-xs text-gray-500 mb-2">
            This text will be visible in your push notification.
          </p>

          <input
            type="text"
            className="w-full border border-gray-300 focus:border-gray-400 focus:ring-0 px-3 py-2 rounded-md text-sm mb-2"
            placeholder="Notification Title (optional)"
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
          />

          <textarea
            className="w-full border border-gray-300 focus:border-gray-400 focus:ring-0 px-3 py-2 rounded-md text-sm"
            rows={4}
            maxLength={4096}
            placeholder="Notification Body (required)"
            value={formData.body}
            onChange={(e) => updateField("body", e.target.value)}
          />

          <p className="text-xs text-gray-400 mt-1">
            Max: 4096 characters on Android, 2048 on iOS.
          </p>
        </div>

        {/* Section: Media URL */}
        <div>
          <h3 className="text-md font-bold text-black mb-1">Media (Optional)</h3>
          <p className="text-xs text-gray-500 mb-2">Image URL for richer notifications</p>
          <input
            type="url"
            className="w-full border border-gray-300 focus:border-gray-400 focus:ring-0 px-3 py-2 rounded-md text-sm"
            placeholder="https://example.com/image.jpg"
            value={formData.imageUrl || ""}
            onChange={(e) => updateField("imageUrl", e.target.value)}
          />
        </div>

        {/* Section: Buttons */}
        <div>
          <h3 className="text-md font-bold text-black mb-1">Buttons (Optional)</h3>
          <p className="text-xs text-gray-500 mb-2">
            Add up to 2 buttons with custom text and link
          </p>

          {(formData.buttons || []).map((btn, i) => (
            <ButtonInputGroup
              key={i}
              index={i}
              button={btn}
              onChange={updateButton}
              onRemove={removeButton}
            />
          ))}

          {(!formData.buttons || formData.buttons.length < 2) && (
            <button
              onClick={addButton}
              className="text-sm text-blue-600 hover:underline mt-1"
            >
              + Add another button
            </button>
          )}
        </div>

        {/* Section: Main Click Action */}
        <div>
          <h3 className="text-md font-bold text-black mb-1">Main Tap URL (Optional)</h3>
          <p className="text-xs text-gray-500 mb-2">
            Where the user is directed if they tap the notification.
          </p>
          <input
            type="url"
            className="w-full border border-gray-300 focus:border-gray-400 focus:ring-0 px-3 py-2 rounded-md text-sm"
            placeholder="https://landingpage.com"
            value={formData.tapUrl || ""}
            onChange={(e) => updateField("tapUrl", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
