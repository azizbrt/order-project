import React, { createContext, useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import Toast from "../components/toasts.component";
import * as apiClient from "../api-clients"; // Vérifie que ce chemin est correct

// 🎭 Type pour les messages des notifications (Toasts)
type ToastMessage = {
  message: string; // Texte du message
  type: "SUCCESS" | "ERROR"; // Type de message : succès ✅ ou erreur ❌
};

// 🏗 Type du contexte global
type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void; // Fonction pour afficher un message
  isLoggedIn: boolean; // Vérifie si l'utilisateur est connecté
  refreshAuth: () => void; // Force la mise à jour de l'authentification après login/logout
};

// 🚀 Création du contexte global
const AppContext = createContext<AppContextType | undefined>(undefined);

// 🏡 **Provider qui gère l'authentification et les notifications**
export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const queryClient = useQueryClient(); // Permet d'invalider les requêtes et rafraîchir les données

  // 🔍 Vérification du token pour voir si l'utilisateur est connecté
  const { isError } = useQuery("validateToken", apiClient.validateToken, { retry: false });
  const isLoggedIn = !isError;

  // 🔄 Fonction pour rafraîchir l'état d'authentification après login/logout
  const refreshAuth = () => {
    queryClient.invalidateQueries("validateToken"); // 🚀 Force la vérification du token
  };

  // 📢 Fonction pour afficher une notification (Toast)
  const showToast = (toastMessage: ToastMessage) => {
    setToast(toastMessage);
    setTimeout(() => setToast(undefined), 3000); // Supprime le message après 3s
  };

  return (
    <AppContext.Provider value={{ showToast, isLoggedIn, refreshAuth }}>
      {/* Affichage du toast s'il y a un message */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
      {children}
    </AppContext.Provider>
  );
};

// 🎯 **Fonction pour utiliser le contexte facilement**
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext doit être utilisé à l'intérieur de <AppContextProvider>");
  }
  return context;
};
