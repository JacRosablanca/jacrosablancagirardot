"use client";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/nav/NavBar";
import { useState } from "react";

export default function PagosPage() {
  const [dark, setDark] = useState(true);

  return (
    <div
      className={`${
        dark
          ? "bg-[#141a2e] text-white"
          : "bg-gradient-to-br from-white via-blue-100 to-lime-100 text-[#1B2A5B]"
      } min-h-screen flex flex-col transition-colors duration-500`}
    >
      <Header dark={dark} />
      <NavBar dark={dark} setDark={setDark} />
      <main className="flex flex-col items-center justify-center flex-1 min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-6">Pago</h1>
        <div className="bg-white/90 rounded-xl shadow-lg p-8 flex flex-col items-center gap-6 w-full max-w-md">
          <p className="text-[#1B2A5B] text-lg mb-4 text-center">
            Aquí podrás realizar el pago de tu compra.<br />
            (Integración de pasarela de pago próximamente)
          </p>
          <button
            className="bg-[#1B2A5B] text-white font-bold py-2 px-6 rounded hover:bg-blue-900 transition-colors"
            onClick={() => window.location.href = "/"}
          >
            Volver a la tienda
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
