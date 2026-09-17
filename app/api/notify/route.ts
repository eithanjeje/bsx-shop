import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, cart, totalPrice } = body;

    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1549937576658346066/Czadle3Volsz86NAuzoQb4bn7VBGak3vHaoVINoNPZMZPHpyJhbs-cMr-igYaWNOi_w-";

    // Validar y formatear los productos de forma segura
    let itemsDescription = "No se especificaron los productos";
    
    if (Array.isArray(cart) && cart.length > 0) {
      itemsDescription = cart
        .map((item: any) => {
          const name = item.name || item.title || "Artículo sin nombre";
          const qty = item.quantity || 1;
          const price = item.price ? Number(item.price).toFixed(2) : "0.00";
          return `• **${qty}x** ${name} (US$${(Number(price) * qty).toFixed(2)})`;
        })
        .join("\n");
    }

    const discordPayload = {
      embeds: [
        {
          title: "🚨 ¡Nueva Venta Exitosa en BSX Shop!",
          color: 15158332,
          fields: [
            {
              name: "🎟️ Número de Referencia",
              value: `\`${orderId || "BSX-UNKNOWN"}\``,
              inline: false,
            },
            {
              name: "🛒 Productos Comprados",
              value: itemsDescription,
              inline: false,
            },
            {
              name: "💵 Total Pagado",
              value: `**US$${totalPrice || "0.00"}**`,
              inline: true,
            },
            {
              name: "💳 Método",
              value: "PayPal",
              inline: true,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "BSX Shop - Automatización 24/7",
          },
        },
      ],
    };

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error de Discord Webhook:", errorText);
      throw new Error("Error al enviar notificación a Discord");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error crítico en route.ts:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}