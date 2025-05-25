"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import usuarios from '@/datos/usuarios.json';

interface HeaderProps {
  dark?: boolean;
}

function Header({ dark = true }: HeaderProps) {
  const [dateTime, setDateTime] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateDateTime() {
      const now = new Date();
      const fechaOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "America/Bogota",
      };
      const hora = now.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "America/Bogota",
      });
      const fecha = now.toLocaleDateString("es-CO", fechaOptions);
      setDateTime(`En Girardot, son las ${hora} del ${fecha}`);
    }
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const usuario = formData.get("usuario")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    
    const userValid = usuarios.find(user => 
      user.usuario === usuario && user.contrasena === password
    );

    if (userValid) {
      setUserName(usuario);
      setFullName(userValid.nombres);
      localStorage.setItem("userName", usuario);
      localStorage.setItem("fullName", userValid.nombres);
      setShowLoginModal(false);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedFullName = localStorage.getItem("fullName");
    
    if (storedUserName) setUserName(storedUserName);
    if (storedFullName) setFullName(storedFullName);
  }, []);

  return (
    <header
      className={`w-full py-4 px-8 flex items-center justify-between shadow-xl border-b-4 border-[#232b45] 
      ${dark
        ? "bg-gradient-to-r from-[#141a2e] via-[#1a2240] to-[#22306b]"
        : "bg-gradient-to-r from-white via-blue-100 to-lime-100"
      }`}
    >
      {/* Logo izquierda con enlace a la página principal */}
      <Link href="/" className="flex-shrink-0 w-20 h-20 rounded-full bg-[#232b45] shadow-lg overflow-hidden flex items-center justify-center border-4 border-[#22306b]">
        <Image
          src="/LogoJac.png"
          alt="Mercado Comunitario Girardot"
          width={80}
          height={80}
          className="object-contain"
        />
      </Link>
      {/* Título y subtítulo */}
      <div className="flex flex-col items-center flex-1">
        <h1 className={`font-bold text-center drop-shadow-lg tracking-wide ${dark ? "text-xl md:text-2xl text-white" : "text-xl md:text-2xl text-[#1B2A5B]"}`}>
          Junta de Acción Comunal del Barrio de Rosa Blanca
        </h1>
        <h2 className={`font-semibold text-center ${dark ? "text-white" : "text-[#1B2A5B]"} text-lg md:text-xl`}>
          La unión hace la fuerza
        </h2>
        <div className={`mt-2 text-center ${dark ? "text-blue-200" : "text-[#3b3b3b]"} text-sm md:text-base space-y-0.5`}>
          <p>NIT: 808.002.688-7</p>
          <p>RUC: 15-1884-3053</p>
          <p>PERSONERIA JURIDICA: 00103 del 17 de enero de 1962</p>
          <p>Expedido por: Ministerio de Justicia</p>
          <p>Ubicación: Girardot, Cundinamarca, Colombia</p>
        </div>
        <span className={`mt-2 text-center ${dark ? "text-blue-300" : "text-[#22306b]"} text-xs md:text-sm font-mono`}>
          {dateTime}
        </span>
        <div className="relative mt-1 self-end">
          {userName ? (
            <div ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-sm text-gray-300 hover:underline hover:text-lime-300 transition-colors flex items-center space-x-1"
              >
                <span>Conectado como: {fullName}</span>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1B2A5B] rounded-md shadow-xl z-10">
                  <Link href={`/panel/${userName}`} className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-700 hover:text-white">
                    Panel
                  </Link>
                  <Link href={`/panel/${userName}/configuracion/perfil`} className="block px-4 py-2 text-sm text-gray-300 hover:bg-blue-700 hover:text-white">
                    Perfil
                  </Link>
                  <button
                    onClick={() => {
                      setUserName(null);
                      setFullName(null);
                      localStorage.removeItem("userName");
                      localStorage.removeItem("fullName");
                      setIsDropdownOpen(false);
                    }}
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
              className="text-sm text-gray-300 hover:underline hover:text-lime-300 transition-colors"
            >
              Ingresar
            </button>
          )}
        </div>
      </div>
      {/* Logo derecha */}
      <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#232b45] shadow-lg overflow-hidden flex items-center justify-center border-4 border-[#22306b]">
        <Image
          src="/LogoComunal.png"
          alt="Corporación Social Rosa Blanca"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>
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
    </header>
  );
}

export default Header;
