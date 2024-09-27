const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const ingredients = [
  {
    name: "vodka",
    color: "#6495ed",
    link: "https://www.bcliquorstores.com/product/405832",
    amount: "750mL",
  },
  {
    name: "seltzer water",
    color: "#8DC5A4",
    link: "https://www.saveonfoods.com/sm/pickup/rsid/937/product/perrier-original-natural-sparkling-water-id-00074780355612",
    amount: "4 bottles (1L each)",
  },
  {
    name: "midori melon liqueur #1",
    color: "#BBF696",
    link: "https://www.bcliquorstores.com/product/1815",
    amount: "750mL",
  },
  {
    name: "midori melon liqueur #2",
    color: "#BBF696",
    link: "https://www.bcliquorstores.com/product/1815",
    amount: "750mL",
  },
  {
    name: "coconut water",
    color: "#E7E5E3",
    link: "https://www.saveonfoods.com/sm/pickup/rsid/937/product/vitacoco-100-pure-coconut-water-id-00898999000503/",
    amount: "1L",
  },
  {
    name: "canadian whiskey",
    color: "#E38200",
    link: "https://www.bcliquorstores.com/product/1487",
    amount: "750mL",
  },
  {
    name: "sour puss apple",
    color: "#76CD26",
    link: "https://www.bcliquorstores.com/product/518688",
    amount: "750mL",
  },
  {
    name: "cranberry juice",
    color: "#7A1717",
    link: "https://www.saveonfoods.com/sm/pickup/rsid/937/product/ocean-spray-cranberry-100-juice-blend-id-00031200046079",
    amount: "1 bottle",
    whiteText: true,
  },
  {
    name: "tequila #1",
    color: "#F4D0A4",
    link: "https://www.bcliquorstores.com/product/576264",
    amount: "750mL",
  },
  {
    name: "tequila #2",
    color: "#F4D0A4",
    link: "https://www.bcliquorstores.com/product/576264",
    amount: "750mL",
  },
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
