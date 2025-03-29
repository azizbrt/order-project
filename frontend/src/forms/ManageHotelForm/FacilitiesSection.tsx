import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  // 📌 On récupère les fonctions du formulaire
  const { register, formState: { errors } } = useFormContext<HotelFormData>();

  return (
    <div className="rich-text flex flex-col gap-4">
      {/* 🏨 Titre de la section */}
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>

      {/* 📋 Liste des équipements disponibles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label key={facility} className="flex items-center gap-2 text-gray-700">
            <input 
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (selected) => selected?.length > 0 || "Please select at least one option",
              })}
              className="w-4 h-4 cursor-pointer"
            />
            {facility}
          </label>
        ))}
      </div>

      {/* ⚠️ Affichage du message d'erreur si aucun choix n'est fait */}
      {errors.facilities && (
        <p className="text-red-500 text-sm font-bold">{errors.facilities.message}</p>
      )}
    </div>
  );
};

export default FacilitiesSection;
