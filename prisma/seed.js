const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const ingredients = [
  { name: "vodka", color: "", link: "", amount: "" },
  { name: "limes", color: "", link: "", amount: "" },
  { name: "seltzer water", color: "", link: "", amount: "" },
  { name: "midori melon liqueur", color: "", link: "", amount: "" },
  { name: "coconut water", color: "", link: "", amount: "" },
  { name: "canadian whisky", color: "", link: "", amount: "" },
  { name: "sour apple schnapps (sour puss)", color: "", link: "", amount: "" },
  { name: "cranberry juice", color: "", link: "", amount: "" },
  { name: "vodka", color: "", link: "", amount: "" },
  { name: "pumpkin spice creamer", color: "", link: "", amount: "" },
  { name: "kahlúa", color: "", link: "", amount: "" },
  { name: "khipped cream", color: "", link: "", amount: "" },
  { name: "pumpkin pie spice", color: "", link: "", amount: "" },
  { name: "granulated sugar", color: "", link: "", amount: "" },
  { name: "graham crackers", color: "", link: "", amount: "" },
  { name: "blackberries", color: "", link: "", amount: "" },
  { name: "rosemary", color: "", link: "", amount: "" },
  { name: "lemon", color: "", link: "", amount: "" },
  { name: "honey", color: "", link: "", amount: "" },
  { name: "tequila or mezcal", color: "", link: "", amount: "" },
  { name: "orange bitters", color: "", link: "", amount: "" },
  { name: "sparkling water", color: "", link: "", amount: "" },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const ingredient of ingredients) {
    const newIngredient = await prisma.ingredient.upsert({
      where: { name: ingredient.name },
      update: ingredient,
      create: ingredient,
    });
    console.log(`Created ingredient with id: ${newIngredient.id}`);
  }

  console.log(`Seeding finished.`);
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
