import { useEffect } from "react";

type ToastProps = {
  message: string; // Le texte à afficher
  type: "SUCCESS" | "ERROR"; // ✅ Vert (SUCCESS) ou ❌ Rouge (ERROR)
  onClose: () => void; // Fonction pour fermer le toast
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  // ⏳ Ferme le toast après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer); // Nettoie le timer quand on ferme
  }, [onClose]);

  // 🎨 Styles du toast (vert si succès, rouge si erreur)
  const styles = `fixed bottom-4 right-4 z-50 p-4 rounded-md text-white max-w-md shadow-lg transition-opacity duration-300 ${
    type === "SUCCESS" ? "bg-green-600" : "bg-red-600"
  }`;

  return (
    <div className={styles}>
      <div className="flex justify-between items-center gap-4">
        <span className="text-lg font-semibold">{message}</span>
        <button
          onClick={onClose}
          className="text-white text-lg font-bold hover:opacity-75"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default Toast;
