"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";

// Imágenes Primera Fase
import Fase1_1 from "../../../../public/proyectos/saloncomunal/primerafase/473613947_1261155588449835_4113633998159148210_n.jpg";
import Fase1_2 from "../../../../public/proyectos/saloncomunal/primerafase/513087825_3458257490980525_8450404092704273919_n.jpg";
import Fase1_3 from "../../../../public/proyectos/saloncomunal/primerafase/513475553_3458257434313864_3691522283734441711_n.jpg";
import Fase1_4 from "../../../../public/proyectos/saloncomunal/primerafase/514063256_3458257587647182_4181670601262803148_n.jpg";
import Fase1_5 from "../../../../public/proyectos/saloncomunal/primerafase/514263531_3458256904313917_2110745204252052779_n.jpg";

// Imágenes Segunda Fase
import Fase2_1 from "../../../../public/proyectos/saloncomunal/segundafase/LogoJac.png";
import Fase2_2 from "../../../../public/proyectos/saloncomunal/segundafase/LogoJac.png";
import Fase2_3 from "../../../../public/proyectos/saloncomunal/segundafase/LogoJac.png";
import Fase2_4 from "../../../../public/proyectos/saloncomunal/segundafase/LogoJac.png";
import Fase2_5 from "../../../../public/proyectos/saloncomunal/segundafase/LogoJac.png";

// Tipado
type CarouselProps = {
  images: { src: StaticImageData | string; caption: string }[];
  isRender?: boolean;
};

// Carrusel
function Carousel({ images, isRender = false }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-80 md:h-[450px] overflow-hidden rounded-lg shadow-lg mb-6">
      <Image
        src={images[currentIndex].src}
        alt={images[currentIndex].caption}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isRender ? "border-4 border-blue-400 opacity-90" : ""
        }`}
        priority
      />
      {/* Botones */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60"
      >
        &#8594;
      </button>
      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-3 w-3 rounded-full cursor-pointer transition ${
              idx === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function SalonComunalPage() {
  const primeraFaseImages = [
    { src: Fase1_1, caption: "Primera fase: Resultado Final (IDACO 2022)" },
    { src: Fase1_2, caption: "Primera fase: Inauguración (IDACO 2022)" },
    { src: Fase1_3, caption: "Primera fase: Proceso de obra (IDACO 2022)" },
    { src: Fase1_4, caption: "Primera fase: Avances (IDACO 2022)" },
    { src: Fase1_5, caption: "Primera fase: Entrega final (IDACO 2022)" },
  ];

  const segundaFaseImages = [
    { src: Fase2_1, caption: "Segunda fase: Diseño conceptual (MININTERIOR 2025)" },
    { src: Fase2_2, caption: "Segunda fase: Planos y renders (MININTERIOR 2025)" },
    { src: Fase2_3, caption: "Segunda fase: Vista proyectada (MININTERIOR 2025)" },
    { src: Fase2_4, caption: "Segunda fase: Detalles de estructura (MININTERIOR 2025)" },
    { src: Fase2_5, caption: "Segunda fase: Proyecto final (MININTERIOR 2025)" },
  ];

  const [activeTab, setActiveTab] = useState<"primera" | "segunda">("primera");

  // URLs de carpetas embebidas
  const docPrimeraFase =
    "https://drive.google.com/embeddedfolderview?id=18Za-ANhlmDy66CyG7PUAdwAozNuJHK8L#grid";
  const docSegundaFase =
    "https://drive.google.com/embeddedfolderview?id=1clWW9W5SUQNLW1XTAzsjL8Nm2hMcsSgj#grid";

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-[#19295A] dark:text-blue-200 mb-8">
        Proyecto Salón Comunal Rosa Blanca
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-10">
        Nuestro salón comunal es un sueño construido entre la comunidad y con el apoyo de entidades públicas.
        Más de <span className="font-semibold">300 familias</span> del barrio serán beneficiadas con este proyecto.
      </p>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("primera")}
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${
            activeTab === "primera"
              ? "bg-[#19295A] text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
          }`}
        >
          Primera Fase
        </button>
        <button
          onClick={() => setActiveTab("segunda")}
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${
            activeTab === "segunda"
              ? "bg-[#19295A] text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
          }`}
        >
          Segunda Fase
        </button>
      </div>

      {/* Carrusel */}
      {activeTab === "primera" ? (
        <Carousel images={primeraFaseImages} />
      ) : (
        <Carousel images={segundaFaseImages} isRender />
      )}

      {/* Botón de donación */}
      <div className="text-center mt-8">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Con tu apoyo, lograremos culminar el Salón Comunal Rosa Blanca para todos.
        </p>
        <a
          href="/proyectos/salon-comunal/donaciones"
          className="px-6 py-3 bg-[#19295A] text-white text-lg font-semibold rounded-full hover:bg-[#1f3a7a] transition-colors"
        >
          Apoya el Proyecto
        </a>
      </div>

      {/* Documentación (visor Drive) */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-bold text-[#19295A] dark:text-blue-300 mb-4">
          Documentación {activeTab === "primera" ? "Primera" : "Segunda"} Fase
        </h2>

        {/* Miniatura */}
        <Image
          src={
            activeTab === "primera"
              ? primeraFaseImages[0].src
              : segundaFaseImages[0].src
          }
          alt="Miniatura de fase"
          className="mx-auto w-64 h-40 object-cover rounded-lg shadow-md mb-6"
        />

        {/* Carpeta embebida */}
        <iframe
          src={activeTab === "primera" ? docPrimeraFase : docSegundaFase}
          width="100%"
          height="500"
          className="border-0 rounded-lg shadow-md"
        ></iframe>
      </div>
    </div>
  );
}
