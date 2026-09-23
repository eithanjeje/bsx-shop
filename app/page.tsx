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
  const [cart, setCart] = useState<CartItem[]>([
    { id: '1', name: 'RPG', price: 1.50, quantity: 1 },
    { id: '2', name: 'Anaconda', price: 5.00, quantity: 2 },
  ]);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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

  const handleClearCart = () => setCart([]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#050505', color: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Contenedor principal */}
      <div style={{ width: '100%', maxWidth: '600px', backgroundColor: '#0f0202', border: '2px solid #dc2626', borderRadius: '24px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(127, 29, 29, 0.4)' }}>
        
        {/* Cabecera */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#ef4444', letterSpacing: '2px', margin: '0 0 8px 0' }}>BSX SHOP</h1>
          <p style={{ fontSize: '11px', color: '#a3a3a3', letterSpacing: '1px', textTransform: 'uppercase', margin: 0, fontWeight: '600' }}>ENTREGA AUTOMÁTICA 24/7 • PAGOS SEGUROS</p>
        </div>

        {/* Carrito */}
        <div style={{ backgroundColor: '#180303', border: '1px solid #7f1d1d', borderRadius: '16px', padding: '16px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#f87171', margin: '0 0 4px 0' }}>Tu Carrito de Compras</h2>
          <p style={{ fontSize: '12px', color: '#a3a3a3', margin: '0 0 16px 0' }}>Modifica cantidades o procede al pago con Binance Pay</p>

          {cart.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', backgroundColor: '#0a0101', border: '1px solid #7f1d1d', borderRadius: '12px', padding: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 'bold', display: 'block', fontSize: '14px', color: '#ffffff' }}>{item.name}</span>
                    <span style={{ fontSize: '12px', color: '#f87171', fontFamily: 'monospace' }}>US${item.price.toFixed(2)} c/u</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#180303', border: '1px solid #991b1b', borderRadius: '8px', padding: '4px 10px' }}>
                    <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', color: '#d4d4d4', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>-</button>
                    <span style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 'bold', color: '#ffffff', minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', color: '#d4d4d4', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>+</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#737373', padding: '24px 0', fontSize: '14px', margin: 0 }}>Tu carrito está vacío.</p>
          )}

          {/* Total */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #7f1d1d', fontSize: '16px' }}>
            <span style={{ color: '#d4d4d4' }}>TOTAL A PAGAR:</span>
            <span style={{ color: '#ef4444', fontFamily: 'monospace', fontSize: '20px' }}>US${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Botón de pago */}
        <button
          onClick={() => setIsCheckoutOpen(true)}
          disabled={cart.length === 0}
          style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: cart.length === 0 ? '#525252' : '#dc2626', color: '#ffffff', fontWeight: '800', fontSize: '15px', border: 'none', cursor: cart.length === 0 ? 'not-allowed' : 'pointer', boxShadow: '0 10px 15px -3px rgba(220, 38, 38, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          <span>Proceder al Pago con Binance Pay</span>
          <span style={{ fontSize: '18px' }}>🚀</span>
        </button>

      </div>

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