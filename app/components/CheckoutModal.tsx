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

  const handleStripeCheckout = async () => {
    setLoadingStripe(true);
    try {
      const res = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: Number(product.price),
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error al iniciar Stripe: " + (data.error || ""));
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con Stripe.");
    } finally {
      setLoadingStripe(false);
    }
  };

  // ==========================================
  // AQUÍ COMIENZA LA ESTRUCTURA DE RETURN
  // ==========================================
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.85)", zIndex: 999999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", overflowY: "auto" }}>
      <div style={{ backgroundColor: "#121212", border: "2px solid #ef4444", padding: "24px", borderRadius: "16px", maxWidth: "400px", width: "100%", color: "white", boxShadow: "0 0 30px rgba(239, 68, 68, 0.4)", position: "relative", margin: "auto" }}>
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: "15px", right: "15px", background: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}
        >
          ✕ CERRAR
        </button>

        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px", paddingRight: "60px" }}>
          {product.name}
        </h3>
        <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "15px" }}>Selecciona tu método de pago</p>

        <div style={{ fontSize: "24px", fontWeight: "900", color: "#ef4444", marginBottom: "20px" }}>
          MX${Number(product.price).toFixed(2)}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {/* Botón de Stripe */}
          <button
            onClick={handleStripeCheckout}
            disabled={loadingStripe}
            style={{ width: "100%", backgroundColor: "#dc2626", color: "white", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "14px" }}
          >
            {loadingStripe ? "Conectando con Stripe..." : "💳 Pagar con Tarjeta (Stripe)"}
          </button>

          <div style={{ textAlign: "center", color: "#6b7280", fontSize: "12px" }}>O</div>

          {/* PayPal */}
          <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "10px" }}>
            <PayPalScriptProvider
              options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
                currency: "MXN",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical", color: "blue", shape: "rect", label: "pay" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        description: product.name,
                        amount: {
                          currency_code: "MXN",
                          value: Number(product.price).toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  if (actions.order) {
                    await actions.order.capture();
                    alert("¡Pago con PayPal completado con éxito!");
                    onClose();
                  }
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  );
  // ==========================================
  // AQUÍ TERMINA LA ESTRUCTURA DE RETURN
  // ==========================================
}