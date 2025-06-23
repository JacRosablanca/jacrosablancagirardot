"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

function getToday() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function calcularEdad(fechaNacimiento: string) {
  if (!fechaNacimiento) return "";
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad.toString();
}

export default function PanelPage() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [showAffiliation, setShowAffiliation] = useState(false);
  const [affiliation, setAffiliation] = useState({
    numeroAfiliacion: "1", // El primer usuario es 1
    tipoAfiliacion: "REGISTRO",
    fechaAfiliacion: getToday(),
    estado: "",
    genero: "",
    nombreCompleto: "",
    tipoDocumento: "",
    numeroDocumento: "",
    cargo: "AFILIADO",
    direccion: "",
    fechaNacimiento: "",
    edad: "",
    ocupacion: "",
    comisionTrabajo: "",
    correo: "",
    prefijoPais: "+57",
    contacto: "",
    contactoTelefonico: "",
    contactoWhatsapp: "",
    urlWhatsapp: "",
    observaciones: "",
    folio: "",
    renglon: "",
    ubicacion: ""
  });

  // Estado para coordenadas
  const [coordenadas, setCoordenadas] = useState<{ lat: number; lng: number } | null>(null);

  // Carga dinámica del mapa solo en cliente
  const Map = dynamic(() => import("./UbicacionMap"), { ssr: false });

  // Actualiza coordenadas en el estado de afiliación
  useEffect(() => {
    if (coordenadas) {
      setAffiliation(a => ({
        ...a,
        ubicacion: `${coordenadas.lat},${coordenadas.lng}`
      }));
    }
  }, [coordenadas]);

  // Actualiza edad automáticamente al cambiar fecha de nacimiento
  const handleFechaNacimiento = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fechaNacimiento = e.target.value;
    setAffiliation(a => ({
      ...a,
      fechaNacimiento,
      edad: calcularEdad(fechaNacimiento)
    }));
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-8">
      <h1 className="text-2xl font-bold mb-8 text-[#19295A] dark:text-white">Panel de Acceso</h1>
      {!showAffiliation ? (
        <>
          <form className="w-full max-w-md bg-white dark:bg-[#23232a] rounded-xl shadow-lg p-8 flex flex-col gap-5 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-[#19295A] dark:text-blue-200">Ingresar</h2>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 bg-gray-50 dark:bg-[#23232a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={login.email}
              onChange={e => setLogin({ ...login, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="border border-gray-300 dark:border-gray-700 rounded px-4 py-2 bg-gray-50 dark:bg-[#23232a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={login.password}
              onChange={e => setLogin({ ...login, password: e.target.value })}
            />
            <button type="submit" className="bg-blue-700 text-white rounded py-2 font-semibold hover:bg-blue-900 transition">
              Ingresar
            </button>
          </form>
          <div className="mt-6 text-center text-base text-gray-700 dark:text-gray-200">
            ¿No tienes acceso?{" "}
            <button
              type="button"
              className="font-semibold text-blue-700 dark:text-blue-300 hover:underline bg-transparent border-none p-0 m-0"
              onClick={() => setShowAffiliation(true)}
            >
              Afíliate a la Junta de Acción Comunal
            </button>
          </div>
        </>
      ) : (
        <form className="w-full h-full min-h-[80vh] bg-white dark:bg-[#23232a] rounded-none shadow-none p-0 flex flex-col gap-6 border-none overflow-y-auto">
          <h2 className="text-3xl font-extrabold mb-8 text-[#19295A] dark:text-blue-200 tracking-tight text-center mt-8">Formulario de Afiliación</h2>
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            <input
              type="text"
              placeholder="Número de Afiliación"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-900 dark:text-gray-100"
              value={affiliation.numeroAfiliacion}
              readOnly
            />
            <input
              type="text"
              placeholder="Tipo de Afiliación"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-900 dark:text-gray-100"
              value={affiliation.tipoAfiliacion}
              readOnly
            />
            <input
              type="date"
              placeholder="Fecha de Afiliación"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-900 dark:text-gray-100"
              value={affiliation.fechaAfiliacion}
              readOnly
            />
            <select
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-[#23232a] text-gray-900 dark:text-gray-100"
              value={affiliation.genero}
              onChange={e => setAffiliation({ ...affiliation, genero: e.target.value })}
            >
              <option value="">Género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
            <input
              type="text"
              placeholder="Nombre completo del afiliado"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-[#23232a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-2"
              value={affiliation.nombreCompleto}
              onChange={e => setAffiliation({ ...affiliation, nombreCompleto: e.target.value })}
            />
            <select
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-[#23232a] text-gray-900 dark:text-gray-100"
              value={affiliation.tipoDocumento}
              onChange={e => setAffiliation({ ...affiliation, tipoDocumento: e.target.value })}
            >
              <option value="">Tipo de documento de identidad</option>
              <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
              <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
              <option value="Cédula de Extranjería">Cédula de Extranjería</option>
            </select>
            <input
              type="text"
              placeholder="Número de documento de identidad"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-[#23232a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={affiliation.numeroDocumento}
              onChange={e => setAffiliation({ ...affiliation, numeroDocumento: e.target.value })}
            />
            <input
              type="text"
              placeholder="Cargo"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-900 dark:text-gray-100"
              value={affiliation.cargo}
              readOnly
            />
            <input
              type="text"
              placeholder="Dirección de residencia"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-[#23232a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={affiliation.direccion}
              onChange={e => setAffiliation({ ...affiliation, direccion: e.target.value })}
            />
            <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
              <label className="font-semibold text-gray-700 dark:text-gray-200">Ubicación (selecciona en el mapa)</label>
              <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
                <Map setCoordenadas={setCoordenadas} coordenadas={coordenadas} />
              </div>
              <input
                type="text"
                placeholder="Coordenadas (lat,lng)"
                className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-2"
                value={affiliation.ubicacion || ""}
                readOnly
              />
            </div>
            <input
              type="date"
              placeholder="Fecha de nacimiento"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-[#23232a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={affiliation.fechaNacimiento}
              onChange={handleFechaNacimiento}
            />
            <input
              type="number"
              placeholder="Edad"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-900 dark:text-gray-100"
              value={affiliation.edad}
              readOnly
            />
            <input
              type="text"
              placeholder="Ocupación"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-[#23232a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={affiliation.ocupacion}
              onChange={e => setAffiliation({ ...affiliation, ocupacion: e.target.value })}
            />
            <select
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-[#23232a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={affiliation.comisionTrabajo}
              onChange={e => setAffiliation({ ...affiliation, comisionTrabajo: e.target.value })}
            >
              <option value="">Comisión de trabajo</option>
              <option value="Comisión de Cultura">Comisión de Cultura</option>
              <option value="Comisión de Deportes">Comisión de Deportes</option>
              <option value="Comisión de Medio Ambiente">Comisión de Medio Ambiente</option>
            </select>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-[#23232a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={affiliation.correo}
              onChange={e => setAffiliation({ ...affiliation, correo: e.target.value })}
            />
            <div className="flex">
              <input
                type="text"
                className="border border-gray-300 dark:border-gray-700 rounded-l-lg px-3 py-2 bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-900 dark:text-gray-100 w-20"
                value={affiliation.prefijoPais}
                readOnly
                tabIndex={-1}
              />
              <input
                type="text"
                placeholder="Contacto (número de teléfono)"
                className="border-t border-b border-r border-gray-300 dark:border-gray-700 rounded-r-lg px-4 py-2 bg-gray-50 dark:bg-[#23232a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
                value={affiliation.contacto}
                onChange={e => setAffiliation({ ...affiliation, contacto: e.target.value })}
              />
            </div>
            <textarea
              placeholder="Observaciones"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-50 dark:bg-[#23232a] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-2 min-h-[80px] text-justify resize-y"
              value={affiliation.observaciones}
              onChange={e => setAffiliation({ ...affiliation, observaciones: e.target.value })}
              style={{ textAlign: "justify" }}
            />
            <input
              type="text"
              placeholder="Folio"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-900 dark:text-gray-100"
              value={affiliation.folio}
              readOnly
            />
            <input
              type="text"
              placeholder="Renglón"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-900 dark:text-gray-100"
              value={affiliation.renglon}
              readOnly
            />
            <input
              type="url"
              placeholder="URL Perfil Afiliado"
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800 cursor-not-allowed text-gray-900 dark:text-gray-100 col-span-1 md:col-span-2"
              value={
                (typeof window !== "undefined"
                  ? `${window.location.origin}/panel/afiliado/${affiliation.numeroDocumento}`
                  : `https://jacrosablancagirardot.vercel.app/panel/afiliado/${affiliation.numeroDocumento}`)
              }
              readOnly
            />
          </div>
          <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-4 px-4 mt-8 mb-8">
            <button type="submit" className="flex-1 bg-blue-700 text-white rounded-lg py-3 font-bold hover:bg-blue-900 transition text-lg">
              Afiliarme
            </button>
            <button
              type="button"
              className="flex-1 text-sm text-gray-500 hover:underline mt-2 md:mt-0"
              onClick={() => setShowAffiliation(false)}
            >
              Volver a Ingresar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}