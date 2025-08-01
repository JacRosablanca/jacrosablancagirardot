import React from 'react';
import Image from 'next/image';

function Page() {
  const sponsors = [
    { 
      name: 'Empresa Ejemplo 1', 
      description: 'Patrocinador principal',
      logo: '/logo-empresa1.png', // Replace with actual logo path
      address: 'Calle Ejemplo 123, Ciudad',
      phone: '123-456-7890'
    },
    { 
      name: 'Persona Ejemplo 1', 
      description: 'Colaborador individual',
      logo: '/logo-persona1.png', // Replace with actual logo path
      address: 'Calle Ejemplo 456, Ciudad',
      phone: '987-654-3210'
    },
    {
      name: 'Negocio Ejemplo 2',
      description: 'Apoyo a la iniciativa',
      logo: '/logo-negocio2.png', // Replace with actual logo path
      address: 'Avenida Ejemplo 789, Ciudad',
      phone: '111-222-3333'
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Patrocinadores</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor, index) => (
          <li key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <Image
              src={sponsor.logo}
              alt={`${sponsor.name} Logo`}
              width={100}
              height={100}
              className="mb-2"
            />
            <h2 className="text-xl font-semibold">{sponsor.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{sponsor.description}</p>
            <p className="text-gray-600 dark:text-gray-300">Dirección: {sponsor.address}</p>
            <p className="text-gray-600 dark:text-gray-300">Teléfono: {sponsor.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;