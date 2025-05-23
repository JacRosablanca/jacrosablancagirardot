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
        {/* <li>
          <Link href="/" className="hover:underline hover:text-lime-300 transition-colors">Tienda</Link>
        </li> */}
        <li>
          <Link href="/cartelera" className="hover:underline hover:text-lime-300 transition-colors">Cartelera</Link>
        </li>
        <li className="relative group">
          <Link href="/aliados" className="hover:underline hover:text-lime-300 transition-colors">Aliados</Link>
          {/* Submenú Aliados */}
          <ul className="absolute left-0 top-full mt-2 bg-[#1B2A5B] text-white rounded shadow-lg min-w-[180px] opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-200 z-20">
            <li>
              <Link href="/aliados/productores" className="block px-4 py-2 hover:bg-blue-900">Productores</Link>
            </li>
            <li>
              <Link href="/aliados/plazas" className="block px-4 py-2 hover:bg-blue-900">Plazas de Mercados Aliadas</Link>
            </li>
            <li>
              <Link href="/aliados/vivanderos" className="block px-4 py-2 hover:bg-blue-900">Vivanderos</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/quienes-somos" className="hover:underline hover:text-lime-300 transition-colors">Quienes Somos</Link>
        </li>
        <li>
          <Link href="/galeria" className="hover:underline hover:text-lime-300 transition-colors">Galería</Link>
        </li>
        <li>
          <Link
            href="/ingresar"
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
