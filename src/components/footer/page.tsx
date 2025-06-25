"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import GOOGLE_SHEETS_API_KEY from "@/config/googleApiKey";

// IDs y rangos para Google Sheets
const SHEET_ID = "1eXaCAyfkWY1ac-5KitWPKETMoSvAzuyp_NVZfYH5NDI";
const FOOTER_RANGE = "Footer!A2:H2";

type FooterData = {
  DireccionSede: string;
  BarrioVereda: string;
  LlamadasYWhatsapp: string;
  CorreoElectronico: string;
  EscudoPais: string;
  EscudoDepto: string;
  EscudoMunicipio: string;
  LogoIVC: string;
};

function parseFooterRow(row: string[]): FooterData {
  return {
    DireccionSede: row[0] || "",
    BarrioVereda: row[1] || "",
    LlamadasYWhatsapp: row[2] || "",
    CorreoElectronico: row[3] || "",
    EscudoPais: row[4] || "",
    EscudoDepto: row[5] || "",
    EscudoMunicipio: row[6] || "",
    LogoIVC: row[7] || "",
  };
}

export default function Footer() {
  const [footer, setFooter] = useState<FooterData | null>(null);

  useEffect(() => {
    async function fetchFooter() {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${FOOTER_RANGE}?alt=json&key=${GOOGLE_SHEETS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.values && data.values.length > 0) {
          setFooter(parseFooterRow(data.values[0]));
        }
      } catch {
        setFooter(null);
      }
    }
    fetchFooter();
  }, []);

  const direccion = footer?.DireccionSede || "";
  const barrio = footer?.BarrioVereda || "";
  const llamadas = footer?.LlamadasYWhatsapp || "";
  const correo = footer?.CorreoElectronico || "";
  const escudoPais = footer?.EscudoPais || "";
  const escudoDepto = footer?.EscudoDepto || "";
  const escudoMunicipio = footer?.EscudoMunicipio || "";
  const logoIVC = footer?.LogoIVC || "";

  return (
    <footer className="w-full bg-white dark:bg-[#23232a] border-t border-gray-200 dark:border-gray-700 py-6 mt-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="font-semibold">{direccion}</div>
          <div className="text-sm">{barrio}</div>
          <div className="text-sm">Tel/WhatsApp: {llamadas}</div>
          <div className="text-sm">Correo: {correo}</div>
        </div>
        <div className="flex flex-row items-center gap-4">
          {escudoPais ? (
            <Image src={escudoPais} alt="Escudo País" width={40} height={40} className="object-contain" />
          ) : null}
          {escudoDepto ? (
            <Image src={escudoDepto} alt="Escudo Depto" width={40} height={40} className="object-contain" />
          ) : null}
          {escudoMunicipio ? (
            <Image src={escudoMunicipio} alt="Escudo Municipio" width={40} height={40} className="object-contain" />
          ) : null}
          {logoIVC ? (
            <Image src={logoIVC} alt="Logo IVC" width={40} height={40} className="object-contain" />
          ) : null}
        </div>
      </div>
    </footer>
  );
}