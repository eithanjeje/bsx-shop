'use client';

import React, { useState } from 'react';
import CheckoutModal from './components/CheckoutModal';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Home() {
  // Estado del carrito de compras
  const [cart, setCart] = useState<CartItem[]>([
    { id: '1', name: 'RPG', price: 1.50, quantity: 1 },
    { id: '2', name: 'Anaconda', price: 5.00, quantity: 2 },
  ]);

  // Estado para abrir/cerrar el modal de pago
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Calcular el total a pagar automáticamente
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Función para modificar cantidades en el carrito
  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  // Vaciar carrito al completar orden
  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      
      {/* Contenedor principal de la tienda (Rojo sólido sin transparencias) */}
      <div className="w-full max-w-2xl bg-neutral-950 border-2 border-red-600 rounded-3xl p-6 shadow-2xl shadow-red-950">
        
        {/* Cabecera */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-red-500 tracking-wider">BSX SHOP</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest font-semibold">ENTREGA AUTOMÁTICA 24/7 • PAGOS SEGUROS</p>
        </div>

        {/* Sección del Carrito de Compras (Fondo sólido) */}
        <div className="bg-neutral-900 border border-red-900 rounded-2xl p-5 mb-6">
          <h2 className="text-lg font-bold mb-1 text-red-400">Tu Carrito de Compras</h2>
          <p className="text-xs text-neutral-400 mb-4">Modifica cantidades o procede al pago con Binance Pay</p>

          {cart.length > 0 ? (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-neutral-950 border border-red-900/60 rounded-xl p-3">
                  <div>
                    <span className="font-bold block text-sm text-white">{item.name}</span>
                    <span className="text-xs text-red-400 font-mono">US${item.price.toFixed(2)} c/u</span>
                  </div>
                  
                  {/* Controles de cantidad */}
                  <div className="flex items-center gap-3 bg-neutral-900 border border-red-800 rounded-lg px-3 py-1">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-neutral-300 hover:text-white font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="font-mono text-sm font-bold w-4 text-center text-white">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-neutral-300 hover:text-white font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-neutral-500 py-6 text-sm">Tu carrito está vacío.</p>
          )}

          {/* Total a pagar */}
          <div className="flex justify-between items-center font-bold mt-6 pt-4 border-t border-red-900 text-lg">
            <span className="text-neutral-300">TOTAL A PAGAR:</span>
            <span className="text-red-500 font-mono text-xl">US${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Botón de Proceder al Pago con Binance Pay (Rojo sólido) */}
        <button
          onClick={() => setIsCheckoutOpen(true)}
          disabled={cart.length === 0}
          className="w-full py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-base shadow-lg shadow-red-900/50 transition-all flex items-center justify-center gap-3 tracking-wide cursor-pointer"
        >
          <span>Proceder al Pago con Binance Pay</span>
          <span className="text-xl">🚀</span>
        </button>

      </div>

      {/* Modal de pago integrado */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        cart={cart} 
        totalAmount={totalAmount} 
        onClearCart={handleClearCart} 
      />

    </main>
  );
}