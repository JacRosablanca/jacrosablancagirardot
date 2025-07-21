"use client";

import Image from "next/image";

// Importa las imágenes
import Nicol from "@/app/proyectos/jovenes-en-accion-por-rosa-blanca/img/nicol.jpg";
import Kevin from "@/app/proyectos/jovenes-en-accion-por-rosa-blanca/img/kevin.jpg";
import Maria from "@/app/proyectos/jovenes-en-accion-por-rosa-blanca/img/daniela.jpg";

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold text-[#19295A] dark:text-blue-200 mb-4 text-center">
        Jóvenes en Acción por Rosa Blanca
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 text-center">
        Como Junta de Acción Comunal, inscribimos 3 candidatos al Consejo Municipal
        de Juventudes por la lista{" "}
        <span className="font-bold">Jóvenes en Acción por Rosa Blanca</span>.
      </p>
      <div className="mb-8 text-center">
        <a
          href="https://drive.google.com/file/d/1MUxxzhpOUhp3USObfZNG18IbBT9-vpdP/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          Lista oficial registrada ante la Registraduría Municipal
        </a>
      </div>
      <h2 className="text-xl font-bold text-[#19295A] dark:text-blue-200 mb-4 text-center">
        Nuestros Candidatos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Candidato 1 */}
        <div className="flex flex-col items-center bg-white dark:bg-[#23232a] rounded-lg shadow p-4">
          <Image
            src={Nicol}
            alt="Nicol Valeria Ramirez Labrador"
            width={120}
            height={120}
            className="rounded-full mb-2 object-cover"
          />
          <div className="font-bold text-lg text-[#19295A] dark:text-blue-200">
            Nicol Valeria Ramirez Labrador
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Estudiante de colegio, líder juvenil
          </div>
        </div>
        {/* Candidato 2 */}
        <div className="flex flex-col items-center bg-white dark:bg-[#23232a] rounded-lg shadow p-4">
          <Image
            src={Kevin}
            alt="Kevin David Vergara Mape"
            width={120}
            height={120}
            className="rounded-full mb-2 object-cover"
          />
          <div className="font-bold text-lg text-[#19295A] dark:text-blue-200">
            Kevin David Vergara Mape
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Estudiante de universidad, promotor social
          </div>
        </div>
        {/* Candidato 3 */}
        <div className="flex flex-col items-center bg-white dark:bg-[#23232a] rounded-lg shadow p-4">
          <Image
            src={Maria}
            alt="Maria Daniela Gaona Ortiz"
            width={120}
            height={120}
            className="rounded-full mb-2 object-cover"
          />
          <div className="font-bold text-lg text-[#19295A] dark:text-blue-200">
            Maria Daniela Gaona Ortiz
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Estudiante de colegio, emprendedora
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-base text-gray-700 dark:text-gray-200">
        ¡Apoya a nuestros jóvenes y participa en la construcción de una mejor
        comunidad!
      </div>
      <div className="mt-4 text-center">
        <a
          href="https://docs.google.com/forms/u/0/d/1sf7YzDJ7Nl0D_cA5yCj9GZN_FfnlxUKrn6H_DRcW9OA/preview"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          ¡Regístrate para apoyar!
        </a>
      </div>
    </div>
  );
}
