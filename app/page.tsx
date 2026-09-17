"use client";

import { useState } from "react";
import CheckoutModal from "@/app/components/CheckoutModal";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: "1", name: "RPG", price: 1.50, description: "Arma potente para dominar el servidor." },
  { id: "2", name: "Anaconda", price: 5.00, description: "Exclusivo paquete de alto rendimiento." },
  { id: "3", name: "Millón Drop", price: 3.00, description: "Drop instantáneo para mejorar tu economía." },
];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.reduce<CartItem[]>((acc, item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          if (newQty > 0) {
            acc.push({ ...item, quantity: newQty });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      
      {/* MENÚ SUPERIOR SÓLIDO */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: '#000', borderBottom: '1px solid rgba(239, 68, 68, 0.4)', padding: '16px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <span style={{ fontSize: '18px', fontWeight: '900', letterSpacing: '1px', color: '#ef4444' }}>
            BSX SHOP
          </span>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setIsCartOpen(true)}
              style={{ position: 'relative', backgroundColor: '#18181b', border: '1px solid rgba(239, 68, 68, 0.6)', color: 'white', padding: '8px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              🛒 Carrito
              {totalItemsCount > 0 && (
                <span style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#ef4444', color: 'white', fontSize: '10px', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', border: '2px solid black' }}>
                  {totalItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ backgroundColor: '#18181b', border: '1px solid #27272a', color: 'white', padding: '8px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Menú ☰
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div style={{ maxWidth: '900px', margin: '12px auto 0', paddingTop: '10px', borderTop: '1px solid #27272a', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <a href="https://discord.gg/2F87YVpZD" target="_blank" rel="noopener noreferrer" style={{ padding: '8px', backgroundColor: '#18181b', borderRadius: '8px', color: '#d4d4d8', textDecoration: 'none' }}>
              💬 Soporte / Discord (Abrir Ticket)
            </a>
            <div style={{ padding: '4px 8px', color: '#a1a1aa', fontSize: '11px' }}>
              Estado: <span style={{ color: '#4ade80', fontWeight: 'bold' }}>Online 24/7</span>
            </div>
          </div>
        )}
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main style={{ maxWidth: '900px', width: '100%', margin: '0 auto', padding: '30px 16px', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '6px', letterSpacing: '0.5px' }}>
            TIENDA OFICIAL
          </h1>
          <p style={{ fontSize: '12px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Entrega automática 24/7 • Pagos seguros por PayPal
          </p>
        </div>

        {/* GRID DE PRODUCTOS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', width: '100%', marginBottom: '40px' }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{ backgroundColor: '#09090b', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', color: 'white' }}>{product.name}</h3>
                  <span style={{ fontSize: '13px', fontWeight: '900', color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.15)', padding: '4px 10px', borderRadius: '20px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    US${product.price.toFixed(2)}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '20px', lineHeight: '1.5' }}>
                  {product.description}
                </p>
              </div>

              <button
                onClick={() => addToCart(product)}
                style={{ width: '100%', backgroundColor: '#dc2626', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 0 15px rgba(220, 38, 38, 0.4)' }}
              >
                Agregar al Carrito 🛒
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #18181b', fontSize: '11px', color: '#71717a', backgroundColor: '#000' }}>
        BSX Shop © 2026 • Todos los derechos reservados
      </footer>

      {/* MODAL DE CARRITO (Estilo Tarjeta Central idéntico al de comprobantes) */}
      {isCartOpen && (
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
            {/* Botón Cerrar */}
            <button
              onClick={() => setIsCartOpen(false)}
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

            <h2 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '4px' }}>Tu Carrito de Compras</h2>
            <p style={{ fontSize: '11px', color: '#a1a1aa', marginBottom: '16px' }}>Modifica cantidades o procede al pago</p>

            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#71717a', fontSize: '12px' }}>
                Tu carrito está vacío. ¡Agrega productos!
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto', marginBottom: '16px', paddingRight: '4px' }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '2px' }}>{item.name}</div>
                        <div style={{ fontSize: '11px', color: '#ef4444' }}>US${item.price.toFixed(2)} c/u</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#000', border: '1px solid #27272a', borderRadius: '8px', padding: '4px 8px' }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ color: '#d4d4d8', background: 'none', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', padding: '0 4px' }}>-</button>
                        <span style={{ fontSize: '13px', fontWeight: '900', color: 'white', width: '16px', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ color: '#d4d4d8', background: 'none', border: 'none', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', padding: '0 4px' }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', backgroundColor: '#18181b', padding: '12px 16px', borderRadius: '12px', border: '1px solid #27272a' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#a1a1aa' }}>TOTAL A PAGAR:</span>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#ef4444' }}>
                    US${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  style={{ width: '100%', backgroundColor: '#dc2626', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 0 15px rgba(220, 38, 38, 0.4)' }}
                >
                  Proceder al Pago con PayPal 🚀
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* MODAL DE PAGO PAYPAL */}
      {isCheckoutOpen && (
        <CheckoutModal
          cart={cart}
          onClose={() => setIsCheckoutOpen(false)}
          onClearCart={() => setCart([])}
        />
      )}
    </div>
  );
}