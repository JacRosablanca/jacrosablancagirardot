"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import GOOGLE_SHEETS_API_KEY from "@/config/googleApiKey";

// IDs y rangos para Google Sheets
const SHEET_ID = "1eXaCAyfkWY1ac-5KitWPKETMoSvAzuyp_NVZfYH5NDI";
const HEADER_RANGE = "Header!A2:M2"; // Solo la primera fila de datos

type HeaderData = {
  TipoOac: string;
  TipoUrbanismo: string;
  NombreOac: string;
  Lema: string;
  NumeroNit: string;
  NumeroPersoneria: string;
  FechaPersoneria: string;
  ExpedidoPor: string;
  NumeroRuc: string;
  Ciudad: string;
  Departamento: string;
  LogoDer: string;
  LogoIzq: string;
};

function parseHeaderRow(row: string[]): HeaderData {
  return {
    TipoOac: row[0] || "",
    TipoUrbanismo: row[1] || "",
    NombreOac: row[2] || "",
    Lema: row[3] || "",
    NumeroNit: row[4] || "",
    NumeroPersoneria: row[5] || "",
    FechaPersoneria: row[6] || "",
    ExpedidoPor: row[7] || "",
    NumeroRuc: row[8] || "",
    Ciudad: row[9] || "",
    Departamento: row[10] || "",
    LogoDer: row[11] || "",
    LogoIzq: row[12] || "",
  };
}

export default function Header() {
  const [hora, setHora] = useState("");
  const [ciudad, setCiudad] = useState("...");
  const [header, setHeader] = useState<HeaderData | null>(null);

  // Obtener datos del header desde Google Sheets
  useEffect(() => {
    async function fetchHeader() {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${HEADER_RANGE}?alt=json&key=${GOOGLE_SHEETS_API_KEY}`; // Debes poner tu propia API KEY aquí
        // Alternativa pública (sin API key, pero menos confiable):
        // const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Header&range=A2:M2`;
        const response = await fetch(url);
        const data = await response.json();
        // data.values es un array de arrays
        if (data.values && data.values.length > 0) {
          setHeader(parseHeaderRow(data.values[0]));
        }
      } catch {
        setHeader(null);
      }
    }
    fetchHeader();
  }, []);

  // Obtener hora local
  useEffect(() => {
    const updateHora = () => {
      const now = new Date();
      const horaStr = now.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setHora(horaStr);
    };
    updateHora();
    const interval = setInterval(updateHora, 1000);
    return () => clearInterval(interval);
  }, []);

  // Solicitar permisos y obtener ciudad
  useEffect(() => {
    // Solicitar permisos de cámara y micrófono
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).catch(() => {});
    }
    // Solicitar ubicación
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Geocodificación inversa usando Nominatim
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            if (data.address && (data.address.city || data.address.town || data.address.village)) {
              setCiudad(data.address.city || data.address.town || data.address.village);
            } else if (data.address && data.address.state) {
              setCiudad(data.address.state);
            } else {
              setCiudad("Ciudad desconocida");
            }
          } catch {
            setCiudad("Ciudad desconocida");
          }
        },
        () => setCiudad("Permiso denegado")
      );
    } else {
      setCiudad("No disponible");
    }
  }, []);

  // Valores por defecto si no hay datos del sheet
  const nombreOac = header
    ? [header.TipoOac, header.TipoUrbanismo, header.NombreOac].filter(Boolean).join(" ")
    : "";
  const lema = header?.Lema;
  const nit = header?.NumeroNit || "";
  const personeria = header?.NumeroPersoneria
    ? `PERSONERIA JURIDICA ${header.NumeroPersoneria}${header.FechaPersoneria ? " DE " + header.FechaPersoneria : ""}`
    : "";
  const ruc = header?.NumeroRuc ? `RUC. ${header.NumeroRuc}` : "";
  const ciudadHeader = header?.Ciudad || "";
  const departamento = header?.Departamento || "";
  const logoIzq = header?.LogoIzq || "";
  const logoDer = header?.LogoDer || "";

  return (
    <>
      {/* HEADER */}
      <header className="w-full flex flex-col items-center bg-white dark:bg-[#23232a] shadow-none border-none m-0 p-0">
        <div className="w-full flex items-center justify-between">
          {/* Logo Izquierdo */}
          <div
            className="flex-shrink-0 flex items-center justify-center m-0 p-0"
            style={{ width: 120 }}
          >
            {logoIzq ? (
              <Image
                src={logoIzq}
                alt="Logo Izquierdo"
                width={110}
                height={110}
                className="object-contain drop-shadow-none rounded-none m-0 p-0"
                priority
              />
            ) : null}
          </div>
          {/* Texto Central */}
          <div className="flex flex-col items-center text-center flex-1 m-0 p-0">
            <h1 className="font-extrabold text-base md:text-lg leading-none text-gray-900 dark:text-white tracking-tight m-0 p-0">
              {nombreOac}
            </h1>
            <div className="text-[0.9em] font-semibold italic text-gray-900 dark:text-white m-0 p-0">
              {lema}
            </div>
            <div className="font-medium text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-none m-0 p-0">
              <div className="m-0 p-0">{nit}</div>
              <div className="m-0 p-0">{personeria}</div>
              <div className="m-0 p-0">{ruc}</div>
              <div className="m-0 p-0">{ciudadHeader}, {departamento}</div>
              <div className="m-0 p-0 text-xs md:text-sm text-gray-700 dark:text-gray-300 font-normal italic">
                En {ciudad}, son las: {hora}
              </div>
            </div>
          </div>
          {/* Logo Derecho */}
          <div
            className="flex-shrink-0 flex items-center justify-center m-0 p-0"
            style={{ width: 120 }}
          >
            {logoDer ? (
              <Image
                src={logoDer}
                alt="Logo Derecho"
                width={75}
                height={75}
                className="object-contain drop-shadow-none rounded-none m-0 p-0"
                priority
              />
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
}