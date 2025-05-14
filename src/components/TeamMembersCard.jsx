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

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow w-[325px] h-fit max-h-[calc(100vh-150px)] overflow-auto">
        <h2 className="text-xl font-bold mb-4">Team Members</h2>

        <ul className="space-y-3 mb-4">
          {members.map((member, index) => (
            <li key={index}>
              <div className="bg-gray-100 px-3 py-2 rounded-lg flex items-center space-x-3 text-sm font-medium text-gray-800">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 font-semibold rounded-full text-xs">
                  {getInitials(member.name)}
                </div>
                <span className="truncate">{member.name}</span>
              </div>
            </li>
          ))}
        </ul>

        <button
            onClick={() => setShowModal(true)}
            className="w-full px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition"
        >
            Add Team Members
        </button>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Invite Members to your team</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
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
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Eg. John"
                  value={field.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeInviteField(index)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  &times;
                </button>
              </div>
            ))}

            {/* Add / Helper */}
            <div className="flex justify-between items-center mt-3 mb-5">
              <button
                onClick={addInviteField}
                className="text-blue-600 text-sm hover:underline font-medium"
              >
                + Add New
              </button>
            </div>

            {/* Submit */}
            <button
              onClick={handleSendInvites}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-base font-semibold transition"
            >
              Send Invitation
            </button>
          </div>
        </div>
      )}
    </>
  );
}
