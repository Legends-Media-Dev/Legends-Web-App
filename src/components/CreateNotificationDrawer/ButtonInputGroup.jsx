import { FiX } from "react-icons/fi";

export default function ButtonInputGroup({ index, button, onChange, onRemove }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <input
        type="text"
        placeholder="Button Text"
        className="flex-1 border border-gray-300 focus:border-gray-400 focus:ring-0 rounded-md px-3 py-2 text-sm"
        value={button.text}
        onChange={(e) => onChange(index, "text", e.target.value)}
      />
      <input
        type="url"
        placeholder="Button URL"
        className="flex-1 border border-gray-300 focus:border-gray-400 focus:ring-0 rounded-md px-3 py-2 text-sm"
        value={button.url}
        onChange={(e) => onChange(index, "url", e.target.value)}
      />
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="p-1.5 text-gray-400 hover:text-red-500"
      >
        <FiX size={18} />
      </button>
    </div>
  );
}
