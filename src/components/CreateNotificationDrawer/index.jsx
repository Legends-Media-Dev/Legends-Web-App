"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";
import StepNavigation from "./StepNavigation";
import StepPages from "./StepPages";

const steps = ["Type", "Targeting", "Delivery", "Content", "Review"];

export default function CreateNotificationDrawer({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const [formData, setFormData] = useState({
    type: null,
    target: null,
    sendAt: null,
    title: "",
    body: "",
  });
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start pt-10 bg-black/25 backdrop-blur-sm">
        <div className="w-full max-w-3xl bg-white h-[90vh] rounded-xl shadow-xl p-6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Notification</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={20} />
          </button>
        </div>

        {/* Steps */}
        <StepNavigation
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />

        <hr className="border-gray-300 my-4" />

        {/* Step Content */}
        <div className="flex-1 overflow-auto">
            <StepPages
                currentStep={currentStep}
                formData={formData}
                setFormData={setFormData}
            />
        </div>

        {/* Back button (shown only if not on step 0) */}
        {currentStep > 0 && (
            <button
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                className="mt-2 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
            >
                ← Back
            </button>
        )}

        <hr className="border-gray-300 mt-4" />

        <div className="flex justify-between items-center pt-4">
            {/* Left - Save as draft */}
            <button
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                onClick={() => {
                console.log("Save as draft", formData);
                // Firestore save logic will go here
                }}
            >
                Save as draft
        </button>

        {/* Right - Cancel and Next Step */}
        <div className="flex items-center gap-3">
            <button
            className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            onClick={onClose}
            >
            Cancel
            </button>
            <button
                disabled={!formData.type} // disable if not selected
                className={`px-4 py-2 text-sm font-medium rounded-md transition
                    ${formData.type
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"}
                `}
                onClick={() => {
                    setCompletedSteps((prev) =>
                        prev.includes(currentStep) ? prev : [...prev, currentStep]
                    );
                    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
                }}
                >
                Next step
            </button>
        </div>
        </div>
      </div>
    </div>
  );
}
