"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import usuarios from '@/datos/usuarios.json';

interface Usuario {
  id: string;
  tipodoc: string;
  numdoc: string;
  nombres: string;
  direccion: string;
  barrio: string;
  contacto: string;
}

export default function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (!storedUserName) {
      router.push('/'); // Redirige al inicio si no hay usuario
      return;
    }

    const userInfo = usuarios.find(u => u.usuario === storedUserName);
    if (userInfo) {
      setUsuario(userInfo);
    }
  }, [router]);

  if (!usuario) {
    return <div className="text-white p-8">Cargando información del usuario...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-[#1B2A5B] rounded-lg shadow-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-6 border-b border-gray-600 pb-2">
          Mi Perfil
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-gray-400 text-sm">Tipo de Documento</h2>
              <p className="font-medium">{usuario.tipodoc}</p>
            </div>
            <div>
              <h2 className="text-gray-400 text-sm">Número de Documento</h2>
              <p className="font-medium">{usuario.numdoc}</p>
            </div>
            <div>
              <h2 className="text-gray-400 text-sm">Nombres</h2>
              <p className="font-medium">{usuario.nombres}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-gray-400 text-sm">Dirección</h2>
              <p className="font-medium">{usuario.direccion}</p>
            </div>
            <div>
              <h2 className="text-gray-400 text-sm">Barrio</h2>
              <p className="font-medium">{usuario.barrio}</p>
            </div>
            <div>
              <h2 className="text-gray-400 text-sm">Contacto</h2>
              <p className="font-medium">{usuario.contacto}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
