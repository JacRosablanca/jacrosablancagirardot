"use client";
import { useState } from "react";

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
    numeroAfiliacion: Math.floor(Math.random() * 1000000).toString(),
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
    renglon: ""
  });

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
          <form className="w-full max-w-md bg-white dark:bg-[#23232a] rounded-lg shadow p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold mb-2">Ingresar</h2>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="border rounded px-3 py-2"
              value={login.email}
              onChange={e => setLogin({ ...login, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="border rounded px-3 py-2"
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
        <form className="w-full max-w-md bg-white dark:bg-[#23232a] rounded-lg shadow p-6 flex flex-col gap-3 overflow-y-auto max-h-[80vh]">
          <h2 className="text-lg font-semibold mb-2">Formulario de Afiliación</h2>
          <input
            type="text"
            placeholder="Número de Afiliación"
            className="border rounded px-3 py-2"
            value={affiliation.numeroAfiliacion}
            readOnly
          />
          <input
            type="text"
            placeholder="Tipo de Afiliación"
            className="border rounded px-3 py-2"
            value={affiliation.tipoAfiliacion}
            readOnly
          />
          <input
            type="date"
            placeholder="Fecha de Afiliación"
            className="border rounded px-3 py-2"
            value={affiliation.fechaAfiliacion}
            readOnly
          />
          <input
            type="text"
            placeholder="Estado"
            className="border rounded px-3 py-2"
            value={affiliation.estado}
            onChange={e => setAffiliation({ ...affiliation, estado: e.target.value })}
          />
          <input
            type="text"
            placeholder="Género"
            className="border rounded px-3 py-2"
            value={affiliation.genero}
            onChange={e => setAffiliation({ ...affiliation, genero: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nombre completo del afiliado"
            className="border rounded px-3 py-2"
            value={affiliation.nombreCompleto}
            onChange={e => setAffiliation({ ...affiliation, nombreCompleto: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tipo de documento de identidad"
            className="border rounded px-3 py-2"
            value={affiliation.tipoDocumento}
            onChange={e => setAffiliation({ ...affiliation, tipoDocumento: e.target.value })}
          />
          <input
            type="text"
            placeholder="Número de documento de identidad"
            className="border rounded px-3 py-2"
            value={affiliation.numeroDocumento}
            onChange={e => setAffiliation({ ...affiliation, numeroDocumento: e.target.value })}
          />
          <input
            type="text"
            placeholder="Cargo"
            className="border rounded px-3 py-2"
            value={affiliation.cargo}
            onChange={e => setAffiliation({ ...affiliation, cargo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Dirección de residencia"
            className="border rounded px-3 py-2"
            value={affiliation.direccion}
            onChange={e => setAffiliation({ ...affiliation, direccion: e.target.value })}
          />
          <input
            type="date"
            placeholder="Fecha de nacimiento"
            className="border rounded px-3 py-2"
            value={affiliation.fechaNacimiento}
            onChange={handleFechaNacimiento}
          />
          <input
            type="number"
            placeholder="Edad"
            className="border rounded px-3 py-2"
            value={affiliation.edad}
            readOnly
          />
          <input
            type="text"
            placeholder="Ocupación"
            className="border rounded px-3 py-2"
            value={affiliation.ocupacion}
            onChange={e => setAffiliation({ ...affiliation, ocupacion: e.target.value })}
          />
          <input
            type="text"
            placeholder="Comisión de trabajo"
            className="border rounded px-3 py-2"
            value={affiliation.comisionTrabajo}
            onChange={e => setAffiliation({ ...affiliation, comisionTrabajo: e.target.value })}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border rounded px-3 py-2"
            value={affiliation.correo}
            onChange={e => setAffiliation({ ...affiliation, correo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Prefijo país"
            className="border rounded px-3 py-2"
            value={affiliation.prefijoPais}
            onChange={e => setAffiliation({ ...affiliation, prefijoPais: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contacto"
            className="border rounded px-3 py-2"
            value={affiliation.contacto}
            onChange={e => setAffiliation({ ...affiliation, contacto: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contacto telefónico"
            className="border rounded px-3 py-2"
            value={affiliation.contactoTelefonico}
            onChange={e => setAffiliation({ ...affiliation, contactoTelefonico: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contacto WhatsApp"
            className="border rounded px-3 py-2"
            value={affiliation.contactoWhatsapp}
            onChange={e => setAffiliation({ ...affiliation, contactoWhatsapp: e.target.value })}
          />
          <input
            type="url"
            placeholder="URL WhatsApp"
            className="border rounded px-3 py-2"
            value={affiliation.urlWhatsapp}
            onChange={e => setAffiliation({ ...affiliation, urlWhatsapp: e.target.value })}
          />
          <input
            type="text"
            placeholder="Observaciones"
            className="border rounded px-3 py-2"
            value={affiliation.observaciones}
            onChange={e => setAffiliation({ ...affiliation, observaciones: e.target.value })}
          />
          <input
            type="text"
            placeholder="Folio"
            className="border rounded px-3 py-2 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
            value={affiliation.folio}
            readOnly
          />
          <input
            type="text"
            placeholder="Renglón"
            className="border rounded px-3 py-2 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
            value={affiliation.renglon}
            readOnly
          />
          <input
            type="url"
            placeholder="URL Perfil Afiliado"
            className="border rounded px-3 py-2 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
            value={
              (typeof window !== "undefined"
                ? `${window.location.origin}/panel/afiliado/${affiliation.numeroDocumento}`
                : `https://jacrosablancagirardot.vercel.app/panel/afiliado/${affiliation.numeroDocumento}`)
            }
            readOnly
          />
          <button type="submit" className="bg-blue-700 text-white rounded py-2 font-semibold hover:bg-blue-900 transition">
            Afiliarme
          </button>
          <button
            type="button"
            className="text-sm text-gray-500 hover:underline mt-2"
            onClick={() => setShowAffiliation(false)}
          >
            Volver a Ingresar
          </button>
        </form>
      )}
    </div>
  );
}

