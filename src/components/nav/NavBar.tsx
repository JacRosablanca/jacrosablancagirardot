"use client";

import Link from "next/link";

interface NavBarProps {
  dark?: boolean;
}

function NavBar({ dark = true }: NavBarProps) {
  return (
    <nav className={`w-full py-2 border-t border-b ${dark ? "bg-[#1B2A5B] border-[#22306b]" : "bg-white border-blue-200"}`}>
      <ul className={`flex justify-center gap-8 font-medium text-base md:text-lg transition-colors duration-500 ${dark ? "text-white" : "text-[#1B2A5B]"}`}>
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
