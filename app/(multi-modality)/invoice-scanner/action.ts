"use server";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

export const sendData = async (formData: FormData) => {
  // "use server";
  console.log("formData", formData.get("invoice"));

  const file = formData.get("invoice") as File;

  const result = await generateObject({
    model: google("gemini-2.5-pro-exp-03-25"),
    system:
      "Tu es un expert en traitement de documents et en extraction de données." +
      "Tu es capable d'extraire des informations pertinentes à partir d' image (facture )." +
      "Tu dois extraire les informations suivantes : nom de l'entreprise, numéro de facture, date, montant total, et les articles avec leur description, quantité, prix unitaire et prix total." +
      "Tu dois suivre le format que je te donne pour le output.",

    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              `Voici le fichier PDF : ${file.name}.` +
              "Tu dois extraire les informations suivantes : nom de l'entreprise, numéro de facture, date, montant total, et les articles avec leur description, quantité, prix unitaire et prix total." +
              "Tu dois suivre le format que je te donne pour le output.",
          },
          {
            type: "file",
            data: await file.arrayBuffer(),
            mimeType: "image/png",
          },
        ],
      },
    ],
    schema: z.object({
      companyName: z.string(),
      invoiceNumber: z.string(),
      date: z.string(),
      totalAmount: z.string(),
      items: z.array(
        z.object({
          description: z.string(),
          quantity: z.number(),
          unitPrice: z.number(),
          totalPrice: z.number(),
        })
      ),
    }),
  });

  console.log("result", result.toJsonResponse());
  //   return result.toJsonResponse();
};
