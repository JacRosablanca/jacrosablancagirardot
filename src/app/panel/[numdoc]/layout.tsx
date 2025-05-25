"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const numdoc = params?.numdoc as string;

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (!storedUserName) {
      router.push('/');
      return;
    }
    // Verificar que el usuario logueado coincida con el perfil que intenta ver
    if (storedUserName !== numdoc) {
      router.push('/');
      return;
    }
  }, [numdoc, router]);

  // Si no hay usuario autenticado, no mostrar nada mientras redirecciona
  if (typeof window !== 'undefined' && !localStorage.getItem("userName")) {
    return null;
  }

  return <>{children}</>;
}
