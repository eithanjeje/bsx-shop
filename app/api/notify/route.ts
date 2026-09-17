import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { orderId, cart, totalPrice } = await request.json();

    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1549937576658346066/Czadle3Volsz86NAuzoQb4bn7VBGak3vHaoVINoNPZMZPHpyJhbs-cMr-igYaWNOi_w-";

    const itemsDescription = cart
      .map((item: any) => `• **${item.quantity}x** ${item.name} (US$${(item.price * item.quantity).toFixed(2)})`)
      .join("\n");

    const discordPayload = {
      embeds: [
        {
          title: "🚨 ¡Nueva Venta Exitosa en BSX Shop!",
          color: 15158332,
          fields: [
            {
              name: "🎟️ Número de Referencia",
              value: `\`${orderId}\``,
              inline: false,
            },
            {
              name: "🛒 Productos Comprados",
              value: itemsDescription,
              inline: false,
            },
            {
              name: "💵 Total Pagado",
              value: `**US$${totalPrice}**`,
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
      throw new Error("Error al enviar notificación a Discord");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en webhook:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}