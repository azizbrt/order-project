import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiclient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

// ✨ Le formulaire attend ces infos
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  // 🔄 Envoie les infos au serveur
  const mutation = useMutation(apiclient.register, {
    onSuccess: () => {
      showToast({ message: "Bravo ! Inscription réussie 🎉", type: "SUCCESS" });
      queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    }
  });

  // 🎯 Fonction appelée quand on appuie sur "Créer un compte"
  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <form className="p-6 border rounded-lg max-w-md mx-auto bg-white shadow-lg" onSubmit={onSubmit}>
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Créer un compte</h2>

      {/* 📝 Champs du formulaire */}
      {[
        { label: "Prénom", name: "firstName", type: "text" },
        { label: "Nom", name: "lastName", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Mot de passe", name: "password", type: "password" },
        { label: "Confirmer le mot de passe", name: "confirmPassword", type: "password", 
          validate: (val: string) => val === watch("password") || "Les mots de passe ne correspondent pas" }
      ].map(({ label, name, type, validate }) => (
        <div key={name} className="mb-4">
          <label className="block font-medium">{label}</label>
          <input 
            type={type}
            className="border rounded w-full p-2 mt-1"
            {...register(name as keyof RegisterFormData, { required: "Ce champ est requis", validate })}
          />
          {errors[name as keyof RegisterFormData] && (
            <p className="text-red-500 text-sm mt-1">{errors[name as keyof RegisterFormData]?.message}</p>
          )}
        </div>
      ))}

      {/* 🔘 Bouton "Créer un compte" */}
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 text-lg font-bold"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Création..." : "Créer un compte"}
      </button>
    </form>
  );
};

export default Register;
