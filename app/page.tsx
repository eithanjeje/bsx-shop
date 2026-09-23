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
  // Estado del carrito de compras (ejemplo con tus productos)
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
      
      {/* Contenedor principal de la tienda */}
      <div className="w-full max-w-2xl bg-gray-900 border border-purple-500/40 rounded-3xl p-6 shadow-2xl shadow-purple-950/50">
        
        {/* Cabecera */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-purple-400 tracking-wider">BSX SHOP</h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">ENTREGA AUTOMÁTICA 24/7 • PAGOS SEGUROS</p>
        </div>

        {/* Sección del Carrito de Compras */}
        <div className="bg-purple-950/30 border border-purple-500/20 rounded-2xl p-5 mb-6">
          <h2 className="text-lg font-bold mb-1 text-purple-200">Tu Carrito de Compras</h2>
          <p className="text-xs text-gray-400 mb-4">Modifica cantidades o procede al pago con Binance Pay</p>

          {cart.length > 0 ? (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-gray-900/80 border border-purple-500/20 rounded-xl p-3">
                  <div>
                    <span className="font-bold block text-sm">{item.name}</span>
                    <span className="text-xs text-purple-400 font-mono">US${item.price.toFixed(2)} c/u</span>
                  </div>
                  
                  {/* Controles de cantidad */}
                  <div className="flex items-center gap-3 bg-black/40 border border-purple-500/30 rounded-lg px-3 py-1">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-gray-400 hover:text-white font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="font-mono text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-gray-400 hover:text-white font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-6 text-sm">Tu carrito está vacío.</p>
          )}

          {/* Total a pagar */}
          <div className="flex justify-between items-center font-bold mt-6 pt-4 border-t border-purple-500/30 text-lg">
            <span className="text-gray-300">TOTAL A PAGAR:</span>
            <span className="text-green-400 font-mono text-xl">US${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Botón de Proceder al Pago actualizado a Binance Pay */}
        <button
          onClick={() => setIsCheckoutOpen(true)}
          disabled={cart.length === 0}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-base shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-3 tracking-wide"
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