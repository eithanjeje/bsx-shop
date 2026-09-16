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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-red-600 selection:text-white">
      
      {/* Fondo estático de respaldo oscuro */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-red-600 blur-[120px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-red-950 blur-[150px]"></div>
      </div>

      {/* MENÚ SUPERIOR SÓLIDO Y SEPARADO */}
      <nav className="sticky top-0 z-40 bg-black border-b border-red-600/40 px-5 py-4 shadow-xl">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-black tracking-wider text-red-500">
              BSX SHOP
            </span>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-zinc-900 border border-red-500/60 hover:bg-red-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              🛒 Carrito
              {totalItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border border-black shadow">
                  {totalItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-zinc-900 border border-red-500/40 hover:border-red-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Menú ☰
            </button>
          </div>
        </div>

        {/* Menú Desplegable Sólido */}
        {isMenuOpen && (
          <div className="max-w-5xl mx-auto mt-3 pt-3 border-t border-zinc-800 flex flex-col gap-2 text-xs text-gray-300">
            <a href="https://discord.gg/2F87YVpZD" target="_blank" rel="noopener noreferrer" className="py-1.5 px-2 bg-zinc-900/80 rounded-lg hover:text-red-400 transition-colors">
              💬 Soporte / Discord (Abrir Ticket)
            </a>
            <div className="py-1 px-2 text-gray-400 text-[11px]">
              Estado del servidor: <span className="text-green-400 font-bold">Online 24/7</span>
            </div>
          </div>
        )}
      </nav>

      {/* CONTENIDO PRINCIPAL CON BUEN ESPACIADO */}
      <main className="relative z-10 max-w-5xl w-full mx-auto px-4 py-8 flex-grow flex flex-col items-center">
        
        {/* Cabecera separada */}
        <div className="text-center mb-10 mt-2">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-wide">
            TIENDA OFICIAL
          </h1>
          <p className="text-xs md:text-sm text-gray-400 tracking-widest uppercase">
            Entrega automática 24/7 • Pagos seguros por PayPal
          </p>
        </div>

        {/* Grid de Productos Sólidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-950 border border-red-600/40 rounded-2xl p-6 flex flex-col justify-between shadow-lg transition-all hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-black text-white">{product.name}</h3>
                  <span className="text-sm font-black text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-500/30">
                    US${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-300 mb-6 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md cursor-pointer"
              >
                Agregar al Carrito 🛒
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER SÓLIDO */}
      <footer className="w-full text-center py-6 border-t border-zinc-900 text-[11px] text-gray-500 bg-black">
        BSX Shop © 2026 • Todos los derechos reservados
      </footer>

      {/* PANEL LATERAL DEL CARRITO */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex justify-end">
          <div className="bg-zinc-950 border-l border-red-600/40 w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                <h2 className="text-base font-black text-white">Tu Carrito de Compras</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-white text-sm font-bold bg-zinc-900 w-8 h-8 rounded-full flex items-center justify-center border border-zinc-800 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-500 text-xs">
                  Tu carrito está vacío. ¡Agrega productos para continuar!
                </div>
              ) : (
                <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 flex justify-between items-center">
                      <div>
                        <div className="text-xs font-bold text-white mb-1">{item.name}</div>
                        <div className="text-[10px] text-red-400">US${item.price.toFixed(2)} c/u</div>
                      </div>
                      <div className="flex items-center gap-2 bg-black border border-zinc-800 rounded-lg px-2.5 py-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-300 hover:text-white font-bold px-1 cursor-pointer">-</button>
                        <span className="text-xs font-black text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-300 hover:text-white font-bold px-1 cursor-pointer">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-zinc-800 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-gray-300 uppercase">Total a Pagar:</span>
                  <span className="text-lg font-black text-red-500">
                    US${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Proceder al Pago con PayPal 🚀
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL DE PAGO PAYPAL */}
      {isCheckoutOpen && (
        <CheckoutModal
          cart={cart}
          onClose={() => setIsCheckoutOpen(false)}
          onClearCart={() => setCart([])}
        />
      )}
    </div>
  );
}