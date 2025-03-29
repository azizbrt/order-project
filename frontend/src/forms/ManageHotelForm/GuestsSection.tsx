import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  // 🔧 Get the form methods
  const { register, formState: { errors } } = useFormContext<HotelFormData>();

  return (
    <div className="rich-text flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      
      {/* Container for inputs */}
      <div className="grid grid-cols-2 gap-5 bg-gray-100 p-6">
        
        {/* Adult count input */}
        <label className="text-sm font-semibold text-gray-700">
          Adults
          <input
            type="number"
            min={1}
            className="border rounded w-full py-2 px-3"
            {...register("adultCount", { required: "This field is required" })}
          />
          {/* Show error if any */}
          {errors.adultCount && (
            <span className="text-red-500 text-sm">{errors.adultCount.message}</span>
          )}
        </label>
        
        {/* Child count input */}
        <label className="text-sm font-semibold text-gray-700">
          Children
          <input
            type="number"
            min={0}
            className="border rounded w-full py-2 px-3"
            {...register("childCount", { required: "This field is required" })}
          />
          {/* Show error if any */}
          {errors.childCount && (
            <span className="text-red-500 text-sm font-bold">{errors.childCount.message}</span>
          )}
        </label>
        
      </div>
    </div>
  );
};

export default GuestSection;
