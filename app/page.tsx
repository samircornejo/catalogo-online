import Link from "next/link";
import Image from "next/image";
import { productos } from "@/lib/productos";
import { ThemeToggle } from "@/app/components/ThemeToggle";

export default function Home() {
  const productosDestacados = productos.filter(p => p.destacado).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Mi Catálogo Online
            </div>
            <div className="flex gap-3 items-center">
              <ThemeToggle />
              <div className="flex gap-3">
                <button
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-2 rounded-lg transition-colors font-medium"
                  title="Menú"
                >
                  ☰
                </button>
                <Link
                  href="/catalogo"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                >
                  Ver Catálogo
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Bienvenido a Nuestro
            <span className="block text-blue-600 dark:text-blue-400">
              Catálogo Online
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Descubre productos increíbles con las mejores ofertas. Desde electrónica hasta deportes y hogar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalogo"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors"
            >
              Explorar Productos
            </Link>
            <a
              href="#destacados"
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors"
            >
              Ver Destacados
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Envío Gratis
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              En compras superiores a $100
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Pago Seguro
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Protección en todas tus transacciones
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              30 Días de Devolución
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Si no estás satisfecho, devuélvelo
            </p>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section id="destacados" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Productos Destacados
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {productosDestacados.map((producto) => (
            <div
              key={producto.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
                <Image
                  src={producto.imagen}
                  alt={producto.nombre}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {producto.categoria}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {producto.nombre}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
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
        <div className="text-center mt-10">
          <Link
            href="/catalogo"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Mi Catálogo Online</h3>
              <p className="text-gray-400">
                Tu destino para descubrir los mejores productos y precios.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/catalogo" className="hover:text-white transition-colors">
                    Catálogo
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <div className="flex gap-4 text-2xl">
                <a href="#" className="hover:text-blue-400 transition-colors">
                  📘
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  📸
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  🐦
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Mi Catálogo Online. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

