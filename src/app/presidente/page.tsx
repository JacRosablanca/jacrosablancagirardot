"use client";

export default function PresidentePage() {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#19295A] dark:text-white mb-8">
        Presidente
      </h1>
      {/* Tarjetas para la página de Presidente */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-[#23232a] rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition">
          <span className="text-4xl mb-2">📄</span>
          <h3 className="font-bold text-lg mb-1">Actos Administrativos</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
            Consulta resoluciones, acuerdos y documentos administrativos del
            Presidente.
          </p>
          <a
            href="#"
            className="mt-3 text-blue-700 dark:text-blue-300 font-medium hover:underline"
          >
            Ver actos administrativos
          </a>
        </div>
        <div className="bg-white dark:bg-[#23232a] rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition">
          <span className="text-4xl mb-2">✉️</span>
          <h3 className="font-bold text-lg mb-1">Correspondencia</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
            Accede a la correspondencia oficial recibida y enviada por el
            Presidente.
          </p>
          <a
            href="#"
            className="mt-3 text-blue-700 dark:text-blue-300 font-medium hover:underline"
          >
            Ver correspondencia
          </a>
        </div>
        <div className="bg-white dark:bg-[#23232a] rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition">
          <span className="text-4xl mb-2">📝</span>
          <h3 className="font-bold text-lg mb-1">Planes</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
            Consulta los planes de desarrollo, acción y gestión del Presidente.
          </p>
          <a
            href="#"
            className="mt-3 text-blue-700 dark:text-blue-300 font-medium hover:underline"
          >
            Ver planes
          </a>
        </div>
        <div className="bg-white dark:bg-[#23232a] rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition">
          <span className="text-4xl mb-2">🚧</span>
          <h3 className="font-bold text-lg mb-1">Proyectos</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
            Descubre los proyectos liderados o gestionados por el Presidente.
          </p>
          <a
            href="#"
            className="mt-3 text-blue-700 dark:text-blue-300 font-medium hover:underline"
          >
            Ver proyectos
          </a>
        </div>
        <div className="bg-white dark:bg-[#23232a] rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition">
          <span className="text-4xl mb-2">🗓️</span>
          <h3 className="font-bold text-lg mb-1">Reuniones y Asambleas</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
            Información sobre reuniones y asambleas convocadas por el Presidente.
          </p>
          <a
            href="#"
            className="mt-3 text-blue-700 dark:text-blue-300 font-medium hover:underline"
          >
            Ver reuniones y asambleas
          </a>
        </div>
        {/* Nuevo cuadro: Gestiones Realizadas */}
        <div className="bg-white dark:bg-[#23232a] rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition">
          <span className="text-4xl mb-2">✅</span>
          <h3 className="font-bold text-lg mb-1">Gestiones Realizadas</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
            Consulta las gestiones, logros y acciones realizadas por el Presidente
            en beneficio de la comunidad.
          </p>
          <a
            href="#"
            className="mt-3 text-blue-700 dark:text-blue-300 font-medium hover:underline"
          >
            Ver gestiones realizadas
          </a>
        </div>
      </section>
    </main>
  );
}