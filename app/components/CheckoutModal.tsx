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

  const sendDiscordNotification = async (generatedOrderId: string) => {
    try {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: generatedOrderId,
          cart,
          totalPrice,
        }),
      });
    } catch (error) {
      console.error("No se pudo notificar a Discord:", error);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
    >
      <div 
        style={{
          backgroundColor: '#09090b',
          border: '1px solid rgba(239, 68, 68, 0.5)',
          borderRadius: '16px',
          padding: '24px',
          width: '100%',
          maxWidth: '400px',
          position: 'relative',
          color: 'white',
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.3)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#18181b',
            border: '1px solid #27272a',
            color: '#a1a1aa',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>

        {!isSuccess ? (
          <>
            <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '4px' }}>Finalizar Compra</h2>
            <p style={{ fontSize: '11px', color: '#a1a1aa', marginBottom: '16px' }}>Resumen detallado de tu pedido</p>

            <div style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '12px', marginBottom: '16px', maxHeight: '150px', overflowY: 'auto' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px', borderBottom: '1px solid #27272a', paddingBottom: '6px' }}>
                  <span><strong style={{ color: '#ef4444' }}>{item.quantity}x</strong> {item.name}</span>
                  <span style={{ fontWeight: 'bold' }}>US${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', backgroundColor: '#18181b', padding: '12px 16px', borderRadius: '12px', border: '1px solid #27272a' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#a1a1aa' }}>TOTAL A PAGAR:</span>
              <span style={{ fontSize: '16px', fontWeight: '900', color: '#ef4444' }}>US${totalPrice}</span>
            </div>

            <div>
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
                      
                      // Disparar la notificación detallada a Discord
                      sendDiscordNotification(customOrderId);
                    }
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ef4444', fontSize: '24px' }}>
              ✓
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '4px' }}>¡Pago Exitoso!</h2>
            <p style={{ fontSize: '11px', color: '#a1a1aa', marginBottom: '16px' }}>
              Tu compra en <strong style={{ color: '#ef4444' }}>BSX Shop</strong> se procesó con éxito.
            </p>

            <div style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '12px', marginBottom: '16px', textAlign: 'left' }}>
              <div style={{ fontSize: '10px', color: '#a1a1aa', textTransform: 'uppercase' }}>Número de Referencia:</div>
              <div style={{ fontSize: '14px', fontFamily: 'monospace', color: '#fca5a5', fontWeight: '900', marginBottom: '6px' }}>{orderId}</div>
              <div style={{ fontSize: '10px', color: '#a1a1aa' }}>Detalle: <span style={{ color: 'white' }}>{itemDescription}</span></div>
            </div>

            <div style={{ borderTop: '1px solid #27272a', paddingTop: '16px', marginBottom: '16px' }}>
              <p style={{ fontSize: '11px', color: '#d4d4d8', marginBottom: '12px', lineHeight: '1.5' }}>
                📸 <strong>Paso final:</strong> Toma captura de pantalla a este comprobante y al número de referencia para abrir tu ticket en Discord.
              </p>
              <a
                href="https://discord.gg/2F87YVpZD" 
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', width: '100%', backgroundColor: '#5865F2', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '12px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 0 15px rgba(88,101,242,0.4)' }}
              >
                Ir a Discord a reclamar 🚀
              </a>
            </div>

            <button
              onClick={onClose}
              style={{ fontSize: '11px', color: '#a1a1aa', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}
            >
              Cerrar menú
            </button>
          </div>
        )}
      </div>
    </div>
  );
}