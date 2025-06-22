"use client";
import Image from "next/image";
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-[#23232a]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Secciones principales */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between">
          {/* Enlaces Rápidos */}
          <div className="flex-1 flex flex-col items-center text-center text-gray-700 dark:text-gray-300">
            <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
            <ul className="text-sm">
              <li><a href="#">Términos y Condiciones</a></li>
              <li><a href="#">Política de Privacidad</a></li>
              <li><a href="#">Sobre la Junta</a></li>
              <li><a href="#">Sobre la Comunidad</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>
          {/* Contacto */}
          <div className="flex-1 flex flex-col items-center text-center text-gray-700 dark:text-gray-300">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <ul className="text-sm">
              <li className="flex items-center justify-center gap-2"><FaEnvelope /> juntacomunalrosablanca@gmail.com</li>
              <li className="flex items-center justify-center gap-2"><FaPhone /> (+57) 304 347 0984</li>
              <li className="flex items-center justify-center gap-2"><FaMapMarkerAlt /> Diagonal 33 con Carrera 12 A Esquina</li>
              <li className="flex items-center justify-center gap-2"><FaMapMarkerAlt /> Barrio Rosa Blanca 1er sector</li>
              <li className="flex items-center justify-center gap-2"><FaBuilding /> Girardot - Cundinamarca</li>
            </ul>
          </div>
          {/* Redes Sociales */}
          <div className="flex-1 flex flex-col items-center text-center text-gray-700 dark:text-gray-300">
            <h3 className="text-lg font-semibold">Redes Sociales</h3>
            <ul className="text-sm">
              <li className="flex items-center justify-center gap-2"><FaWhatsapp /> <a href="#">WhatsApp</a></li>
              <li className="flex items-center justify-center gap-2"><FaFacebook /> <a href="#">Facebook</a></li>
              <li className="flex items-center justify-center gap-2"><FaInstagram /> <a href="#">Instagram</a></li>
              <li className="flex items-center justify-center gap-2"><FaTwitter /> <a href="#">X</a></li>
              <li className="flex items-center justify-center gap-2"><FaYoutube /> <a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
        {/* Logos institucionales en todo el ancho y separados igual */}
        <div className="w-full flex justify-between items-center">
          <Image src="/EscudoColombia.png" alt="Escudo Colombia" width={60} height={60} className="object-contain" />
          <Image src="/EscudoCundinamarca.png" alt="Escudo Cundinamarca" width={60} height={60} className="object-contain" />
          <Image src="/EscudoGirardot.png" alt="Escudo Girardot" width={60} height={60} className="object-contain" />
          <Image src="/EscudoIdaco.png" alt="Escudo IDACO" width={60} height={60} className="object-contain" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 dark:text-gray-400 text-xs">
        <span>
          Desarrollado por <a href="#">NextCode-Labs</a>
        </span>
        <span>
          Administrado por Junta de Acción Comunal Rosa Blanca 1er sector
        </span>
        <span>
          © {new Date().getFullYear()}. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
}