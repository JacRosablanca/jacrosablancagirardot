"use client";

import Image from "next/image";

export default function Page() {
    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            {/* Portada */}
            <div className="w-full h-64 relative mb-8">
                <Image
                    src="/proyectos/cmj/equipo.jpg"
                    alt="Portada Jóvenes en Acción"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    priority
                />
            </div>

            {/* Título */}
            <h1 className="text-3xl font-extrabold text-[#19295A] dark:text-blue-200 mb-4 text-center">
                Jóvenes en Acción por Rosa Blanca
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 text-center">
                Tres jóvenes que inspiran inclusión, liderazgo y emprendimiento para transformar nuestra comunidad.
            </p>

            {/* Lista oficial */}
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

            {/* Candidatos */}
            <h2 className="text-xl font-bold text-[#19295A] dark:text-blue-200 mb-4 text-center">
                Nuestros Candidatos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Nicol */}
                <div className="flex flex-col items-center bg-white dark:bg-[#23232a] rounded-lg shadow p-4 hover:scale-105 transition-transform">
                    <Image
                        src="/proyectos/cmj/nicol.jpg"
                        alt="Nicol"
                        width={120}
                        height={120}
                        className="rounded-full mb-2 object-cover"
                    />
                    <div className="font-bold text-lg text-[#19295A] dark:text-blue-200 text-center">
                        Nicol Valeria
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                        14 años, estudiante. Ejemplo de inclusión y promotora de deportes adaptados.
                    </div>
                </div>

                {/* Kevin */}
                <div className="flex flex-col items-center bg-white dark:bg-[#23232a] rounded-lg shadow p-4 hover:scale-105 transition-transform">
                    <Image
                        src="/proyectos/cmj/kevin.jpg"
                        alt="Kevin"
                        width={120}
                        height={120}
                        className="rounded-full mb-2 object-cover"
                    />
                    <div className="font-bold text-lg text-[#19295A] dark:text-blue-200 text-center">
                        Kevin Vergara
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                        18 años, estudiante de ingeniería. Voz juvenil y promotor social.
                    </div>
                </div>

                {/* Daniela */}
                <div className="flex flex-col items-center bg-white dark:bg-[#23232a] rounded-lg shadow p-4 hover:scale-105 transition-transform">
                    <Image
                        src="/proyectos/cmj/daniela.jpg"
                        alt="Daniela"
                        width={120}
                        height={120}
                        className="rounded-full mb-2 object-cover"
                    />
                    <div className="font-bold text-lg text-[#19295A] dark:text-blue-200 text-center">
                        Daniela Gaona
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                        15 años, estudiante y emprendedora. Apoya negocios juveniles.
                    </div>
                </div>
            </div>

            {/* Mensaje final */}
            <div className="mt-8 text-center text-base text-gray-700 dark:text-gray-200">
                ¡Apoya a nuestros jóvenes y vota por una juventud que construye futuro!
            </div>

            {/* Botón de registro */}
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

            {/* Extras */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="flex flex-col items-center bg-white dark:bg-[#23232a] rounded-lg shadow p-4 hover:scale-105 transition-transform">
                    <div className="font-bold text-lg text-[#19295A] dark:text-blue-200">Patrocinadores</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 text-center">Conoce a quienes apoyan esta iniciativa.</div>
                    <a href="/proyectos/jovenes-en-accion-por-rosa-blanca/patrocinadores" className="text-blue-500 hover:text-blue-700">Ver más</a>
                </div>

                <div className="flex flex-col items-center bg-white dark:bg-[#23232a] rounded-lg shadow p-4 hover:scale-105 transition-transform">
                    <div className="font-bold text-lg text-[#19295A] dark:text-blue-200">Actividades</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 text-center">Entérate de los eventos y proyectos en curso.</div>
                    <a href="/proyectos/jovenes-en-accion-por-rosa-blanca/actividades" className="text-blue-500 hover:text-blue-700">Ver más</a>
                </div>

                <div className="flex flex-col items-center bg-white dark:bg-[#23232a] rounded-lg shadow p-4 hover:scale-105 transition-transform">
                    <div className="font-bold text-lg text-[#19295A] dark:text-blue-200">Haz tu Donación</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 text-center">Apoya a esta causa y ayuda a que nuestros jóvenes crezcan.</div>
                    <a href="/proyectos/jovenes-en-accion-por-rosa-blanca/donaciones" className="text-blue-500 hover:text-blue-700">Donar ahora</a>
                </div>
            </div>
        </div>
    );
}
