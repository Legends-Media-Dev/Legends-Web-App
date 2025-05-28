"use client";

export default function SelectableCardRadio({
  selected,
  onClick,
  title,
  description,
  name = "radio-option",
  value,
}) {
  return (
    <label
      className={`flex-1 border rounded-md px-4 py-3 text-left transition-all cursor-pointer ${
        selected ? "border-blue-600 ring-1 ring-blue-300" : "border-gray-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name={name}
          value={value}
          checked={selected}
          onChange={() => onClick(value)} // ensure value is passed
          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <div>
          <div className="text-sm font-medium text-gray-800">{title}</div>
          <div className="text-xs text-gray-500">{description}</div>
        </div>
      </div>
    </label>
  );
}
