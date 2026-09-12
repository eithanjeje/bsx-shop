"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("session_id") || searchParams.get("token") || "BSX-ORDER";

  return (
    <main className="min-h-screen text-white font-sans flex flex-col items-center justify-center p-4">
      <div className="gamer-card border border-red-500/50 rounded-2xl p-8 bg-black/85 backdrop-blur-md max-w-md w-full text-center shadow-[0_0_30px_rgba(239,68,68,0.3)]">
        
        <div className="w-16 h-16 bg-red-600/20 border border-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 text-3xl shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          ✓
        </div>

        <h1 className="text-2xl font-black text-white mb-2">¡Pago Exitoso!</h1>
        <p className="text-gray-400 text-xs mb-6">
          Gracias por tu compra en <span className="text-red-500 font-bold">BSX!</span>
        </p>

        <div className="bg-red-950/40 border border-red-500/20 rounded-xl p-3 mb-6 text-left">
          <div className="text-[10px] text-gray-400 uppercase tracking-wider">ID de Orden / Referencia:</div>
          <div className="text-xs font-mono text-red-300 break-all">{paymentId}</div>
        </div>

        <div className="border-t border-red-500/20 pt-4 mb-6">
          <p className="text-xs text-gray-300 mb-4 leading-relaxed">
            📸 <strong className="text-white">Siguiente paso obligatorio:</strong> Toma una captura de pantalla a este comprobante y abre un ticket en nuestro servidor de Discord para reclamar tu producto de forma automática.
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

        <a
          href="/"
          className="text-xs text-gray-500 hover:text-gray-300 underline transition-colors"
        >
          Volver a la tienda
        </a>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-white text-center p-10">Cargando comprobante...</div>}>
      <SuccessContent />
    </Suspense>
  );
}