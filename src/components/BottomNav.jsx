import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

// Iconos SVG como componentes
const HomeIcon = ({ active }) => (
  <svg className={`w-6 h-6 ${active ? 'text-[#9f9fff]' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const UsersIcon = ({ active }) => (
  <svg className={`w-6 h-6 ${active ? 'text-[#9f9fff]' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default function BottomNav() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      setTimeout(() => setIsConfirming(false), 3000);
    } else {
      logoutUser();
      navigate("/login");
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#12121a]/95 backdrop-blur-sm border-t border-[#2a2a3d] z-[99] safe-area-pb">
      <div className="flex justify-around items-center max-w-lg mx-auto h-16">
        <NavLink 
          to="/" 
          end 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-20 h-14 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-[#9f9fff] bg-[#9f9fff]/10' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`
          }
        >
          <HomeIcon active={false} />
          <span className="text-[10px] mt-1 font-medium">Resumen</span>
        </NavLink>

        <NavLink 
          to="/students" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-20 h-14 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'text-[#9f9fff] bg-[#9f9fff]/10' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`
          }
        >
          <UsersIcon active={false} />
          <span className="text-[10px] mt-1 font-medium">Alumnos</span>
        </NavLink>

        <button 
          onClick={handleLogout}
          className={`cursor-pointer flex flex-col items-center justify-center w-20 h-14 rounded-xl transition-all duration-200 ${
            isConfirming 
              ? 'text-white bg-[#e74c3c]/20' 
              : 'text-gray-400 hover:text-[#e74c3c] hover:bg-[#e74c3c]/10'
          }`}
        >
          <LogoutIcon />
          <span className={`text-[10px] mt-1 font-medium ${isConfirming ? 'text-[#e74c3c]' : ''}`}>
            {isConfirming ? '¿Seguro?' : 'Salir'}
          </span>
        </button>
      </div>
    </nav>
  );
}
