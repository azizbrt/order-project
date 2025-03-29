import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const { register, watch, formState:{errors} } = useFormContext<HotelFormData>();
  const selectedType = watch("type"); // Récupère la valeur sélectionnée en temps réel

  return (
    <div className="rich-text flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">Type</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {hotelTypes.map((type, index) => (
          <label 
            key={index} 
            htmlFor={type} 
            className={`cursor-pointer flex items-center justify-center border border-gray-400 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              selectedType === type ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            }`}
          >
            <input 
              type="radio" 
              id={type} 
              value={type} 
              {...register("type", { required: "Veuillez choisir un type" })} 
              className="hidden" 
            />
            {type}
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">{errors.type.message}</span>
      )}
    </div>
  );
};

export default TypeSection;
