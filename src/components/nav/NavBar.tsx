"use client";

import Link from "next/link";
import { useState } from "react";

interface NavBarProps {
  dark?: boolean;
  setDark?: (v: boolean) => void;
}

function NavBar({ dark = true }: NavBarProps) {
  const [open, setOpen] = useState(false);

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
          md:flex md:flex-row md:justify-center md:items-center md:gap-8
        `}
      >
        <li>
          <Link href="/" className="hover:underline hover:text-lime-300 transition-colors">Inicio</Link>
        </li>
        <li>
          <Link href="#" className="hover:underline hover:text-lime-300 transition-colors">Tienda</Link>
        </li>
        <li>
          <Link href="#" className="hover:underline hover:text-lime-300 transition-colors">Sobre la Corporación</Link>
        </li>
        <li>
          <Link href="#" className="hover:underline hover:text-lime-300 transition-colors">Multimedia</Link>
        </li>
        <li>
          <Link href="#" className="hover:underline hover:text-lime-300 transition-colors">Contacto</Link>
        </li>
        <li>
          <Link
            href="#"
            className={`font-bold hover:underline transition-colors ${dark ? "hover:text-yellow-300" : "hover:text-blue-700"}`}
          >
            Ingresar
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
