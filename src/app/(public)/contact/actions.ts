"use server";

import prisma from "@/lib/prisma";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;
  
  if (!name || !email || !message) {
    return { success: false, message: "Please fill out all required fields." };
  }

  try {
    await prisma.message.create({
      data: {
        name,
        email,
        phone,
        message,
      },
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, message: "An error occurred while saving your message." };
  }
}
