import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {HotelType} from '../../backend/src/models/hotel.model';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const register = async (formData: RegisterFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/users/register`,{
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(formData)
    });
    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message);
    }
    

}
export const signIn = async (formData: SignInFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/users/login`,{
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(formData)

    })
    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.message);
    }
    return body;
}
export const validateToken= async()=>{
    const response = await fetch(`${API_BASE_URL}/api/users/validate-token`,{
        credentials: "include",
    })
    if (!response.ok) {
        throw new Error("Token is invalid");
        
    }
    return response.json();
}
export const signOut = async()=>{
    const response = await fetch(`${API_BASE_URL}/api/users/logout`,{
        credentials: "include",
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la déconnexion");
        
    }

}
export const addMyHotel = async(hotelFormData : FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
        method: 'POST',
        credentials: "include",
        body: hotelFormData,
    });
    if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de votre hôtel");
        
    }
    return response.json();
}
export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de vos hôtels");
    }
    const data: HotelType[] = await response.json();
    return data;
  };
export const fetchMyHotelsById = async (hotelId: string):Promise<HotelType> =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération de l'hôtel");
    }
    return response.json();
}
  