"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type CarouselProps = {
  images: { src: string; caption: string }[];
};

function Carousel({ images }: CarouselProps) {
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
        fill
        className="object-cover transition-all duration-500"
        priority
      />
      {/* Botones de navegación */}
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
      {/* Indicadores */}
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

export default function DotacionesPage() {
  const imagenes2022 = [
    { src: "/proyectos/dotaciones/2022/513025564_3458256860980588_3370577744616111517_n.jpg", caption: "Dotaciones entregadas en 2022" },
    { src: "/proyectos/dotaciones/2022/513032524_3458256564313951_3865564493422950440_n.jpg", caption: "Dotaciones entregadas en 2022" },
    { src: "/proyectos/dotaciones/2022/513083458_3458256867647254_3411503715882783737_n.jpg", caption: "Dotaciones entregadas en 2022" },
    { src: "/proyectos/dotaciones/2022/513217117_3458256524313955_525854971563930042_n.jpg", caption: "Dotaciones entregadas en 2022" },
  ];

  const [activeDocTab, setActiveDocTab] = useState<"documentacion" | "rendicion">("documentacion");

  const docLinks = {
    documentacion: "https://drive.google.com/embeddedfolderview?id=1E5uJ7ctFGI4Z92_rkEsTFZMzxflz3zph#grid",
    rendicion: "https://drive.google.com/embeddedfolderview?id=1doYbQs-q4yLa-E5e4oYTOb75GKmd_F7E#grid",
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center text-[#19295A] dark:text-blue-200 mb-8">
        Proyecto Dotaciones Comunitarias (2022)
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-10">
        Este proyecto gestionó recursos y dotaciones en 2022 para fortalecer el trabajo comunitario en Rosa Blanca.
      </p>

      {/* Carrusel de imágenes 2022 */}
      <Carousel images={imagenes2022} />

      {/* Documentación y Rendición */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-bold text-[#19295A] dark:text-blue-300 mb-4">
          Documentación del Proyecto 2022
        </h2>

        {/* Botones para cambiar vista */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setActiveDocTab("documentacion")}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              activeDocTab === "documentacion"
                ? "bg-[#19295A] text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            }`}
          >
            Documentación
          </button>
          <button
            onClick={() => setActiveDocTab("rendicion")}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              activeDocTab === "rendicion"
                ? "bg-[#19295A] text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300"
            }`}
          >
            Rendición de Cuentas
          </button>
        </div>

        {/* Contenido dinámico */}
        <iframe
          src={docLinks[activeDocTab]}
          width="100%"
          height="500"
          className="border-0 rounded-lg shadow-md"
        ></iframe>
      </div>
    </div>
  );
}
