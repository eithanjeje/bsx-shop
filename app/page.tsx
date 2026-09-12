"use client";

import { useState } from "react";
import CheckoutModal from "@/app/components/CheckoutModal";

// Tus productos oficiales en USD
const products = [
  { id: "1", name: "RPG", price: 1.50, description: "Arma potente para dominar el servidor." },
  { id: "2", name: "Anaconda", price: 5.00, description: "Exclusivo paquete de alto rendimiento." },
  { id: "3", name: "Millón Drop", price: 3.00, description: "Drop instantáneo para mejorar tu economía." },
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; name: string; price: number } | null>(null);

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 flex flex-col items-center">
      {/* Encabezado de la tienda */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-wider text-red-600 mb-2 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]">
          BSX SHOP
        </h1>
        <p className="text-xs md:text-sm text-gray-400 tracking-widest uppercase">
          Tienda oficial de entrega automática 24/7
        </p>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {products.map((product) => (
          <div
            key={product.id}
            className="gamer-card bg-zinc-950 border border-red-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-black text-white">{product.name}</h3>
                <span className="text-lg font-black text-red-500 bg-red-950/40 px-3 py-1 rounded-full border border-red-500/30">
                  US${product.price.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                {product.description}
              </p>
            </div>

            <button
              onClick={() => setSelectedProduct(product)}
              className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] cursor-pointer"
            >
              Comprar Ahora 🛒
            </button>
          </div>
        ))}
      </div>

      {/* Modal de Pago (Solo aparece cuando se selecciona un producto) */}
      {selectedProduct && (
        <CheckoutModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}