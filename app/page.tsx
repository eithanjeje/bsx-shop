"use client";

import { useState } from "react";
import CheckoutModal from "./components/CheckoutModal";

const products = [
  {
    id: "drop-1m",
    name: "Drop 1m",
    description: "Producto Drop 1m de la tienda BSX",
    price: 50.0,
    category: "Drop 1m",
    stock: 10,
  },
  {
    id: "rpg",
    name: "RPG",
    description: "Producto RPG de la tienda BSX",
    price: 17.0,
    category: "RPG",
    stock: 10,
  },
  {
    id: "anaconda",
    name: "Anaconda",
    description: "Producto Anaconda de la tienda BSX",
    price: 80.0,
    category: "Anaconda",
    stock: 10,
  },
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
    price: number;
  } | null>(null);

  return (
    <main className="min-h-screen text-white font-sans pb-12">
      {/* Banner Superior */}
      <div className="bg-gradient-to-r from-red-900/40 via-red-600/30 to-red-900/40 border-b border-red-500/20 py-2 text-center text-xs tracking-wider text-red-200">
        ⚡ ¡Nuevos productos disponibles! Entrega automática 24/7 ⚡
      </div>

      {/* Hero / Header */}
      <header className="max-w-4xl mx-auto pt-10 pb-6 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 text-white drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          Welcome to <span className="text-red-500">BSX!</span>
        </h1>
        <p className="text-gray-400 text-sm">100% confiable y buenos precios</p>

        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mt-8">
          <div className="gamer-card p-3 rounded-xl text-center border border-red-500/20 bg-black/40">
            <div className="text-xl font-bold text-red-500">150+</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">Products Sold</div>
            <div className="text-xs text-yellow-500 mt-1">4.9★ Reviews</div>
          </div>
          <div className="gamer-card p-3 rounded-xl text-center border border-red-500/20 bg-black/40">
            <div className="text-xl font-bold text-red-500">98+</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">Total Customers</div>
            <div className="text-xs text-red-400 mt-1">24/7 Auto Delivery</div>
          </div>
        </div>
      </header>

      {/* Catálogo de Productos */}
      <section className="max-w-4xl mx-auto px-4 mt-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black tracking-wider uppercase text-white">Products</h2>
          <div className="h-1 w-16 bg-red-600 mx-auto mt-2 rounded-full shadow-[0_0_8px_#ef4444]"></div>
        </div>

        <div className="space-y-4">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="gamer-card border border-red-500/30 rounded-xl p-4 bg-black/50 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-red-500/70 transition-all"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-red-400 bg-red-950/60 border border-red-500/30 px-2 py-0.5 rounded">
                  {prod.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{prod.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{prod.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-lg font-black text-red-500">
                    MX${prod.price.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-gray-500">Stock: {prod.stock}</span>
                </div>
              </div>

             <button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    setSelectedProduct({ id: prod.id, name: prod.name, price: prod.price });
  }}
  className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-all shadow-[0_0_12px_rgba(239,68,68,0.4)] cursor-pointer active:scale-95"
>
  View Details →
</button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal de Pago Emergente */}
      {selectedProduct && (
        <CheckoutModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}