"use client";

import { useState } from "react";

export default function TeamMembersCard({ initialMembers }) {
  const [members, setMembers] = useState(initialMembers);
  const [showModal, setShowModal] = useState(false);
  const [inviteFields, setInviteFields] = useState([{ email: "", name: "" }]);

  const addInviteField = () => {
    setInviteFields([...inviteFields, { email: "", name: "" }]);
  };

  const removeInviteField = (index) => {
    setInviteFields(inviteFields.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, key, value) => {
    const updated = [...inviteFields];
    updated[index][key] = value;
    setInviteFields(updated);
  };

  const handleSendInvites = async () => {
    console.log("Sending invites:", inviteFields);
    setShowModal(false);
    setInviteFields([{ email: "", name: "" }]);
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-[325px] p-4">
        <h2 className="text-sm font-medium text-gray-500 mb-3">Team Members</h2>

        <ul className="space-y-2 mb-4">
          {members.map((member, index) => (
            <li key={index}>
              <div className="flex items-center space-x-3 bg-gray-50 px-3 py-2 rounded-lg text-xs font-medium text-gray-800">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-xs">
                  {getInitials(member.name)}
                </div>
                <span className="truncate">{member.name}</span>
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setShowModal(true)}
          className="w-full px-3 py-2 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition"
        >
          + Add Team Members
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm font-semibold text-gray-800">
                Invite Members to Your Team
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {/* Labels */}
            <div className="grid grid-cols-[1fr_1fr_auto] px-1 mb-2 text-xs font-medium text-gray-500">
              <span>Email Address</span>
              <span>Name (Optional)</span>
              <span className="sr-only">Remove</span>
            </div>

            {/* Fields */}
            {inviteFields.map((field, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_1fr_auto] gap-2 mb-2 items-center"
              >
                <input
                  type="email"
                  placeholder="Eg. john@example.com"
                  value={field.email}
                  onChange={(e) =>
                    handleInputChange(index, "email", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Eg. John"
                  value={field.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeInviteField(index)}
                  className="text-gray-400 hover:text-gray-600 text-lg"
                  aria-label="Remove"
                >
                  &times;
                </button>
              </div>
            ))}

            {/* Add More */}
            <div className="flex justify-start mt-3 mb-5">
              <button
                onClick={addInviteField}
                className="text-blue-600 text-sm hover:underline font-medium"
              >
                + Add Another
              </button>
            </div>

            {/* Submit */}
            <button
              onClick={handleSendInvites}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md text-sm font-semibold transition"
            >
              Send Invitation
            </button>
          </div>
        </div>
      )}
    </>
  );
}
