"use client";
import { useState } from "react";

export default function PanelPage() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [register, setRegister] = useState({ name: "", email: "", password: "" });

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-8">
      <h1 className="text-2xl font-bold mb-8 text-[#19295A] dark:text-white">Panel de Acceso</h1>
      <div className="w-full max-w-3xl flex flex-col md:flex-row gap-8">
        {/* Formulario Ingresar */}
        <form className="flex-1 bg-white dark:bg-[#23232a] rounded-lg shadow p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold mb-2">Ingresar</h2>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border rounded px-3 py-2"
            value={login.email}
            onChange={e => setLogin({ ...login, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border rounded px-3 py-2"
            value={login.password}
            onChange={e => setLogin({ ...login, password: e.target.value })}
          />
          <button type="submit" className="bg-blue-700 text-white rounded py-2 font-semibold hover:bg-blue-900 transition">
            Ingresar
          </button>
        </form>
        {/* Formulario Registrar */}
        <form className="flex-1 bg-white dark:bg-[#23232a] rounded-lg shadow p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold mb-2">Registrar</h2>
          <input
            type="text"
            placeholder="Nombre completo"
            className="border rounded px-3 py-2"
            value={register.name}
            onChange={e => setRegister({ ...register, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border rounded px-3 py-2"
            value={register.email}
            onChange={e => setRegister({ ...register, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border rounded px-3 py-2"
            value={register.password}
            onChange={e => setRegister({ ...register, password: e.target.value })}
          />
          <button type="submit" className="bg-blue-700 text-white rounded py-2 font-semibold hover:bg-blue-900 transition">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
