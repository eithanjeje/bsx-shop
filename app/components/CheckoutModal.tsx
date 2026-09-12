"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface CheckoutModalProps {
  product: {
    id: string;
    name: string;
    price: number;
  };
  onClose: () => void;
}

export default function CheckoutModal({ product, onClose }: CheckoutModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

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
      <div 
        className="gamer-card border border-red-500/60 rounded-2xl p-6 bg-black max-w-md w-full relative shadow-[0_0_50px_rgba(239,68,68,0.6)] my-auto"
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-base font-bold cursor-pointer z-30 bg-red-950/60 w-8 h-8 rounded-full flex items-center justify-center border border-red-500/40 transition-all hover:bg-red-600"
        >
          ✕
        </button>

        {!isSuccess ? (
          /* PASO 1: FORMULARIO DE PAGO */
          <>
            <h2 className="text-xl font-black text-white mb-1">Finalizar Compra</h2>
            <p className="text-xs text-gray-400 mb-4">Selecciona tu método de pago</p>

            {/* Resumen del producto en USD */}
            <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-3 mb-6 flex justify-between items-center">
              <div>
                <div className="text-sm font-bold text-white">{product.name}</div>
                <div className="text-[10px] text-gray-400">Entrega automática 24/7</div>
              </div>
              <div className="text-lg font-black text-red-500">US${product.price.toFixed(2)}</div>
            </div>

            {/* Botones de PayPal configurados en USD */}
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
                            value: product.price.toFixed(2),
                          },
                          description: product.name,
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    if (actions.order) {
                      await actions.order.capture();
                      const paypalId = data.orderID || "PAYPAL-" + Math.floor(Math.random() * 900000);
                      setOrderId(paypalId);
                      setIsSuccess(true);
                    }
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </>
        ) : (
          /* PASO 2: MENÚ DE ÉXITO Y DISCORD */
          <div className="text-center py-2">
            <div className="w-16 h-16 bg-red-600/20 border border-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 text-3xl shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              ✓
            </div>

            <h2 className="text-xl font-black text-white mb-1">¡Pago Exitoso!</h2>
            <p className="text-gray-400 text-xs mb-4">
              Gracias por tu compra en <span className="text-red-500 font-bold">BSX!</span>
            </p>

            <div className="bg-red-950/40 border border-red-500/20 rounded-xl p-3 mb-5 text-left">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">ID de Orden / Referencia:</div>
              <div className="text-xs font-mono text-red-300 break-all">{orderId}</div>
            </div>

            <div className="border-t border-red-500/20 pt-4 mb-5">
              <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                📸 <strong className="text-white">Siguiente paso obligatorio:</strong> Toma una captura de pantalla a este comprobante y abre un ticket en nuestro servidor de Discord para reclamar tu producto de forma automática.
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