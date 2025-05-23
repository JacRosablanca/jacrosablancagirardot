import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "src", "datos", "usuarios.json");

export async function POST(req: NextRequest) {
  try {
    const nuevoUsuario = await req.json();

    // Leer usuarios existentes
    type Usuario = {
      id: string;
      tipodoc: string;
      numdoc: string;
      nombres: string;
      direccion: string;
      barrio: string;
      contacto: string;
    };
    let usuarios: Usuario[] = [];
    try {
      const data = await fs.readFile(filePath, "utf-8");
      usuarios = JSON.parse(data);
    } catch {
      usuarios = [];
    }

    // Calcular el siguiente id incremental
    let maxId = 0;
    if (Array.isArray(usuarios) && usuarios.length > 0) {
      maxId = usuarios
        .map((user) => Number(user.id ?? 0))
        .filter((id) => !isNaN(id))
        .reduce((max, id) => Math.max(max, id), 0);
    }
    const nextId = (maxId + 1).toString();

    // Asignar el id incremental al nuevo usuario
    const usuarioConId = { ...nuevoUsuario, id: nextId };

    // Agregar el nuevo usuario
    usuarios.push(usuarioConId);
    await fs.writeFile(filePath, JSON.stringify(usuarios, null, 2), "utf-8");

    return NextResponse.json({ ok: true, usuario: usuarioConId });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error?.toString() }, { status: 500 });
  }
}
