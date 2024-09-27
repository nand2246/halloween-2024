"use server";
import prisma from "@/lib/db";

export async function fetchUnclaimedIngredients() {
  return await prisma.ingredient.findMany({
    where: { volunteer: null },
    orderBy: { name: "asc" },
  });
}

export async function fetchClaimedIngredients() {
  const promises = [
    new Promise((resolve) =>
      resolve(
        prisma.ingredient.findMany({
          where: { volunteer: { not: null } },
          orderBy: { name: "asc" },
        })
      )
    ),
    new Promise((resolve) =>
      resolve(
        prisma.customIngredient.findMany({
          orderBy: { name: "asc" },
        })
      )
    ),
  ];
  return await Promise.all(promises).then((res) => {
    return res.flat().sort((a, b) => (a.name < b.name ? -1 : 1));
  });
}

export async function setVolunteer(id, volunteerName) {
  return await prisma.ingredient.update({
    where: { id: id },
    data: { volunteer: volunteerName },
  });
}

export async function addCustomIngredient(volunteer, name) {
  return await prisma.customIngredient.create({
    data: {
      name: name,
      volunteer: volunteer,
    },
  });
}

export async function deleteCustomIngredient(id) {
  return await prisma.customIngredient.delete({
    where: {
      id: id,
    },
  });
}
