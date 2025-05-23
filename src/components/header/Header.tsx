"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  dark?: boolean;
}

function Header({ dark = true }: HeaderProps) {
  const [dateTime, setDateTime] = useState<string>("");

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
          src="/Logo.png"
          alt="Mercado Comunitario Girardot"
          width={80}
          height={80}
          className="object-contain"
        />
      </Link>
      {/* Título y subtítulo */}
      <div className="flex flex-col items-center flex-1">
        <h1 className={`font-bold text-center drop-shadow-lg tracking-wide ${dark ? "text-2xl md:text-3xl text-white" : "text-2xl md:text-3xl text-[#1B2A5B]"}`}>
          Mercado Comunitario Girardot
        </h1>
        <span className={`mt-1 text-center ${dark ? "text-blue-200" : "text-[#3b3b3b]"} text-sm md:text-base font-medium tracking-wide`}>
          Apoyando lo nuestro
        </span>
        <span className={`mt-1 text-center ${dark ? "text-blue-300" : "text-[#22306b]"} text-xs md:text-sm font-mono`}>
          {dateTime}
        </span>
      </div>
      {/* Logo derecha */}
      <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#232b45] shadow-lg overflow-hidden flex items-center justify-center border-4 border-[#22306b]">
        <Image
          src="/LogoJac.png"
          alt="Corporación Social Rosa Blanca"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>
    </header>
  );
}

export default Header;
