import React from 'react';
import Image from 'next/image';

function Page() {
  const activities = [
    { 
      type: 'Taller de Liderazgo', 
      neighborhood: 'Barrio Centro', 
      date: '2024-07-15',
      images: [
        '/actividad1_1.jpg', // Replace with actual image paths
        '/actividad1_2.jpg',
        '/actividad1_3.jpg',
        '/actividad1_4.jpg',
        '/actividad1_5.jpg',
      ],
      description: 'Un taller para desarrollar habilidades de liderazgo en los jóvenes.'
    },
    { 
      type: 'Actividad Deportiva', 
      neighborhood: 'Barrio La Esperanza', 
      date: '2024-07-22',
      images: [
        '/actividad2_1.jpg', // Replace with actual image paths
        '/actividad2_2.jpg',
        '/actividad2_3.jpg',
        '/actividad2_4.jpg',
        '/actividad2_5.jpg',
      ],
      description: 'Una jornada deportiva para promover la salud y el trabajo en equipo.'
    },
    { 
      type: 'Jornada de Limpieza', 
      neighborhood: 'Barrio San Miguel', 
      date: '2024-07-29',
      images: [
        '/actividad3_1.jpg', // Replace with actual image paths
        '/actividad3_2.jpg',
        '/actividad3_3.jpg',
        '/actividad3_4.jpg',
        '/actividad3_5.jpg',
      ],
      description: 'Una actividad para limpiar y embellecer nuestro barrio.'
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Actividades</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex items-center mb-2">
              {/* You might want to add a profile image here */}
              <span className="font-semibold">{activity.type}</span>
            </div>
            <div className="carousel">
              {activity.images.map((image, imageIndex) => (
                <Image
                  key={imageIndex}
                  src={image}
                  alt={`${activity.type} - ${imageIndex + 1}`}
                  width={600}
                  height={400}
                  className="carousel-image rounded-md object-cover"
                />
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{activity.description}</p>
            <p className="text-gray-600 dark:text-gray-300">Barrio: {activity.neighborhood}</p>
            <p className="text-gray-600 dark:text-gray-300">Fecha: {activity.date}</p>
            {/* Add like, comment, share buttons here if desired */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
