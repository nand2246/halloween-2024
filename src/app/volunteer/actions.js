"use server";
import prisma from "@/lib/db";

export async function fetchIngredients() {
  return [
    ...(await prisma.ingredient.findMany({
      where: { volunteer: null },
      orderBy: { name: "asc" },
    })),
    ...(await prisma.ingredient.findMany({
      where: { volunteer: { not: null } },
      orderBy: { name: "asc" },
    })),
  ];
}

export async function setVolunteer(id, volunteerName) {
  return await prisma.ingredient.update({
    where: { id: id },
    data: { volunteer: volunteerName },
  });
}
