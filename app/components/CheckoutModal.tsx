"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CartItem } from "@/app/page";

interface CheckoutModalProps {
  cart: CartItem[];
  onClose: () => void;
  onClearCart: () => void;
}

export default function CheckoutModal({ cart, onClose, onClearCart }: CheckoutModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  const itemDescription = "BSX Shop: " + cart.map(item => `${item.quantity}x ${item.name}`).join(", ");

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
    >
      <div className="gamer-card border border-red-500/60 rounded-2xl p-6 bg-black max-w-md w-full relative shadow-[0_0_50px_rgba(239,68,68,0.6)] my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-base font-bold cursor-pointer z-30 bg-red-950/60 w-8 h-8 rounded-full flex items-center justify-center border border-red-500/40 transition-all hover:bg-red-600"
        >
          ✕
        </button>

        {!isSuccess ? (
          <>
            <h2 className="text-xl font-black text-white mb-1">Finalizar Compra</h2>
            <p className="text-xs text-gray-400 mb-4">Resumen de tu pedido en USD</p>

            <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-3 mb-4 space-y-2 max-h-48 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs border-b border-red-500/10 pb-2">
                  <span className="text-gray-200 font-medium">
                    <strong className="text-red-400">{item.quantity}x</strong> {item.name}
                  </span>
                  <span className="text-white font-bold">US${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6 bg-zinc-900 border border-red-500/30 px-4 py-3 rounded-xl">
              <span className="text-xs font-bold text-gray-300 uppercase">Total a Pagar:</span>
              <span className="text-lg font-black text-red-500">US${totalPrice}</span>
            </div>

            <div className="mt-2 z-0">
              <PayPalScriptProvider 
                options={{ 
                  clientId: "BAAVWzBgpz3ZR-aEe0nPqCzSNjidhMXYP2k2VLApS9QBOxcTUStOccfuo8HzXzpwOEqY65MrySFFwM68yg", 
                  currency: "USD" 
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: totalPrice,
                          },
                          description: itemDescription,
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    if (actions.order) {
                      await actions.order.capture();
                      const customOrderId = "BSX-" + Math.floor(100000 + Math.random() * 900000);
                      setOrderId(customOrderId);
                      setIsSuccess(true);
                      onClearCart();
                    }
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </>
        ) : (
          <div className="text-center py-2">
            <div className="w-16 h-16 bg-red-600/20 border border-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 text-3xl shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              ✓
            </div>

            <h2 className="text-xl font-black text-white mb-1">¡Pago Exitoso!</h2>
            <p className="text-gray-400 text-xs mb-4">
              Tu pago en <span className="text-red-500 font-bold">BSX Shop</span> se ha procesado con éxito.
            </p>

            <div className="bg-red-950/40 border border-red-500/20 rounded-xl p-3 mb-5 text-left">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Número de Referencia / Orden:</div>
              <div className="text-sm font-mono text-red-300 font-black">{orderId}</div>
              <div className="text-[10px] text-gray-400 mt-2">Detalle comprado: <span className="text-gray-200">{itemDescription}</span></div>
            </div>

            <div className="border-t border-red-500/20 pt-4 mb-5">
              <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                📸 <strong className="text-white">Paso final:</strong> Toma captura de pantalla a este comprobante y al número de referencia para abrir tu ticket en Discord.
              </p>
              <a
                href="https://discord.gg/2F87YVpZD" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(88,101,242,0.4)]"
              >
                Ir a Discord a reclamar 🚀
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-gray-400 hover:text-white underline cursor-pointer"
            >
              Cerrar menú
            </button>
          </div>
        )}
      </div>
    </div>
  );
}