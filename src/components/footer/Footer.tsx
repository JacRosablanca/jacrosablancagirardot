"use client";
import { FaWhatsapp, FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-[#18285a] text-white border-t-4 border-[#232b45] m-0 p-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8 pb-6 m-0 p-0">
        {/* Enlaces rápidos */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-bold text-xl mb-3">Enlaces Rápidos</h3>
          <ul className="space-y-1">
            <li>
              <Link href="#" className="text-blue-300 hover:underline">Términos y Condiciones</Link>
            </li>
            <li>
              <Link href="#" className="text-blue-300 hover:underline">Política de Privacidad</Link>
            </li>
            <li>
              <Link href="#" className="text-blue-300 hover:underline">Sobre el Mercado Comunitario</Link>
            </li>
            <li>
              <Link href="#" className="text-blue-300 hover:underline">Sobre la Corporación</Link>
            </li>
            <li>
              <Link href="#" className="text-blue-300 hover:underline">Contacto</Link>
            </li>
          </ul>
        </div>
        {/* Contacto */}
        <div className="flex-1 text-center">
          <h3 className="font-bold text-xl mb-3">Contacto</h3>
          <ul className="space-y-1 text-base">
            <li className="flex items-center justify-center gap-2">
              <FaEnvelope className="text-lg" />
              <span>corporacionmercogirardot@gmail.com</span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <FaPhone className="text-lg" />
              <span>(304) 347 0984</span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <FaMapMarkerAlt className="text-lg" />
              <span>Diagonal 33 con Carrera 12 A Esquina</span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <FaMapMarkerAlt className="text-lg" />
              <span>Barrio Rosa Blanca 1er sector</span>
            </li>
            <li className="flex items-center justify-center gap-2">
              <FaBuilding className="text-lg" />
              <span>Girardot - Cundinamarca</span>
            </li>
          </ul>
        </div>
        {/* Redes Sociales */}
        <div className="flex-1 text-center md:text-right">
          <h3 className="font-bold text-xl mb-3">Redes Sociales</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-2 text-blue-300 hover:underline justify-center md:justify-end">
                <FaWhatsapp /> WhatsApp
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-blue-300 hover:underline justify-center md:justify-end">
                <FaFacebook /> Facebook
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-blue-300 hover:underline justify-center md:justify-end">
                <FaInstagram /> Instagram
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-blue-300 hover:underline justify-center md:justify-end">
                <FaXTwitter /> X
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-blue-300 hover:underline justify-center md:justify-end">
                <FaYoutube /> Youtube
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Créditos y derechos */}
      <div className="max-w-6xl mx-auto border-t border-[#22306b] pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-blue-200 gap-2 m-0 p-0">
        <div>
          Desarrollado por <a href="#" className="text-blue-300 hover:underline">NextCode-Labs</a>
        </div>
        <div>
          Administrado por <a href="#" className="text-blue-300 hover:underline">Corporación Mercado Comunitario Girardot</a>
        </div>
        <div>
          © {year} Mercogir. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
