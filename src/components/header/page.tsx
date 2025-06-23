"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [hora, setHora] = useState("");
  const [ciudad, setCiudad] = useState("...");

  // Obtener hora local
  useEffect(() => {
    const updateHora = () => {
      const now = new Date();
      const horaStr = now.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setHora(horaStr);
    };
    updateHora();
    const interval = setInterval(updateHora, 1000);
    return () => clearInterval(interval);
  }, []);

  // Solicitar permisos y obtener ciudad
  useEffect(() => {
    // Solicitar permisos de cámara y micrófono
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).catch(() => {});
    }
    // Solicitar ubicación
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Geocodificación inversa usando Nominatim
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            if (data.address && (data.address.city || data.address.town || data.address.village)) {
              setCiudad(data.address.city || data.address.town || data.address.village);
            } else if (data.address && data.address.state) {
              setCiudad(data.address.state);
            } else {
              setCiudad("Ciudad desconocida");
            }
          } catch {
            setCiudad("Ciudad desconocida");
          }
        },
        () => setCiudad("Permiso denegado")
      );
    } else {
      setCiudad("No disponible");
    }
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="w-full flex flex-col items-center bg-white dark:bg-[#23232a] shadow-none border-none m-0 p-0">
        <div className="w-full flex items-center justify-between">
          {/* Logo Izquierdo */}
          <div
            className="flex-shrink-0 flex items-center justify-center m-0 p-0"
            style={{ width: 120 }}
          >
            <Image
              src="/LogoJac.png"
              alt="Logo JAC Rosa Blanca"
              width={110}
              height={110}
              className="object-contain drop-shadow-none rounded-none m-0 p-0"
              priority
            />
          </div>
          {/* Texto Central */}
          <div className="flex flex-col items-center text-center flex-1 m-0 p-0">
            <h1 className="font-extrabold text-base md:text-lg leading-none text-gray-900 dark:text-white tracking-tight m-0 p-0">
              JUNTA DE ACCION COMUNAL DEL BARRIO DE ROSA BLANCA
            </h1>
            <div className="text-[0.9em] font-semibold italic text-gray-900 dark:text-white m-0 p-0">
              La unión hace la fuerza
            </div>
            <div className="font-medium text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-none m-0 p-0">
              <div className="m-0 p-0">NIT. 808.002.688-7</div>
              <div className="m-0 p-0">PERSONERIA JURIDICA 103 DE 1962</div>
              <div className="m-0 p-0">RUC. 15-1884-3053</div>
              <div className="m-0 p-0">Girardot, Cundinamarca</div>
              <div className="m-0 p-0 text-xs md:text-sm text-gray-700 dark:text-gray-300 font-normal italic">
                En {ciudad}, son las: {hora}
              </div>
            </div>
          </div>
          {/* Logo Derecho */}
          <div
            className="flex-shrink-0 flex items-center justify-center m-0 p-0"
            style={{ width: 120 }}
          >
            <Image
              src="/LogoComunal.png"
              alt="Logo Acción Comunal"
              width={75}
              height={75}
              className="object-contain drop-shadow-none rounded-none m-0 p-0"
              priority
            />
          </div>
        </div>
      </header>
    </>
  );
}