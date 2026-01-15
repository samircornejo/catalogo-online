"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const categorias = [
  { id: 1, nombre: "Electrónica" },
  { id: 2, nombre: "Deportes" },
  { id: 3, nombre: "Hogar" },
  { id: 4, nombre: "Moda" },
];

const marcas = [
  "Samsung",
  "Apple",
  "Sony",
  "LG",
  "Nike",
  "Adidas",
  "Puma",
  "IKEA",
  "Otra",
];

export default function EditarProductoPage() {
  const router = useRouter();
  const params = useParams();
  const productId = parseInt(params.id as string);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoriaId: "1",
    marca: "",
    imagen: "",
    stock: "",
    destacado: false,
  });

  useEffect(() => {
    // Cargar el producto a editar
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
      const productos = JSON.parse(productosGuardados);
      const producto = productos.find((p: any) => p.id === productId);

      if (producto) {
        setFormData({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio.toString(),
          categoriaId: producto.categoriaId.toString(),
          marca: producto.marca,
          imagen: producto.imagen,
          stock: producto.stock.toString(),
          destacado: producto.destacado,
        });
      } else {
        setNotFound(true);
      }
    } else {
      setNotFound(true);
    }
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Obtener productos existentes
    const productosGuardados = localStorage.getItem("productos");
    const productos = productosGuardados ? JSON.parse(productosGuardados) : [];

    // Encontrar y actualizar el producto
    const index = productos.findIndex((p: any) => p.id === productId);
    if (index !== -1) {
      const categoriaSeleccionada = categorias.find(
        (c) => c.id === parseInt(formData.categoriaId)
      );

      productos[index] = {
        ...productos[index],
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        categoriaId: parseInt(formData.categoriaId),
        categoria: categoriaSeleccionada?.nombre || "Electrónica",
        marca: formData.marca,
        imagen: formData.imagen,
        stock: parseInt(formData.stock),
        destacado: formData.destacado,
      };

      // Guardar en localStorage
      localStorage.setItem("productos", JSON.stringify(productos));
    }

    setTimeout(() => {
      router.push("/admin/productos");
    }, 500);
  };

  if (notFound) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Producto no encontrado
        </h2>
        <Link
          href="/admin/productos"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          ← Volver a productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link
          href="/admin/productos"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
        >
          ← Volver a productos
        </Link>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
          Editar Producto
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <div className="space-y-6">
          {/* Nombre */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Nombre del Producto *
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: iPhone 15 Pro"
            />
          </div>

          {/* Descripción */}
          <div>
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Descripción *
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              required
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe las características principales del producto..."
            />
          </div>

          {/* Categoría y Marca */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="categoriaId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Categoría *
              </label>
              <select
                id="categoriaId"
                name="categoriaId"
                required
                value={formData.categoriaId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="marca"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Marca *
              </label>
              <select
                id="marca"
                name="marca"
                required
                value={formData.marca}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona una marca</option>
                {marcas.map((marca) => (
                  <option key={marca} value={marca}>
                    {marca}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Precio y Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="precio"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Precio ($) *
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                required
                min="0"
                step="0.01"
                value={formData.precio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="999.99"
              />
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Stock *
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                required
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10"
              />
            </div>
          </div>

          {/* Imagen */}
          <div>
            <label
              htmlFor="imagen"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              URL de Imagen
            </label>
            <input
              type="url"
              id="imagen"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          {/* Destacado */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="destacado"
              name="destacado"
              checked={formData.destacado}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <label htmlFor="destacado" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Marcar como producto destacado
            </label>
          </div>
        </div>

        {/* Botones */}
        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
          <Link
            href="/admin/productos"
            className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 rounded-lg transition-colors text-center"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
