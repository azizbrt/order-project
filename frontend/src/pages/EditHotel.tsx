import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-clients";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const EditHotel = () => {
  const { hotelId } = useParams();

  // Fetch the hotel details
  const { data: hotel, isLoading } = useQuery(
    ["fetchMyHotelById", hotelId], 
    () => apiClient.fetchMyHotelsById(hotelId || ""), 
    { enabled: !!hotelId }
  );

  // Function to handle saving (placeholder for now)
  const handleSave = async (hotelData: any) => {
    console.log("Saving hotel:", hotelData);
  };

  return <ManageHotelForm hotel={hotel} isLoading={isLoading} onSave={handleSave} />;
};

export default EditHotel;
