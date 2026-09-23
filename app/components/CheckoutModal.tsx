'use client';

import React, { useState } from 'react';

interface CheckoutModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  cart?: any[];
  totalAmount?: number;
  onClearCart?: () => void;
}

export default function CheckoutModal({ 
  isOpen = false, 
  onClose = () => {}, 
  cart = [], 
  totalAmount = 0, 
  onClearCart 
}: CheckoutModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onClearCart) onClearCart();
      if (onClose) onClose();
      alert('¡Orden registrada! Por favor realiza tu pago por Binance Pay y envía tu comprobante o Hash por Discord.');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="bg-neutral-950 border-2 border-red-600 rounded-2xl w-full max-w-lg p-6 shadow-2xl shadow-red-950 text-white relative">
        
        {/* Botón de cierre */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white text-xl font-bold cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-red-500 flex items-center gap-2">
          🛒 Finalizar Compra — BSX Shop
        </h2>

        {/* Resumen del carrito */}
        <div className="bg-neutral-900 border border-red-900 rounded-xl p-3 mb-4 max-h-40 overflow-y-auto">
          <p className="text-xs text-red-400 font-semibold mb-2 uppercase tracking-wider">Productos en tu orden:</p>
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={item.id || index} className="flex justify-between text-sm py-1 border-b border-red-900/50">
                <span>{item.name} (x{item.quantity || 1})</span>
                <span className="text-red-300 font-mono">${((item.price || 0) * (item.quantity || 1)).toFixed(2)} USD</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-neutral-400 italic">No hay productos en el carrito.</p>
          )}
          <div className="flex justify-between font-bold mt-2 pt-2 border-t border-red-800 text-base">
            <span>Total a Pagar:</span>
            <span className="text-red-500 font-mono">${(totalAmount || 0).toFixed(2)} USD</span>
          </div>
        </div>

        {/* Datos de Pago (Binance Pay) */}
        <div className="space-y-3 mb-6">
          <p className="text-xs text-red-400 font-semibold uppercase tracking-wider">Método de Pago Oficial:</p>
          
          <div className="p-4 rounded-xl border border-red-700 bg-neutral-900">
            <div className="flex items-center gap-3 mb-3">
              <div>
                <span className="font-bold block text-base text-red-200">Binance Pay (USDT / Cripto)</span>
                <span className="text-xs text-neutral-300">Pago instantáneo y sin comisiones bancarias</span>
              </div>
            </div>
            
            <div className="text-xs text-neutral-200 bg-neutral-950 p-3 rounded-lg border border-red-900 space-y-1.5">
              <p>Binance UID: <span className="text-red-400 font-mono font-bold text-sm">1270416760</span></p>
              <p>Correo Binance: <span className="text-red-400 font-mono">eithanvargas426@gmail.com</span></p>
              <p className="text-[11px] text-neutral-400 pt-1 border-t border-red-900/60 mt-2">
                * Realiza el monto exacto en Binance Pay y haz clic en confirmar para registrar tu pedido y enviar el comprobante por Discord.
              </p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-medium transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button 
            onClick={handleCheckout}
            disabled={loading}
            className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold shadow-lg shadow-red-900/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? 'Procesando...' : 'Confirmar Pedido 🚀'}
          </button>
        </div>

      </div>
    </div>
  );
}