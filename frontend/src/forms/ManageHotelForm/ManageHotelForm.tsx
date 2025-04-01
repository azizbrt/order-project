import { FormProvider, useForm } from "react-hook-form"; // We get tools to handle the form
import DetailsSection from "./DetailsSection"; // Show details about the hotel
import TypeSection from "./TypeSection"; // Show the type of hotel
import FacilitiesSection from "./FacilitiesSection"; // Show facilities of the hotel
import GuestSection from "./GuestsSection"; // Show information about guests
import ImagesSection from "./ImagesSection"; // Show images of the hotel

// This is the shape of the data we want to get from the form
export type HotelFormData = {
    name: string; // Hotel name
    city: string; // City where the hotel is
    country: string; // Country where the hotel is
    description: string; // Short description of the hotel
    type: string; // Type of hotel (like luxury, budget)
    adultCount: number; // Number of adults
    childCount: number; // Number of children
    facilities: string[]; // What the hotel has (like pool, Wi-Fi)
    pricePerNight: number; // Price for one night in the hotel
    starRating: number; // Stars for the hotel (like 3 stars)
    imagesUrls: FileList; // Images for the hotel
};

type Props = {
    onSave: (hotelData: FormData) => void; // When we save, we call this function
    isLoading: boolean; // We know if the form is saving or not
};

// The form for creating or editing a hotel
const ManageHotelForm = ({ onSave, isLoading }: Props) => {
    const formMethods = useForm<HotelFormData>(); // Use the form helper
    const { handleSubmit } = formMethods; // Get the function to handle form submission

    // What happens when the form is submitted
    const onSubmit = handleSubmit((formData) => {
        const formDataToSend = new FormData(); // Create an object to send to the server
        // Add each part of the form to the object
        formDataToSend.append("name", formData.name);
        formDataToSend.append("city", formData.city);
        formDataToSend.append("country", formData.country);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("type", formData.type);
        formDataToSend.append("adultCount", formData.adultCount.toString());
        formDataToSend.append("childCount", formData.childCount.toString());
        formDataToSend.append("pricePerNight", formData.pricePerNight.toString());
        formDataToSend.append("starRating", formData.starRating.toString());

        // Add the list of facilities (like Wi-Fi, pool)
        formData.facilities.forEach((facility, index) => {
            formDataToSend.append(`facilities[${index}]`, facility);
        });

        // Add the images to the form data
        Array.from(formData.imagesUrls).forEach((image) => {
            formDataToSend.append("imageFiles", image);
        });

        // Save the data by calling the onSave function
        onSave(formDataToSend);
    });

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                {/* Each section is like a piece of the puzzle */}
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestSection />
                <ImagesSection />

                {/* Button to save the hotel */}
                <span className="flex justify-end mt-4">
                    <button
                        disabled={isLoading} // If it's saving, we can't click it
                        type="submit"
                        className="cursor-pointer bg-blue-600 text-white p-2 font-bold hover:bg-blue-400 text-xl rounded-md shadow-md disabled:bg-gray-500"
                    >
                        {isLoading ? "Saving..." : "Save"} {/* Show "Saving..." if it's loading */}
                    </button>
                </span>
            </form>
        </FormProvider>
    );
};

export default ManageHotelForm; // Send the form to other parts of the app