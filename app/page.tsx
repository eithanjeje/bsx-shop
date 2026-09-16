"use client";

import { useState } from "react";
import CheckoutModal from "@/app/components/CheckoutModal";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: "1", name: "RPG", price: 1.50, description: "Arma potente para dominar el servidor." },
  { id: "2", name: "Anaconda", price: 5.00, description: "Exclusivo paquete de alto rendimiento." },
  { id: "3", name: "Millón Drop", price: 3.00, description: "Drop instantáneo para mejorar tu economía." },
];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Agregar producto al carrito
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Modificar cantidad (+ / -) de forma segura para TypeScript
  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.reduce<CartItem[]>((acc, item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          if (newQty > 0) {
            acc.push({ ...item, quantity: newQty });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center p-6 md:p-12">
      
      {/* Fondo animado rojo y negro */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute -top-[40%] -left-[40%] w-[80%] h-[80%] rounded-full bg-red-600/30 blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-[40%] -right-[40%] w-[80%] h-[80%] rounded-full bg-red-900/20 blur-[150px] animate-ping" style={{ animationDuration: '6s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        
        {/* Barra Superior con Botón de Carrito */}
        <div className="w-full flex justify-between items-center mb-10 bg-zinc-950/80 backdrop-blur-md border border-red-500/30 px-6 py-4 rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <h1 className="text-2xl md:text-3xl font-black tracking-wider text-red-600 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">
            BSX SHOP
          </h1>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-red-950/60 border border-red-500/50 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.3)]"
          >
            🛒 Carrito
            {totalItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border border-black shadow">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>

        {/* Encabezado */}
        <div className="text-center mb-10">
          <p className="text-xs md:text-sm text-gray-400 tracking-widest uppercase">
            Tienda oficial de entrega automática 24/7
          </p>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="gamer-card bg-zinc-950/80 backdrop-blur-md border border-red-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-red-500 hover:shadow-[0_0_35px_rgba(239,68,68,0.5)]"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-black text-white">{product.name}</h3>
                  <span className="text-base font-black text-red-500 bg-red-950/40 px-3 py-1 rounded-full border border-red-500/30">
                    US${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] cursor-pointer"
              >
                Agregar al Carrito 🛒
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PANEL LATERAL DEL CARRITO */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="bg-zinc-950 border-l border-red-500/40 w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-red-500/20 pb-4">
                <h2 className="text-lg font-black text-white">Tu Carrito de Compras</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-white text-sm font-bold bg-red-950/60 w-8 h-8 rounded-full flex items-center justify-center border border-red-500/40 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-500 text-xs">
                  Tu carrito está vacío. ¡Agrega productos para continuar!
                </div>
              ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-red-950/20 border border-red-500/30 rounded-xl p-4 flex justify-between items-center">
                      <div>
                        <div className="text-sm font-bold text-white">{item.name}</div>
                        <div className="text-xs text-red-400">US${item.price.toFixed(2)} c/u</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-black/60 border border-red-500/30 rounded-lg px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-300 hover:text-white font-bold px-1 cursor-pointer">-</button>
                          <span className="text-xs font-black text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-300 hover:text-white font-bold px-1 cursor-pointer">+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-red-500/20 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-gray-300">Total a Pagar:</span>
                  <span className="text-xl font-black text-red-500">
                    US${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(239,68,68,0.5)] cursor-pointer"
                >
                  Proceder al Pago con PayPal 🚀
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL DE PAGO */}
      {isCheckoutOpen && (
        <CheckoutModal
          cart={cart}
          onClose={() => setIsCheckoutOpen(false)}
          onClearCart={() => setCart([])}
        />
      )}
    </main>
  );
}