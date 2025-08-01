"use client";

import { useState } from "react";
import Image from "next/image";
import DonacionPage from "@/app/proyectos/jovenes-en-accion-por-rosa-blanca/donaciones/page";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [showModal, setShowModal] = useState<false | "registro" | "donacion">(false);

    const handleDonacionExit = () => {
        setShowModal(false);
        router.push("/proyectos/jovenes-en-accion-por-rosa-blanca");
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-4 relative">
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                        >
                            &times;
                        </button>

                        {showModal === "registro" && (
                            <>
                                <h3 className="text-lg font-bold text-[#19295A] dark:text-blue-200 mb-4 text-center">
                                    Formulario de Registro
                                </h3>
                                <form
                                    className="space-y-3"
                                    onSubmit={async (e) => {
                                        e.preventDefault();
                                        const data = new FormData(e.target as HTMLFormElement);

                                        try {
                                            await fetch(
                                                "https://docs.google.com/forms/u/0/d/1sf7YzDJ7Nl0D_cA5yCj9GZN_FfnlxUKrn6H_DRcW9OA/formResponse",
                                                {
                                                    method: "POST",
                                                    mode: "no-cors",
                                                    body: data,
                                                }
                                            );

                                            window.location.href = "/proyectos/jovenes-en-accion-por-rosa-blanca";
                                        } catch (error) {
                                            console.error("Error al enviar:", error);
                                            alert("Hubo un problema al registrar. Intenta de nuevo.");
                                        }
                                    }}
                                >
                                    <input type="email" name="entry.2117185795" placeholder="Correo electrónico" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                                    <select name="entry.1771876615" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required>
                                        <option value="">Tipo de documento</option>
                                        <option>Tarjeta de identidad</option>
                                        <option>Cédula de ciudadanía</option>
                                    </select>
                                    <input type="text" name="entry.723225580" placeholder="Número de documento" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                                    <input type="text" name="entry.1929845918" placeholder='Nombre completo "según documento"' className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                                    <input type="text" name="entry.68529218" placeholder="Dirección de residencia" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                                    <input type="text" name="entry.547704069" placeholder="Barrio de residencia" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                                    <input type="date" name="entry.1091456214" placeholder="Fecha de nacimiento" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required />
                                    <select name="entry.1200222756" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" required>
                                        <option value="">Nivel de estudio</option>
                                        <option>Primaria</option>
                                        <option>Bachillerato grado 6°</option>
                                        <option>Bachillerato grado 7°</option>
                                        <option>Bachillerato grado 8°</option>
                                        <option>Bachillerato grado 9°</option>
                                        <option>Bachillerato grado 10°</option>
                                        <option>Bachillerato grado 11°</option>
                                        <option>Técnico</option>
                                        <option>Tecnólogo</option>
                                        <option>Profesional</option>
                                        <option>Sin Estudios</option>
                                    </select>
                                    <input type="text" name="entry.808400725" placeholder="Área de estudio o profesión (si aplica)" className="w-full p-2 border rounded dark:bg-[#2a2a2a] dark:text-white" />
                                    <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition-colors">
                                        Enviar Registro
                                    </button>
                                </form>
                            </>
                        )}

                        {showModal === "donacion" && <DonacionPage onSuccess={handleDonacionExit} />}
                    </div>
                </div>
            )}

            {/* Contenido principal */}
            <div className="w-full h-64 relative mb-8">
                <Image src="/proyectos/cmj/equipo.jpg" alt="Portada Jóvenes en Acción" fill className="object-cover rounded-lg shadow-lg" priority />
            </div>

            <h1 className="text-3xl font-extrabold text-[#19295A] dark:text-blue-200 mb-4 text-center">
                Jóvenes en Acción por Rosa Blanca
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 text-center">
                Tres jóvenes que inspiran inclusión, liderazgo y emprendimiento para transformar nuestra comunidad.
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
                {[
                    {
                        nombre: "Nicol Valeria",
                        edad: "14 años, estudiante",
                        descripcion: "Ejemplo de inclusión y promotora de deportes adaptados.",
                        img: "/proyectos/cmj/nicol.jpg",
                    },
                    {
                        nombre: "Kevin Vergara",
                        edad: "18 años, estudiante de ingeniería",
                        descripcion: "Voz juvenil y promotor social.",
                        img: "/proyectos/cmj/kevin.jpg",
                    },
                    {
                        nombre: "Daniela Gaona",
                        edad: "15 años, estudiante y emprendedora",
                        descripcion: "Apoya negocios juveniles.",
                        img: "/proyectos/cmj/daniela.jpg",
                    },
                ].map((cand, i) => (
                    <div key={i} className="flex flex-col items-center bg-white dark:bg-[#23232a] rounded-lg shadow p-4 hover:scale-105 transition-transform">
                        <Image src={cand.img} alt={cand.nombre} width={120} height={120} className="rounded-full mb-2 object-cover" />
                        <div className="font-bold text-lg text-[#19295A] dark:text-blue-200 text-center">{cand.nombre}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                            {cand.edad}. {cand.descripcion}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center text-base text-gray-700 dark:text-gray-200">
                ¡Apoya a nuestros jóvenes y vota por una juventud que construye futuro!
            </div>

            <div className="mt-4 text-center">
                <button
                    onClick={() => setShowModal("registro")}
                    className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                    ¡Regístrate para apoyar!
                </button>
            </div>

            {/* Donación */}
            <div className="fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setShowModal("donacion")}
                    className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors text-2xl"
                    aria-label="Haz una donación"
                >
                    💸
                </button>
            </div>

            {/* Registro */}
            <div className="fixed bottom-20 right-6 z-40">
                <button
                    onClick={() => setShowModal("registro")}
                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors text-2xl"
                    aria-label="Formulario de Registro"
                    title="Formulario de Registro"
                >
                    📝
                </button>
            </div>

        </div>
    );
}
