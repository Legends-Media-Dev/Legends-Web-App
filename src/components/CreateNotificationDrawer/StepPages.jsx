import StepType from "./steps/StepType";

export default function StepPages({ currentStep, formData, setFormData }) {
  return (
    <>
      {currentStep === 0 && (
        <StepType formData={formData} setFormData={setFormData} />
      )}
      {/* Add future steps here */}
    </>
  );
}
