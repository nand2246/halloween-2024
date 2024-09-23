"use server";
import prisma from "@/lib/db";

export async function submitRSVP(rawFormData) {
  const formData = {
    name: rawFormData.get("name"),
    email: rawFormData.get("email"),
  };

  await prisma.attendee.create({
    data: { name: formData.name, email: formData.email },
  });
}
