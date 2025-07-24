"use client";

import { useState } from "react";

export default function DonacionPage() {
  const [monto, setMonto] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");

  // Motivo fijo de la donación (actualizado)
  const motivo =
    "Donación para apoyar la construcción de la segunda fase del salón comunal";

  // Formatear monto con puntos de miles
  const formatNumber = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (!numericValue) return "";
    return new Intl.NumberFormat("es-CO").format(Number(numericValue));
  };

  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setMonto(formatNumber(rawValue));
  };

  // Validar número de teléfono (máximo 10 dígitos)
  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "").slice(0, 10);
    setTelefono(rawValue);
  };

  const handleDonate = () => {
    const numericMonto = Number(monto.replace(/\./g, ""));
    if (!numericMonto || numericMonto < 1000) {
      alert("Por favor ingresa un monto válido (mínimo $1.000).");
      return;
    }
    if (!telefono || telefono.length < 10) {
      alert("Por favor ingresa un número de Nequi o Daviplata válido.");
      return;
    }
    alert(
      `Procesando donación de $${numericMonto.toLocaleString(
        "es-CO"
      )} COP desde ${telefono}.\nMotivo: ${motivo}`
    );
  };

  return (
    <div className="max-w-lg mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-[#19295A] dark:text-blue-200 mb-6">
        Haz tu Donación
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
        Dona de forma rápida usando <span className="font-semibold">Nequi</span> o{" "}
        <span className="font-semibold">Daviplata</span>. Solo ingresa tu número y el monto.
      </p>

      {/* Motivo fijo */}
      <div className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 text-center px-4 py-3 rounded-lg mb-8 font-medium">
        {motivo}
      </div>

      {/* Campo para número */}
      <div className="flex flex-col items-center mb-6">
        <label className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
          Tu número de Nequi o Daviplata
        </label>
        <input
          type="text"
          value={telefono}
          onChange={handleTelefonoChange}
          placeholder="Ej: 3001234567"
          className="px-4 py-2 w-64 rounded-lg border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-blue-400 text-center
                     text-gray-800 dark:text-gray-100
                     placeholder-gray-400 dark:placeholder-gray-500
                     bg-white dark:bg-[#1a1a1a]"
        />
      </div>

      {/* Campo para monto */}
      <div className="flex flex-col items-center mb-8">
        <label className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
          Monto a donar (COP)
        </label>
        <input
          type="text"
          value={monto}
          onChange={handleMontoChange}
          placeholder="Ej: 20.000"
          className="px-4 py-2 w-64 rounded-lg border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-blue-400 text-center
                     text-gray-800 dark:text-gray-100
                     placeholder-gray-400 dark:placeholder-gray-500
                     bg-white dark:bg-[#1a1a1a]"
        />
      </div>

      {/* Botón de donación */}
      <div className="flex justify-center">
        <button
          onClick={handleDonate}
          className="px-6 py-3 bg-[#19295A] text-white text-lg font-semibold rounded-full 
             hover:bg-[#1f3a7a] transition-colors"
        >
          Donar Ahora
        </button>
      </div>

      <div className="mt-10 text-center text-gray-600 dark:text-gray-400">
        Recibirás instrucciones para completar la donación vía Nequi o Daviplata.
      </div>
    </div>
  );
}
