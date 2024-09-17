const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const volunteers = [
  {
    ingredient: "vodka",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const volunteer of volunteers) {
    const newVolunteer = await prisma.volunteer.upsert({
      where: { ingredient: volunteer.ingredient },
      update: {},
      create: volunteer,
    });
    console.log(`Created user with id: ${newVolunteer.id}`);
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
