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
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.85)', padding: '16px', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#0f0202', border: '2px solid #dc2626', borderRadius: '20px', width: '100%', maxWidth: '500px', padding: '24px', boxShadow: '0 25px 50px -12px rgba(127, 29, 29, 0.6)', color: '#ffffff', position: 'relative' }}>
        
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#a3a3a3', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>✕</button>

        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px 0' }}>
          🛒 Finalizar Compra — BSX Shop
        </h2>

        {/* Resumen */}
        <div style={{ backgroundColor: '#180303', border: '1px solid #7f1d1d', borderRadius: '12px', padding: '12px', marginBottom: '16px', maxHeight: '160px', overflowY: 'auto' }}>
          <p style={{ fontSize: '11px', color: '#f87171', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', margin: '0 0 8px 0' }}>Productos en tu orden:</p>
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={item.id || index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0', borderBottom: '1px solid rgba(127, 29, 29, 0.3)' }}>
                <span>{item.name} (x{item.quantity || 1})</span>
                <span style={{ color: '#fca5a5', fontFamily: 'monospace' }}>${((item.price || 0) * (item.quantity || 1)).toFixed(2)} USD</span>
              </div>
            ))
          ) : (
            <p style={{ fontSize: '12px', color: '#a3a3a3', fontStyle: 'italic', margin: 0 }}>No hay productos en el carrito.</p>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #7f1d1d', fontSize: '15px' }}>
            <span>Total a Pagar:</span>
            <span style={{ color: '#ef4444', fontFamily: 'monospace' }}>${(totalAmount || 0).toFixed(2)} USD</span>
          </div>
        </div>

        {/* Binance Pay Info */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '11px', color: '#f87171', fontWeight: '600', textTransform: 'uppercase', margin: '0 0 8px 0' }}>Método de Pago Oficial:</p>
          <div style={{ padding: '14px', borderRadius: '12px', border: '1px solid #dc2626', backgroundColor: '#180303' }}>
            <span style={{ fontWeight: 'bold', display: 'block', fontSize: '14px', color: '#fca5a5', marginBottom: '6px' }}>Binance Pay (USDT / Cripto)</span>
            <div style={{ fontSize: '12px', color: '#e5e5e5', backgroundColor: '#0a0101', padding: '10px', borderRadius: '8px', border: '1px solid #7f1d1d', lineHeight: '1.6' }}>
              <div>Binance UID: <strong style={{ color: '#ef4444', fontFamily: 'monospace' }}>1270416760</strong></div>
              <div>Correo Binance: <strong style={{ color: '#ef4444', fontFamily: 'monospace' }}>eithanvargas426@gmail.com</strong></div>
              <div style={{ fontSize: '11px', color: '#a3a3a3', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(127, 29, 29, 0.4)' }}>
                * Realiza el monto exacto en Binance Pay y haz clic en confirmar para registrar tu pedido y enviar el comprobante por Discord.
              </div>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: '12px', backgroundColor: '#180303', border: '1px solid #525252', color: '#d4d4d4', fontWeight: '500', cursor: 'pointer' }}>
            Cancelar
          </button>
          <button onClick={handleCheckout} disabled={loading} style={{ flex: 1, padding: '12px', borderRadius: '12px', backgroundColor: '#dc2626', border: 'none', color: '#ffffff', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.4)' }}>
            {loading ? 'Procesando...' : 'Confirmar Pedido 🚀'}
          </button>
        </div>

      </div>
    </div>
  );
}