"use client";

import Link from "next/link";
import { useState } from "react";

interface NavBarProps {
  dark?: boolean;
}

function NavBar({ dark = true }: NavBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`w-full py-2 border-t border-b ${dark ? "bg-[#1B2A5B] border-[#22306b]" : "bg-white border-blue-200"}`}>
      {/* Botón hamburguesa solo visible en pantallas pequeñas */}
      <div className="flex justify-end md:hidden px-4">
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
