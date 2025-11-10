"use server";

import { connectDB } from "@/lib/mongodb";
import WhatsappModel from "@/model/Whatsapp";

export async function addWhatsappNumber(formData) {
  const whatsapp = formData.get("whatsapp");

  if (!whatsapp || whatsapp.length < 8) {
    return { success: false, message: "Enter a valid WhatsApp number!" };
  }

  await connectDB();

  await WhatsappModel.deleteMany();
  await WhatsappModel.create({ number: whatsapp });

  return { success: true, message: "WhatsApp number updated successfully!" };
}
