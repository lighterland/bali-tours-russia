import { z } from "zod";
import { supportedLanguages } from "@/lib/i18n";
import { findBaliService } from "@/lib/bali-services";

export const contactChannels = ["WhatsApp", "Telegram", "VK", "Email"] as const;

export const enquirySchema = z
  .object({
    enquiryId: z.string().uuid(),
    name: z.string().trim().min(2).max(100),
    whatsapp: z
      .string()
      .trim()
      .regex(/^\+?[1-9]\d{7,14}$/, "Use an international WhatsApp number"),
    email: z.union([z.string().trim().email(), z.literal("")]),
    preferredChannel: z.enum(contactChannels),
    date: z.string().trim().max(100),
    guests: z.string().trim().max(20),
    packageId: z.string().trim().min(1).max(100),
    pickup: z.string().trim().max(200),
    notes: z.string().trim().max(1500),
    language: z.enum(supportedLanguages).default("ru"),
    consent: z.literal(true),
    source: z.string().trim().max(120).default("website"),
    submittedAt: z.string().datetime(),
    website: z.string().max(0),
  })
  .superRefine((value, context) => {
    const service = findBaliService(value.packageId);
    const isServiceEnquiry = Boolean(service);
    if (value.packageId.startsWith("service-") && !service) {
      context.addIssue({ code: "custom", message: "Unknown Bali service", path: ["packageId"] });
    }
    if (!isServiceEnquiry && !value.date) {
      context.addIssue({ code: "custom", message: "Date is required for journeys", path: ["date"] });
    }
    if (!isServiceEnquiry && !value.guests) {
      context.addIssue({ code: "custom", message: "Guest count is required for journeys", path: ["guests"] });
    }
    if (value.preferredChannel === "Email" && !value.email) {
      context.addIssue({
        code: "custom",
        message: "Email is required when it is the preferred channel",
        path: ["email"],
      });
    }
  });

export type EnquiryPayload = z.infer<typeof enquirySchema>;
