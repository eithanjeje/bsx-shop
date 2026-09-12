const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: "Drop 1m",
        description: "Producto Drop 1m de la tienda BSX",
        price: 50.0,
        stock: 10,
        category: "General",
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        name: "RPG",
        description: "Producto RPG de la tienda BSX",
        price: 17.0,
        stock: 10,
        category: "General",
        imageUrl: "https://via.placeholder.com/150",
      },
      {
        name: "Anaconda",
        description: "Producto Anaconda de la tienda BSX",
        price: 80.0,
        stock: 10,
        category: "General",
        imageUrl: "https://via.placeholder.com/150",
      },
    ],
  });

  console.log("¡Productos actualizados con éxito!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });