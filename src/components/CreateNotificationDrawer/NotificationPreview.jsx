export default function NotificationPreview({ formData, platform = "ios" }) {
  return (
    <div className="border rounded-2xl p-4 bg-white shadow-md">
      <div className="relative w-[220px] h-[450px] rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        {/* Fake status bar */}
        <div className="text-xs p-2 text-center font-medium">9:41</div>

        {/* Notification Box */}
        <div className="p-4">
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="media"
              className="w-full rounded-md mb-2"
            />
          )}

          {formData.title && (
            <p className="text-sm font-semibold mb-1">{formData.title}</p>
          )}

          <p className="text-sm">{formData.body || "This is your notification body."}</p>

          {formData.buttons?.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {formData.buttons.map((btn, i) => (
                <div
                  key={i}
                  className="bg-blue-500 text-white rounded-md px-3 py-1 text-sm text-center"
                >
                  {btn.text || "Button"}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
