import StepType from "./steps/StepType";
import StepTargeting from "./steps/StepTargeting";
import StepDelivery from "./steps/stepDelivery";

export default function StepPages({ currentStep, formData, setFormData }) {
  return (
    <>
      {currentStep === 0 && (
        <StepType formData={formData} setFormData={setFormData} />
      )}
      {currentStep === 1 && (
        <StepTargeting formData={formData} setFormData={setFormData} />
      )}
      {currentStep === 2 && (
        <StepDelivery formData={formData} setFormData={setFormData} />
      )}
    </>
  );
}
