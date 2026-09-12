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

  // Manejador para el pago con Stripe
  const handleStripeCheckout = async () => {
    try {
      setLoadingStripe(true);
      const response = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product.id, price: product.price, name: product.name }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirige a la pasarela de Stripe
      } else {
        alert("Error al iniciar el pago con Stripe");
        setLoadingStripe(false);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con Stripe");
      setLoadingStripe(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="gamer-card border border-red-500/50 rounded-2xl p-6 bg-black/90 max-w-md w-full relative shadow-[0_0_35px_rgba(239,68,68,0.4)]">
        
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

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

        {/* Botón de Stripe */}
        <div className="mb-4">
          <button
            onClick={handleStripeCheckout}
            disabled={loadingStripe}
            className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loadingStripe ? "Conectando con Stripe..." : "💳 Pagar con Tarjeta (Stripe)"}
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
                  // Redirige a la página de éxito de Discord al completar PayPal
                  window.location.href = `/success?token=${data.orderID}`;
                }
              }}
            />
          </PayPalScriptProvider>
        </div>

      </div>
    </div>
  );
}