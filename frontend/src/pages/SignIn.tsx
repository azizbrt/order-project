import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

// ✅ Définition du type des données du formulaire
export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  // 📌 Contexte et navigation
  const { showToast } = useAppContext(); // Messages de notification
  const navigate = useNavigate(); // Changer de page
  const queryClient = useQueryClient(); // Rafraîchir les données utilisateur
  const location = useLocation(); // Savoir où l'utilisateur voulait aller avant de se connecter

  // 🎯 Gestion du formulaire avec React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  // 🔄 Gestion de la connexion avec React Query
  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Connexion réussie !", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken"); // Vérifie si l'utilisateur est connecté
      navigate(location.state?.from?.pathname || "/"); // Redirige vers la page d'origine ou l'accueil
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  // 📝 Fonction exécutée lors de la soumission du formulaire
  const onSubmit = (data: SignInFormData) => {
    mutation.mutate(data);
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col gap-4 p-6 max-w-md mx-auto bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold text-center text-blue-600">Connexion</h2>

      {/* 📧 Champ Email */}
      <label className="text-sm font-bold text-gray-700">
        Email
        <input
          type="email"
          className="border rounded w-full py-2 px-3 focus:ring-2 focus:ring-blue-400"
          {...register("email", { required: "L'email est obligatoire" })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </label>

      {/* 🔒 Champ Mot de passe */}
      <label className="text-sm font-bold text-gray-700">
        Mot de passe
        <input
          type="password"
          className="border rounded w-full py-2 px-3 focus:ring-2 focus:ring-blue-400"
          {...register("password", { required: "Mot de passe requis", minLength: { value: 6, message: "Au moins 6 caractères" } })}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </label>

      {/* 🛠️ Liens et bouton */}
      <div className="flex justify-between items-center">
        <p className="text-sm">
          Pas de compte ? <Link className="underline text-blue-600" to="/register">Créer un compte</Link>
        </p>
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-500 transition"
        >
          Se connecter
        </button>
      </div>
    </form>
  );
};

export default SignIn;
