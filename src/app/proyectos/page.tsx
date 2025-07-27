"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Proyecto = {
  titulo: string;
  anio: string;
  estado: string;
  descripcion: string;
  doc: string;
  fotos: string[];
};

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [categoria, setCategoria] = useState<string | null>(null);

  const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSwtuU0FppmVmUZr3jILmaeLoSxL3VWrAd594QXl3xSUbPMPQMTur03gTKVq-equTQTjrvH8tJ3krrZ/pub?gid=0&single=true&output=csv";

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const rows = csvText
          .split("\n")
          .filter((line) => line.trim() !== "");

        const headers = rows.shift()?.split(",") || [];

        const data: Proyecto[] = rows.map((row) => {
          // Parser robusto: soporta comillas, comas y saltos de línea
          const cols =
            row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)?.map((c) =>
              c.replace(/^"|"$/g, "")
            ) || [];

          const rowObj: Record<string, string> = {};
          headers.forEach((header, idx) => {
            rowObj[header.trim()] = cols[idx]?.trim() || "";
          });

          return {
            titulo: rowObj["NOMBRE DEL PROYECTO"] || "Proyecto sin nombre",
            anio: rowObj["AÑO"] || "",
            estado: (rowObj["ESTADO"] || "").toLowerCase().trim(),
            descripcion:
              rowObj["DESCRIPCION"]?.trim() || "Sin descripción disponible.",
            doc: rowObj["DOCUMENTACION"] || "#",
            fotos: [
              rowObj["FOTO 1"],
              rowObj["FOTO 2"],
              rowObj["FOTO 3"],
              rowObj["FOTO 4"],
              rowObj["FOTO 5"],
            ].filter(Boolean),
          };
        });

        setProyectos(data);
      })
      .catch((err) => console.error("Error cargando hoja:", err));
  }, []);

  const proyectosFiltrados = proyectos.filter((p) =>
    categoria ? p.estado === categoria : true
  );

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "ejecutado":
        return "bg-green-500";
      case "postulado":
        return "bg-yellow-500";
      case "rechazado":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  function Carrusel({ imagenes }: { imagenes: string[] }) {
    const [index, setIndex] = useState(0);

    const prev = () =>
      setIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
    const next = () =>
      setIndex((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));

    if (!imagenes.length) {
      return (
        <Image
          src="/LogoJac.png"
          alt="Logo"
          width={800}
          height={400}
          className="w-full h-56 object-cover"
        />
      );
    }

    return (
      <div className="relative w-full h-56">
        <Image
          src={imagenes[index]}
          alt={`Imagen ${index + 1}`}
          width={800}
          height={400}
          className="w-full h-56 object-cover"
        />
        {imagenes.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full px-2 py-1"
            >
              ◀
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full px-2 py-1"
            >
              ▶
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-[#19295A] dark:text-blue-200 mb-8">
        Historial de Proyectos Comunitarios
      </h1>

      <div className="flex justify-center flex-wrap gap-3 mb-8">
        {["ejecutado", "postulado", "rechazado"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(categoria === cat ? null : cat)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              categoria === cat
                ? "bg-[#19295A] text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {proyectosFiltrados.map((proyecto, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition max-w-xs"
          >
            <Carrusel imagenes={proyecto.fotos} />
            <div className="p-6 flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-[#19295A] dark:text-blue-300">
                {proyecto.titulo}{" "}
                {proyecto.anio && (
                  <span className="text-gray-500">({proyecto.anio})</span>
                )}
              </h2>

              <span
                className={`inline-block px-3 py-1 text-white rounded-lg text-sm font-semibold ${getEstadoColor(
                  proyecto.estado
                )}`}
              >
                {proyecto.estado.charAt(0).toUpperCase() +
                  proyecto.estado.slice(1)}
              </span>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {proyecto.descripcion}
              </p>

              <div className="flex gap-4">
                <Link
                  href="#"
                  className="flex-1 text-center px-4 py-2 bg-[#19295A] text-white rounded-lg hover:bg-[#1f3a7a] transition-colors"
                >
                  Ver más
                </Link>
                <Link
                  href={proyecto.doc}
                  target="_blank"
                  className="flex-1 text-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Documentación
                </Link>
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
