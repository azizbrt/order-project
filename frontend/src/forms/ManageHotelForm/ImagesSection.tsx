import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const { register, formState: { errors } } = useFormContext<HotelFormData>();

  return (
    <div className="rich-text flex flex-col gap-4">
      <h2 className="text-xl font-bold text-blue-600 mb-2">Upload Images 📷</h2>
      
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        className="w-full border p-2 rounded"
        {...register("imagesUrls", {
          validate: (files) => {
            if (files.length === 0) return "Select at least one image!";
            if (files.length > 6) return "Max 6 images allowed!";
            return true;
          }
        })}
      />

      {errors.imagesUrls && <p className="text-red-500 text-sm">{errors.imagesUrls.message}</p>}
    </div>
  );
};

export default ImagesSection;
