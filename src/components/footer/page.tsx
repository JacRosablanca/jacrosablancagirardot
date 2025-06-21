"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-white py-4 px-2">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logos izquierda */}
        <div className="flex gap-4">
          <Image src="/logo-escudo-colombia.png" alt="Escudo Colombia" width={80} height={80} className="object-contain" />
          <Image src="/logo-personeria.png" alt="Personería" width={80} height={80} className="object-contain" />
        </div>
        {/* Texto central */}
        <div className="flex flex-col items-center text-center flex-1 px-2">
          <div className="font-normal text-lg">
            <span className="font-semibold">Contactos:</span><br />
            Diagonal 33 con Carrera 12 A esquina<br />
            barrio Rosa blanca 1er sector<br />
            Whatsapp y llamadas: (+57) 304 347 0984<br />
            Correo: <a href="mailto:juntacomunalrosablanca@gmail.com" className="text-blue-600 underline">juntacomunalrosablanca@gmail.com</a>
          </div>
        </div>
        {/* Logos derecha */}
        <div className="flex gap-4">
          <Image src="/logo-alcaldia.png" alt="Alcaldía" width={80} height={80} className="object-contain" />
          <Image src="/logo-idaco.png" alt="IDACO" width={80} height={80} className="object-contain" />
        </div>
      </div>
    </footer>
  );
}