"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface NavBarProps {
  dark?: boolean;
  setDark?: (v: boolean) => void;
}

function NavBar({ dark = true }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const usuario = formData.get('usuario') as string;
    setUserName(usuario);
    localStorage.setItem("userName", usuario); // Store username in localStorage
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setUserName(null);
    localStorage.removeItem("userName"); // Remove username from localStorage
    setIsDropdownOpen(false);
  };

  return (
    <nav className={`w-full border-t border-b ${dark ? "bg-[#1B2A5B] border-[#22306b]" : "bg-white border-blue-200"}`}>
      <div className="flex items-center justify-between px-4">
        {/* Logo izquierdo */}
        <div className="flex-1 flex items-center">
          {/* ...logo izquierdo si tienes... */}
        </div>
        {/* Botón hamburguesa solo en móvil */}
        <div className="md:hidden">
          <button
            aria-label="Abrir menú"
            className="focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <span className="block w-6 h-0.5 bg-current mb-1"></span>
            <span className="block w-6 h-0.5 bg-current mb-1"></span>
            <span className="block w-6 h-0.5 bg-current"></span>
          </button>
        </div>
      </div>
      <ul
        className={`
          ${dark ? "text-white" : "text-[#1B2A5B]"}
          font-medium text-base md:text-lg transition-colors duration-500
          gap-8
          ${open ? "flex" : "hidden"}
          flex-col items-center
          md:flex md:flex-row md:items-center md:px-8 md:relative
        `}
      >
        <div className="flex-1"/>
        <div className="flex items-center justify-center flex-1">
          <li>
            <Link href="/cartelera" className="hover:underline hover:text-lime-300 transition-colors">Cartelera</Link>
          </li>
        </div>
        <div className="flex-1 flex justify-end">
          <li>
            {userName ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-sm text-gray-300 hover:underline hover:text-lime-300 transition-colors flex items-center space-x-1"
                >
                  <span>Conectado como: {userName}</span>
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1B2A5B] rounded-md shadow-xl z-10">
                    <Link href="/perfil" className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-700 hover:text-white">
                      Perfil
                    </Link>
                    <Link href="/configuracion" className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-700 hover:text-white">
                      Configuración
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-700 hover:text-white w-full text-left"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-sm hover:underline hover:text-lime-300 transition-colors text-white"
              >
                Ingresar
              </button>
            )}
          </li>
        </div>
      </ul>

      {/* Modal de inicio de sesión */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1B2A5B] p-8 rounded-lg shadow-xl max-w-md w-full mx-4 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Iniciar Sesión</h2>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-gray-300 hover:text-white"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block mb-2" htmlFor="usuario">Usuario</label>
                <input
                  name="usuario"
                  type="text"
                  id="usuario"
                  className="w-full p-2 border rounded bg-[#232b45] border-[#22306b] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2" htmlFor="password">Contraseña</label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  className="w-full p-2 border rounded bg-[#232b45] border-[#22306b] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
