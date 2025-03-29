import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 py-6 shadow-lg relative z-10 mb-16">
      <div className="max-w-7xl px-6 mx-auto flex items-center">
        
        {/* 🌍 Logo du site */}
        <Link to="/" className="text-3xl text-white font-extrabold tracking-wide">
          MERNGOLIDAYS<span className="text-yellow-300">.com</span>
        </Link>

        {/* 🔗 Liens de navigation - déplacés légèrement à gauche */}
        <nav key={isLoggedIn ? "logged-in" : "logged-out"} className="flex items-center gap-x-6 ml-auto">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings" className="flex items-center text-white px-3 font-bold hover:bg-blue-600">
                My Bookings
              </Link>
              <Link to="/my-hotels" className="flex items-center text-white px-3 font-bold hover:bg-blue-600">
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link 
              to="/sign-in" 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-md font-bold transition"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
