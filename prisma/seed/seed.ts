import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Categorías
  const tecnologia = await prisma.categoria.create({
    data: { nombre: "Tecnología" },
  });

  const hogar = await prisma.categoria.create({
    data: { nombre: "Hogar" },
  });

  // Productos
  await prisma.producto.createMany({
    data: [
      {
        nombre: "Laptop Lenovo",
        descripcion: "Ryzen 5, 16GB RAM",
        precio: 3200,
        categoriaId: tecnologia.id,
        marca: "Lenovo",
        imagen: "laptop.jpg",
        stock: 10,
        destacado: true,
      },
      {
        nombre: "Cafetera Oster",
        descripcion: "Cafetera eléctrica",
        precio: 280,
        categoriaId: hogar.id,
        marca: "Oster",
        imagen: "cafetera.jpg",
        stock: 15,
        destacado: false,
      },
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
