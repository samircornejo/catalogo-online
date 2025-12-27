export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  marca: string;
  imagen: string;
  stock: number;
  destacado: boolean;
}

export const productos: Producto[] = [
  {
    id: 1,
    nombre: "Laptop Pro 15",
    descripcion: "Laptop profesional con procesador de última generación y 16GB RAM",
    precio: 1299.99,
    categoria: "Electrónica",
    marca: "TechPro",
    imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    stock: 15,
    destacado: true
  },
  {
    id: 2,
    nombre: "Smartphone X12",
    descripcion: "Teléfono inteligente con cámara de 108MP y batería de larga duración",
    precio: 899.99,
    categoria: "Electrónica",
    marca: "PhoneMax",
    imagen: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    stock: 25,
    destacado: true
  },
  {
    id: 3,
    nombre: "Auriculares Noise Cancel",
    descripcion: "Auriculares inalámbricos con cancelación de ruido activa",
    precio: 249.99,
    categoria: "Electrónica",
    marca: "AudioTech",
    imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 40,
    destacado: false
  },
  {
    id: 4,
    nombre: "Smartwatch Elite",
    descripcion: "Reloj inteligente con monitor de salud y GPS integrado",
    precio: 349.99,
    categoria: "Electrónica",
    marca: "WristTech",
    imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: 30,
    destacado: true
  },
  {
    id: 5,
    nombre: "Zapatillas Running Pro",
    descripcion: "Zapatillas deportivas con amortiguación avanzada",
    precio: 129.99,
    categoria: "Deportes",
    marca: "SportMax",
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    stock: 50,
    destacado: false
  },
  {
    id: 6,
    nombre: "Balón Profesional",
    descripcion: "Balón de fútbol oficial de competición",
    precio: 59.99,
    categoria: "Deportes",
    marca: "BallPro",
    imagen: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0965?w=500",
    stock: 60,
    destacado: false
  },
  {
    id: 7,
    nombre: "Camiseta Deportiva",
    descripcion: "Camiseta técnica transpirable para entrenamientos",
    precio: 39.99,
    categoria: "Deportes",
    marca: "FitWear",
    imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    stock: 100,
    destacado: false
  },
  {
    id: 8,
    nombre: "Mochila Outdoor 40L",
    descripcion: "Mochila resistente al agua ideal para aventuras",
    precio: 89.99,
    categoria: "Accesorios",
    marca: "TrailMaster",
    imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    stock: 35,
    destacado: false
  },
  {
    id: 9,
    nombre: "Gafas de Sol Polarizadas",
    descripcion: "Gafas con protección UV400 y lentes polarizadas",
    precio: 79.99,
    categoria: "Accesorios",
    marca: "SunStyle",
    imagen: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    stock: 45,
    destacado: true
  },
  {
    id: 10,
    nombre: "Cafetera Espresso",
    descripcion: "Cafetera automática con molinillo integrado",
    precio: 299.99,
    categoria: "Hogar",
    marca: "CoffeeMax",
    imagen: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
    stock: 20,
    destacado: false
  },
  {
    id: 11,
    nombre: "Licuadora Smart",
    descripcion: "Licuadora de alta potencia con función autoprogramable",
    precio: 149.99,
    categoria: "Hogar",
    marca: "KitchenPro",
    imagen: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500",
    stock: 28,
    destacado: false
  },
  {
    id: 12,
    nombre: "Set Cuchillos Profesional",
    descripcion: "Juego de 8 cuchillos de acero inoxidable con soporte",
    precio: 119.99,
    categoria: "Hogar",
    marca: "ChefMaster",
    imagen: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500",
    stock: 22,
    destacado: false
  },
  {
    id: 13,
    nombre: "Tablet Ultra 10",
    descripcion: "Tablet de 10 pulgadas con pantalla OLED y stylus incluido",
    precio: 599.99,
    categoria: "Electrónica",
    marca: "TechPro",
    imagen: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500",
    stock: 18,
    destacado: true
  },
  {
    id: 14,
    nombre: "Teclado Mecánico RGB",
    descripcion: "Teclado gaming con switches mecánicos e iluminación RGB",
    precio: 159.99,
    categoria: "Electrónica",
    marca: "GameGear",
    imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    stock: 32,
    destacado: false
  },
  {
    id: 15,
    nombre: "Mouse Gaming Pro",
    descripcion: "Mouse ergonómico con sensor de 16000 DPI",
    precio: 79.99,
    categoria: "Electrónica",
    marca: "GameGear",
    imagen: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    stock: 38,
    destacado: false
  }
];

export const categorias = Array.from(new Set(productos.map(p => p.categoria))).sort();
export const marcas = Array.from(new Set(productos.map(p => p.marca))).sort();
