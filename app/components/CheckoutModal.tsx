'use client';

import React, { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  totalAmount: number;
  onClearCart?: () => void; // <--- Agregado aquí para evitar el error de TypeScript
}

export default function CheckoutModal({ isOpen, onClose, cart, totalAmount, onClearCart }: CheckoutModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onClearCart) onClearCart(); // Limpia el carrito si la función existe
      onClose();
      alert('¡Orden registrada! Por favor realiza tu pago por Binance Pay y envía tu comprobante o Hash por Discord.');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-purple-500/40 rounded-2xl w-full max-w-lg p-6 shadow-2xl shadow-purple-950/50 text-white relative">
        
        {/* Botón de cierre */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-purple-300 flex items-center gap-2">
          🛒 Finalizar Compra — BSX Shop
        </h2>

        {/* Resumen del carrito */}
        <div className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-3 mb-4 max-h-40 overflow-y-auto">
          <p className="text-xs text-purple-400 font-semibold mb-2 uppercase tracking-wider">Productos en tu orden:</p>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm py-1 border-b border-purple-500/10">
              <span>{item.name} (x{item.quantity})</span>
              <span className="text-purple-300 font-mono">${(item.price * item.quantity).toFixed(2)} USD</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-2 pt-2 border-t border-purple-500/30 text-base">
            <span>Total a Pagar:</span>
            <span className="text-green-400 font-mono">${totalAmount.toFixed(2)} USD</span>
          </div>
        </div>

        {/* Datos de Pago (Binance Pay) */}
        <div className="space-y-3 mb-6">
          <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Método de Pago Oficial:</p>
          
          <div className="p-4 rounded-xl border border-purple-500 bg-purple-900/30">
            <div className="flex items-center gap-3 mb-3">
              <div>
                <span className="font-bold block text-base text-purple-200">Binance Pay (USDT / Cripto)</span>
                <span className="text-xs text-gray-300">Pago instantáneo y sin comisiones bancarias</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-200 bg-purple-950/60 p-3 rounded-lg border border-purple-500/30 space-y-1.5">
              <p>Binance UID: <span className="text-purple-300 font-mono font-bold text-sm">1270416760</span></p>
              <p>Correo Binance: <span className="text-purple-300 font-mono">eithanvargas426@gmail.com</span></p>
              <p className="text-[11px] text-gray-400 pt-1 border-t border-purple-500/20 mt-2">
                * Realiza el monto exacto en Binance Pay y haz clic en confirmar para registrar tu pedido y enviar el comprobante por Discord.
              </p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-all"
          >
            Cancelar
          </button>
          <button 
            onClick={handleCheckout}
            disabled={loading}
            className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Procesando...' : 'Confirmar Pedido 🚀'}
          </button>
        </div>

      </div>
    </div>
  );
}