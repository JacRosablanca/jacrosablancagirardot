"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-between bg-white dark:bg-[#23232a] m-0 p-0">
      {/* Logos izquierda */}
      <div className="flex gap-x-12 pl-8 m-0 p-0">
        <Image src="/EscudoColombia.png" alt="Escudo Colombia" width={80} height={80} className="object-contain m-0 p-0" />
        <Image src="/EscudoCundinamarca.png" alt="Personería" width={80} height={80} className="object-contain m-0 p-0" />
      </div>
      {/* Texto central */}
      <div className="flex flex-col items-center text-center flex-1 m-0 p-0 text-gray-700 dark:text-gray-300">
        <div className="font-normal text-sm leading-none m-0 p-0">
          <div className="m-0 p-0"><span className="font-semibold">Contactos:</span></div>
          <div className="m-0 p-0">Diagonal 33 con Carrera 12 A esquina</div>
          <div className="m-0 p-0">barrio Rosa blanca 1er sector</div>
          <div className="m-0 p-0">Whatsapp y llamadas: (+57) 304 347 0984</div>
          <div className="m-0 p-0">Correo: <a href="mailto:juntacomunalrosablanca@gmail.com" className="text-blue-600 underline">juntacomunalrosablanca@gmail.com</a></div>
        </div>
      </div>
      {/* Logos derecha */}
      <div className="flex gap-x-12 pr-8 m-0 p-0">
        <Image src="/EscudoGirardot.png" alt="Alcaldía" width={80} height={80} className="object-contain m-0 p-0" />
        <Image src="/EscudoIdaco.png" alt="IDACO" width={80} height={80} className="object-contain m-0 p-0" />
      </div>
    </footer>
  );
}