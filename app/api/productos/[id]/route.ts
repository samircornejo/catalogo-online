import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // 👈 AQUÍ ESTÁ LA CLAVE

    const productoId = Number(id);

    if (isNaN(productoId)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 });
    }

    const producto = await prisma.producto.findUnique({
      where: { id: productoId },
      include: { categoria: true },
    });

    if (!producto) {
      return NextResponse.json(
        { message: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(producto);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al obtener producto" },
      { status: 500 }
    );
  }
}
