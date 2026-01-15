"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { productos, categorias, marcas } from "@/lib/productos";
import { ThemeToggle } from "@/app/components/ThemeToggle";

export default function CatalogoPage() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("Todas");
  const [marcaSeleccionada, setMarcaSeleccionada] = useState<string>("Todas");
  const [precioMin, setPrecioMin] = useState<number>(0);
  const [precioMax, setPrecioMax] = useState<number>(2000);
  const [busqueda, setBusqueda] = useState<string>("");
  const [ordenamiento, setOrdenamiento] = useState<string>("nombre");

  const productosFiltrados = useMemo(() => {
    let filtered = productos.filter((producto) => {
      const matchCategoria =
        categoriaSeleccionada === "Todas" ||
        producto.categoria === categoriaSeleccionada;
      const matchMarca =
        marcaSeleccionada === "Todas" || producto.marca === marcaSeleccionada;
      const matchPrecio =
        producto.precio >= precioMin && producto.precio <= precioMax;
      const matchBusqueda =
        busqueda === "" ||
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(busqueda.toLowerCase());

      return matchCategoria && matchMarca && matchPrecio && matchBusqueda;
    });

    // Ordenamiento
    filtered.sort((a, b) => {
      switch (ordenamiento) {
        case "precio-asc":
          return a.precio - b.precio;
        case "precio-desc":
          return b.precio - a.precio;
        case "nombre":
          return a.nombre.localeCompare(b.nombre);
        case "stock":
          return b.stock - a.stock;
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    categoriaSeleccionada,
    marcaSeleccionada,
    precioMin,
    precioMax,
    busqueda,
    ordenamiento,
  ]);

  const limpiarFiltros = () => {
    setCategoriaSeleccionada("Todas");
    setMarcaSeleccionada("Todas");
    setPrecioMin(0);
    setPrecioMax(2000);
    setBusqueda("");
    setOrdenamiento("nombre");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              Mi Catálogo Online
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                ← Volver al Inicio
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Catálogo de Productos
        </h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filtros - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Filtros
                </h2>
                <button
                  onClick={limpiarFiltros}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Limpiar
                </button>
              </div>

              {/* Búsqueda */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Buscar
                </label>
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Categoría */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoría
                </label>
                <select
                  value={categoriaSeleccionada}
                  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Todas">Todas</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Marca */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Marca
                </label>
                <select
                  value={marcaSeleccionada}
                  onChange={(e) => setMarcaSeleccionada(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Todas">Todas</option>
                  {marcas.map((marca) => (
                    <option key={marca} value={marca}>
                      {marca}
                    </option>
                  ))}
                </select>
              </div>

              {/* Precio */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rango de Precio
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600 dark:text-gray-400">
                      Mínimo: ${precioMin}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={precioMin}
                      onChange={(e) => setPrecioMin(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 dark:text-gray-400">
                      Máximo: ${precioMax}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={precioMax}
                      onChange={(e) => setPrecioMax(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Ordenamiento */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ordenar por
                </label>
                <select
                  value={ordenamiento}
                  onChange={(e) => setOrdenamiento(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="nombre">Nombre (A-Z)</option>
                  <option value="precio-asc">Precio: Menor a Mayor</option>
                  <option value="precio-desc">Precio: Mayor a Menor</option>
                  <option value="stock">Mayor Stock</option>
                </select>
              </div>

              {/* Contador de resultados */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {productosFiltrados.length} productos encontrados
                </p>
              </div>
            </div>
          </div>

          {/* Productos Grid */}
          <div className="lg:col-span-3">
            {productosFiltrados.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  No se encontraron productos con los filtros seleccionados
                </p>
                <button
                  onClick={limpiarFiltros}
                  className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productosFiltrados.map((producto) => (
                  <div
                    key={producto.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                      <Image
                        src={producto.imagen}
                        alt={producto.nombre}
                        fill
                        className="object-cover"
                      />
                      {producto.destacado && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-md text-xs font-semibold">
                          ⭐ Destacado
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          {producto.categoria}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {producto.marca}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {producto.nombre}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {producto.descripcion}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          ${producto.precio}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Stock: {producto.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
