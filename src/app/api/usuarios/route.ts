import { writeFile, readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const filePath = path.join(process.cwd(), 'src', 'datos', 'usuarios.json');

    try {
      await readFile(filePath, 'utf-8');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error al leer el archivo:', err.message);
      }
      return NextResponse.json(
        { success: false, error: 'Error: archivo de usuarios no encontrado' },
        { status: 404 }
      );
    }

    // Validar que data es un array
    if (!Array.isArray(data)) {
      return NextResponse.json(
        { success: false, error: 'Formato de datos inválido' },
        { status: 400 }
      );
    }

    await writeFile(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error al actualizar usuarios:', err.message);
    }
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
