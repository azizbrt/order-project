import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiclient from "../api-clients";

const AddHotel = () =>{
    const {showToast} = useAppContext()
    const {mutate, isLoading} = useMutation(apiclient.addMyHotel,{
        onSuccess: () => {
            showToast({ message: "Hôtel ajouté avec succès ��", type: "SUCCESS" });
        },
        onError: () => {
            showToast({ message: "Error while adding hotel", type: "ERROR" });
        }
    });
    const handleSave = (HotelFormData : FormData) =>{
        mutate(HotelFormData)
     } 
    return (<ManageHotelForm onSave={handleSave} isLoading={isLoading} />)
}
export default AddHotel;