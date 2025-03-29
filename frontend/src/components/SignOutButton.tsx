import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients"; // Assure-toi que cette importation est correcte
import { Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";


const SignOutButton = () => {
    const queryClient = useQueryClient()
    const {showToast} = useAppContext()
    const mutation = useMutation(apiClient.signOut,{
        onSuccess: async() =>{
            await queryClient.invalidateQueries("validateToken")
            showToast({message:"Signed out successfully",type : "SUCCESS"});
            console.log("user has been signed out");
        },
        onError: (error:Error)=>{
            showToast({message:"Error while signing out",type : "ERROR"});
            console.error("error while signing out");
        }
    });
    const handleClick = () =>{
        mutation.mutate();
        console.log("user has been signed out");
    }
    return (
      <button onClick={handleClick} className="px-4 py-2 font-bold text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-100 transition">
        Sign Out
      </button>
    );
  };
  
  export default SignOutButton;
  