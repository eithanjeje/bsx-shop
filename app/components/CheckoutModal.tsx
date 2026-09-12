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
  const [loadingStripe, setLoadingStripe] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Estado para mostrar la pantalla de éxito en el mismo modal
  const [orderId, setOrderId] = useState("");

  // Simulación o llamada para Stripe integrada en el modal
  const handleStripeCheckout = async () => {
    try {
      setLoadingStripe(true);
      // Aquí simulamos el proceso de pago exitoso dentro de la misma tienda (ideal para modo prueba o webhook directo)
      setTimeout(() => {
        setOrderId("STRIPE-" + Math.floor(Math.random() * 1000000));
        setLoadingStripe(false);
        setIsSuccess(true); // Cambia el modal a la vista de éxito
      }, 1500);
    } catch (error) {
      console.error(error);
      alert("Error en el pago");
      setLoadingStripe(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="gamer-card border border-red-500/50 rounded-2xl p-6 bg-black/95 max-w-md w-full relative shadow-[0_0_35px_rgba(239,68,68,0.4)]">
        
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg font-bold cursor-pointer"
        >
          ✕
        </button>

        {/* SI EL PAGO NO SE HA COMPLETADO, MUESTRA EL FORMULARIO DE PAGO */}
        {!isSuccess ? (
          <>
            <h2 className="text-xl font-black text-white mb-1">Finalizar Compra</h2>
            <p className="text-xs text-gray-400 mb-4">Selecciona tu método de pago preferido</p>

            {/* Resumen del producto */}
            <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-3 mb-6 flex justify-between items-center">
              <div>
                <div className="text-sm font-bold text-white">{product.name}</div>
                <div className="text-[10px] text-gray-400">Entrega automática 24/7</div>
              </div>
              <div className="text-lg font-black text-red-500">MX${product.price.toFixed(2)}</div>
            </div>

            {/* Botón de Tarjeta / Stripe */}
            <div className="mb-4">
              <button
                onClick={handleStripeCheckout}
                disabled={loadingStripe}
                className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loadingStripe ? "Procesando pago..." : "💳 Pagar con Tarjeta (Stripe)"}
              </button>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-red-500/20"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-[10px] uppercase tracking-wider">o también</span>
              <div className="flex-grow border-t border-red-500/20"></div>
            </div>

            {/* Botones de PayPal */}
            <div className="mt-4 z-0">
              <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test", currency: "MXN" }}>
                <PayPalButtons
                  style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "MXN",
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
                      setOrderId(data.orderID || "PAYPAL-ORDER");
                      setIsSuccess(true); // Cambia el modal directamente a la pantalla de Discord
                    }
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </>
        ) : (
          /* SI EL PAGO SE COMPLETÓ, MUESTRA EL MENSAJE DE ÉXITO Y DISCORD DENTRO DEL MISMO MODAL */
          <div className="text-center py-4">
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
                📸 <strong className="text-white">Siguiente paso obligatorio:</strong> Toma captura de pantalla a este comprobante y abre un ticket en nuestro servidor de Discord para reclamar tu producto automáticamente.
              </p>
              <a
                href="https://discord.gg/TU_LINK_DE_DISCORD" 
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
              Cerrar ventana
            </button>
          </div>
        )}

      </div>
    </div>
  );
}