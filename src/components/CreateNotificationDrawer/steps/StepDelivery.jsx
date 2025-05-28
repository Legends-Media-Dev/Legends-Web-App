import StepDeliveryOneTime from "./StepDeliveryOneTime";
import StepDeliveryRecurring from "./StepDeliveryRecurring";
import StepDeliveryMultiple from "./StepDeliveryMultiple";

export default function StepDelivery({ formData, setFormData }) {
  return (
    <div className="flex flex-col gap-6">
        {/* Heading + optional subtitle */}
        <div className="flex flex-col gap-1">
            <h3 className="text-md font-bold text-black">Delivery</h3>
            {formData.type?.toLowerCase().includes("multiple") && (
            <p className="text-xs text-gray-500">
                Select date and time for multiple message sending
            </p>
            )}
        </div>

        {/* Step component */}
        {formData.type === "One-Time" && (
            <StepDeliveryOneTime formData={formData} setFormData={setFormData} />
        )}
        {formData.type === "Recurring" && (
            <StepDeliveryRecurring formData={formData} setFormData={setFormData} />
        )}
        {formData.type === "Multiple Days" && (
            <StepDeliveryMultiple formData={formData} setFormData={setFormData} />
        )}
    </div>

  );
}
