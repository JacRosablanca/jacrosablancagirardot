"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Proyecto = {
  titulo: string;
  anio: string;
  estado: string;
  doc: string;
  rendicion?: string;
  fotos: string[];
};

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [categoria, setCategoria] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number[]>([]);

  const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSwtuU0FppmVmUZr3jILmaeLoSxL3VWrAd594QXl3xSUbPMPQMTur03gTKVq-equTQTjrvH8tJ3krrZ/pub?gid=0&single=true&output=csv";

  // Limpia celdas con errores tipo #NAME? o #REF!
  const cleanCell = (value: string): string => {
    if (!value) return "";
    if (/^#(NAME|REF|VALUE|DIV|N\/A)[!?/]*/i.test(value)) {
      return "";
    }
    return value.trim();
  };

  // Parser CSV robusto (respeta comillas y saltos de línea)
  const parseCSV = (text: string): string[][] => {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentValue = "";
    let insideQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"' && !insideQuotes) {
        insideQuotes = true;
      } else if (char === '"' && insideQuotes && nextChar === '"') {
        currentValue += '"';
        i++;
      } else if (char === '"' && insideQuotes) {
        insideQuotes = false;
      } else if (char === "," && !insideQuotes) {
        currentRow.push(currentValue);
        currentValue = "";
      } else if (char === "\n" && !insideQuotes) {
        currentRow.push(currentValue);
        rows.push(currentRow);
        currentRow = [];
        currentValue = "";
      } else {
        currentValue += char;
      }
    }

    if (currentValue || currentRow.length > 0) {
      currentRow.push(currentValue);
      rows.push(currentRow);
    }

    return rows;
  };

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const parsedRows = parseCSV(csvText);
        const headers = parsedRows.shift() || [];

        const data: Proyecto[] = parsedRows.map((cols) => {
          const rowObj: Record<string, string> = {};
          headers.forEach((header, idx) => {
            rowObj[header.trim()] = cleanCell(cols[idx] || "");
          });

          return {
            titulo: rowObj["NOMBRE DEL PROYECTO"] || "Proyecto sin nombre",
            anio: rowObj["AÑO"] || "",
            estado: (rowObj["ESTADO"] || "desconocido").toLowerCase().trim(),
            doc: rowObj["DOCUMENTACION"] || "#",
            rendicion: rowObj["RENDICION"] || "",
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
        setCurrentImageIndex(new Array(data.length).fill(0));
      })
      .catch((err) => console.error("Error cargando hoja:", err));
  }, []);

  const proyectosFiltrados = proyectos.filter((p) =>
    categoria ? p.estado === categoria : true
  );

  // Asigna colores según estado (incluyendo "en proceso" en naranja)
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "ejecutado":
        return "bg-green-500";
      case "postulado":
        return "bg-yellow-500";
      case "rechazado":
        return "bg-red-500";
      case "en proceso":
        return "bg-orange-500"; // Aquí color naranja
      default:
        return "bg-gray-400";
    }
  };

  // Convierte "en proceso" en "En Proceso"
  const formatEstado = (estado: string) =>
    estado
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const handlePrevImage = (index: number, total: number) => {
    setCurrentImageIndex((prev) => {
      const newIndexes = [...prev];
      newIndexes[index] = (prev[index] - 1 + total) % total;
      return newIndexes;
    });
  };

  const handleNextImage = (index: number, total: number) => {
    setCurrentImageIndex((prev) => {
      const newIndexes = [...prev];
      newIndexes[index] = (prev[index] + 1) % total;
      return newIndexes;
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-[#19295A] dark:text-blue-200 mb-8">
        Historial de Proyectos Comunitarios
      </h1>

      {/* Botones de filtro */}
      <div className="flex justify-center flex-wrap gap-3 mb-8">
        {["ejecutado", "postulado", "rechazado", "en proceso"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(categoria === cat ? null : cat)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              categoria === cat
                ? "bg-[#19295A] text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            }`}
          >
            {formatEstado(cat)}
          </button>
        ))}
      </div>

      {/* Tarjetas de proyectos */}
      <div className="flex flex-wrap justify-center gap-8">
        {proyectosFiltrados.map((proyecto, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition max-w-xs"
          >
            {/* Carrusel */}
            <div className="relative w-full h-56">
              {proyecto.fotos.length > 0 ? (
                <Image
                  src={proyecto.fotos[currentImageIndex[idx]]}
                  alt={proyecto.titulo}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src="/LogoJac.png"
                  alt={proyecto.titulo}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
              )}
              {proyecto.fotos.length > 1 && (
                <>
                  <button
                    onClick={() => handlePrevImage(idx, proyecto.fotos.length)}
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600"
                  >
                    ◀
                  </button>
                  <button
                    onClick={() => handleNextImage(idx, proyecto.fotos.length)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600"
                  >
                    ▶
                  </button>
                </>
              )}
            </div>

            {/* Info */}
            <div className="p-6 flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-[#19295A] dark:text-blue-300">
                {proyecto.titulo}
                {!proyecto.titulo.includes(proyecto.anio) && proyecto.anio && (
                  <span className="text-gray-500"> ({proyecto.anio})</span>
                )}
              </h2>

              <span
                className={`inline-block px-3 py-1 text-white rounded-lg text-sm font-semibold ${getEstadoColor(
                  proyecto.estado
                )}`}
              >
                {formatEstado(proyecto.estado)}
              </span>

              <div className="flex gap-4">
                <Link
                  href={proyecto.doc}
                  target="_blank"
                  className="flex-1 text-center px-4 py-2 bg-[#19295A] text-white rounded-lg hover:bg-[#1f3a7a] transition-colors"
                >
                  Documentación
                </Link>
                {proyecto.rendicion && (
                  <Link
                    href={proyecto.rendicion}
                    target="_blank"
                    className="flex-1 text-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Inversión
                  </Link>
                )}
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
