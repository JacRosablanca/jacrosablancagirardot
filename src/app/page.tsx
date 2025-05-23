"use client";
import { useState } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/nav/NavBar";

export default function Home() {
  const [dark, setDark] = useState(true);

  return (
    <div
      className={`${
        dark
          ? "bg-[#141a2e] text-white"
          : "bg-gradient-to-br from-white via-blue-100 to-lime-100 text-[#1B2A5B]"
      } min-h-screen flex flex-col transition-colors duration-500`}
    >
      <Header />
      <NavBar dark={dark} setDark={setDark} />
      {/* ...aquí tu contenido principal si lo hay... */}
      <div className="flex-1" />
      <Footer />
    </div>
  );
}
