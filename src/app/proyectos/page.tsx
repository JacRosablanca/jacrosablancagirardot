"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProyectosPage() {
  const proyectos = [
    {
      titulo: "Salón Comunal Rosa Blanca",
      descripcion: "Un espacio comunitario para el barrio, construido con apoyo de IDACO y MININTERIOR.",
      imagen: "/LogoJac.png",
      enlace: "/proyectos/salon-comunal",
    },
    {
      titulo: "Candidatos al Consejo Municipal de Juventudes de Girardot",
      descripcion: "Fomentando la participación juvenil y el liderazgo en la comunidad.",
      imagen: "/LogoJac.png",
      enlace: "/proyectos/jovenes-en-accion-por-rosa-blanca",
    },
    {
      titulo: "Dotaciones",
      descripcion: "Gestión de recursos y dotaciones para fortalecer el trabajo comunitario.",
      imagen: "/LogoJac.png",
      enlace: "/proyectos/dotaciones",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-[#19295A] dark:text-blue-200 mb-12">
        Nuestros Proyectos Comunitarios
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {proyectos.map((proyecto, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            <Image
              src={proyecto.imagen}
              alt={proyecto.titulo}
              width={800}
              height={400}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#19295A] dark:text-blue-300 mb-2">
                {proyecto.titulo}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {proyecto.descripcion}
              </p>
              <Link
                href={proyecto.enlace}
                className="inline-block px-4 py-2 bg-[#19295A] text-white rounded-lg hover:bg-[#1f3a7a] transition-colors"
              >
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
