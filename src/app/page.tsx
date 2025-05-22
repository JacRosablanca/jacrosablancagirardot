"use client";
import { useState } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/nav/NavBar";

export default function Home() {
  const [dark] = useState(true);

  return (
    <div className={`${dark ? "bg-[#141a2e]" : "bg-gradient-to-br from-white via-blue-100 to-lime-100"} min-h-screen flex flex-col transition-colors duration-500`}>
      <Header />
      <NavBar dark={dark} />
      <Footer />
    </div>
  );
}
