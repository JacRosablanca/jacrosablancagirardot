"use client";
// Elimina Nav, Header y Footer de aquí, ya están en layout.tsx

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6fa] dark:bg-[#18181b] transition-colors duration-300">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Hero principal */}
        <section className="w-full max-w-3xl text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#19295A] dark:text-white mb-4">
            ¡Bienvenido a la Junta de Acción Comunal{" "}
            <span className="text-blue-700 dark:text-blue-300">Rosa Blanca</span>!
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6">
            Unidos por el progreso y bienestar de nuestra comunidad.
            <br />
            Descubre noticias, eventos, servicios y participa activamente en la
            transformación de nuestro barrio.
          </p>
          <a
            href="#"
            className="inline-block px-8 py-3 rounded-full bg-[#19295A] text-white font-semibold shadow hover:bg-blue-900 transition"
          >
            Conoce más sobre la Junta
          </a>
        </section>
        {/* Tarjetas de acceso rápido: SOLO las originales solicitadas */}
        <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-[#23232a] rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition">
            <span className="text-4xl mb-2">📅</span>
            <h3 className="font-bold text-lg mb-1">Eventos y Actividades</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              Participa en eventos, talleres y actividades para toda la comunidad.
            </p>
            <a
              href="#"
              className="mt-3 text-blue-700 dark:text-blue-300 font-medium hover:underline"
            >
              Ver eventos
            </a>
          </div>
          <div className="bg-white dark:bg-[#23232a] rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition">
            <span className="text-4xl mb-2">🗣️</span>
            <h3 className="font-bold text-lg mb-1">Reuniones y Asambleas</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              Información sobre reuniones y asambleas de la Junta y la comunidad.
            </p>
            <a
              href="#"
              className="mt-3 text-blue-700 dark:text-blue-300 font-medium hover:underline"
            >
              Ver reuniones
            </a>
          </div>
          <div className="bg-white dark:bg-[#23232a] rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition">
            <span className="text-4xl mb-2">👔</span>
            <h3 className="font-bold text-lg mb-1">Dignatarios</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              Conoce a los dignatarios que lideran la Junta de Acción Comunal.
            </p>
            <a
              href="#"
              className="mt-3 text-blue-700 dark:text-blue-300 font-medium hover:underline"
            >
              Ver dignatarios
            </a>
          </div>
          <div className="bg-white dark:bg-[#23232a] rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition">
            <span className="text-4xl mb-2">🧑‍🤝‍🧑</span>
            <h3 className="font-bold text-lg mb-1">Miembros Afiliados</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              Consulta el listado de miembros afiliados a la Junta.
            </p>
            <a
              href="#"
              className="mt-3 text-blue-700 dark:text-blue-300 font-medium hover:underline"
            >
              Ver afiliados
            </a>
          </div>
          <div className="bg-white dark:bg-[#23232a] rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition">
            <span className="text-4xl mb-2">🚧</span>
            <h3 className="font-bold text-lg mb-1">Proyectos</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              Descubre los proyectos en curso y futuros para el barrio.
            </p>
            <a
              href="#"
              className="mt-3 text-blue-700 dark:text-blue-300 font-medium hover:underline"
            >
              Ver proyectos
            </a>
          </div>
          <div className="bg-white dark:bg-[#23232a] rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition">
            <span className="text-4xl mb-2">🏠</span>
            <h3 className="font-bold text-lg mb-1">Servicios Comunales</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              Accede a los servicios y beneficios que ofrece la Junta.
            </p>
            <a
              href="#"
              className="mt-3 text-blue-700 dark:text-blue-300 font-medium hover:underline"
            >
              Ver servicios
            </a>
          </div>
          <div className="bg-white dark:bg-[#23232a] rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition md:col-span-1">
            <span className="text-4xl mb-2">ℹ️</span>
            <h3 className="font-bold text-lg mb-1">Sobre nosotros</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              Conoce la historia, misión y visión de la Junta de Acción Comunal Rosa
              Blanca.
            </p>
            <a
              href="#"
              className="mt-3 text-blue-700 dark:text-blue-300 font-medium hover:underline"
            >
              Más información
            </a>
          </div>
          <div className="bg-white dark:bg-[#23232a] rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition md:col-span-1">
            <span className="text-4xl mb-2">📝</span>
            <h3 className="font-bold text-lg mb-1">Quiero Afiliarme</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              Únete a la Junta de Acción Comunal y participa activamente en el desarrollo de tu comunidad.
            </p>
            <a
              href="#"
              className="mt-3 text-blue-700 dark:text-blue-300 font-medium hover:underline"
            >
              Afiliarme ahora
            </a>
          </div>
        </section>
        {/* Frase motivacional */}
        <section className="w-full max-w-2xl text-center mt-6">
          <blockquote className="italic text-xl text-blue-900 dark:text-blue-200 font-semibold">
            “La unión hace la fuerza. Juntos construimos un mejor futuro para Rosa
            Blanca.”
          </blockquote>
        </section>
      </main>
    </div>
  );
}