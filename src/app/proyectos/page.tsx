"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProyectosPage() {
  const proyectos = [
    { titulo: "Dotaciones 2022", descripcion: "Recursos gestionados con el Ministerio para la comunidad.", imagen: "/LogoJac.png", enlace: "/proyectos/dotaciones", doc: "#", estado: "ejecutado", anio: 2022 },
    { titulo: "Salón Comunal Rosa Blanca - Primera Fase", descripcion: "Construido con apoyo de IDACO en 2022.", imagen: "/LogoJac.png", enlace: "/proyectos/salon-comunal?fase=primera", doc: "#", estado: "ejecutado", anio: 2022 },
    { titulo: "Caminos para la Paz", descripcion: "Propuesta de mejoramiento vial con INVÍAS.", imagen: "/LogoJac.png", enlace: "#", doc: "#", estado: "rechazado", anio: 2023 },
    { titulo: "Mejoramientos de Vivienda", descripcion: "Proyecto presentado al Ministerio de Vivienda.", imagen: "/LogoJac.png", enlace: "#", doc: "#", estado: "rechazado", anio: 2023 },
    { titulo: "Salón Comunal - Segunda Fase (2023)", descripcion: "Postulación al Ministerio del Interior (rechazado).", imagen: "/LogoJac.png", enlace: "/proyectos/salon-comunal?fase=segunda", doc: "#", estado: "rechazado", anio: 2023 },
    { titulo: "Placa Huella Rural", descripcion: "Proyecto presentado a IDACO (rechazado).", imagen: "/LogoJac.png", enlace: "#", doc: "#", estado: "rechazado", anio: 2024 },
    { titulo: "Consejo Municipal de Juventudes", descripcion: "Lista Jóvenes en Acción por Rosa Blanca para elecciones juveniles.", imagen: "/LogoJac.png", enlace: "/proyectos/jovenes-en-accion-por-rosa-blanca", doc: "#", estado: "postulado", anio: 2025 },
    { titulo: "Salón Comunal - Segunda Fase (2025)", descripcion: "Postulación al Ministerio del Interior para su ejecución.", imagen: "/LogoJac.png", enlace: "/proyectos/salon-comunal?fase=segunda", doc: "#", estado: "postulado", anio: 2025 }
  ];

  const [categoria, setCategoria] = useState<string | null>(null);
  const [anioFiltro, setAnioFiltro] = useState<number | null>(null);

  const aniosDisponibles = [2022, 2023, 2024, 2025, 2026];

  const proyectosFiltrados = proyectos.filter((p) => {
    const coincideCategoria = categoria ? p.estado === categoria : true;
    const coincideAnio = anioFiltro ? p.anio === anioFiltro : true;
    return coincideCategoria && coincideAnio;
  });

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-[#19295A] dark:text-blue-200 mb-8">
        Historial de Proyectos Comunitarios
      </h1>

      <div className="flex justify-center flex-wrap gap-3 mb-6">
        { ["ejecutado", "postulado", "rechazado"].map((cat) => (
          <button key={cat} onClick={() => setCategoria(categoria === cat ? null : cat)} className={`px-4 py-2 rounded-full font-semibold transition-colors ${categoria === cat ? "bg-[#19295A] text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"}`}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</button>
        )) }
      </div>

      <div className="flex justify-center flex-wrap gap-3 mb-10">
        { aniosDisponibles.map((anio) => (
          <button key={anio} onClick={() => setAnioFiltro(anioFiltro === anio ? null : anio)} className={`px-4 py-2 rounded-full font-semibold transition-colors ${anioFiltro === anio ? "bg-[#19295A] text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"}`}>{anio}</button>
        )) }
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {proyectosFiltrados.map((proyecto, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition max-w-xs">
            <Image src={proyecto.imagen} alt={proyecto.titulo} width={800} height={400} className="w-full h-56 object-cover" />
            <div className="p-6 flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-[#19295A] dark:text-blue-300 mb-2">{proyecto.titulo}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{proyecto.descripcion}</p>
              <div className="flex gap-4">
                <Link href={proyecto.enlace} className="flex-1 text-center px-4 py-2 bg-[#19295A] text-white rounded-lg hover:bg-[#1f3a7a] transition-colors">Ver más</Link>
                <Link href={proyecto.doc} className="flex-1 text-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">Documentación</Link>
              </div>
            </div>
          </div>
        ))}

        {proyectosFiltrados.length === 0 && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No hay proyectos registrados en este filtro.
          </p>
        )}
      </div>
    </div>
  );
}