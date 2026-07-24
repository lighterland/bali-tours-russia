import { z } from "zod";
import { supportedLanguages } from "@/lib/i18n";
import { findBaliService } from "@/lib/bali-services";

export const contactChannels = ["WhatsApp", "Telegram", "VK", "Email"] as const;

export const enquirySchema = z
  .object({
    enquiryId: z.string().uuid(),
    name: z.string().trim().min(2).max(100),
    whatsapp: z.union([
      z.string().trim().regex(/^\+?[1-9]\d{7,14}$/, "Use an international WhatsApp number"),
      z.literal(""),
    ]),
    email: z.union([z.string().trim().email(), z.literal("")]),
    contactHandle: z.string().trim().max(200).default(""),
    preferredChannel: z.enum(contactChannels),
    requestType: z.enum(["planned", "open"]).default("planned"),
    date: z.string().trim().max(100),
    guests: z.string().trim().regex(/^[1-9]\d{0,2}$/, "Guest count is required"),
    packageSelections: z.array(z.object({ packageId: z.string().trim().min(1).max(100), optionId: z.string().trim().max(100).optional(), quantity: z.number().int().min(1).max(365).optional() })).max(20).default([]),
    serviceSelections: z.array(z.object({ serviceId: z.string().trim().min(1).max(100), optionIds: z.array(z.string().trim().min(1).max(100)).min(1).max(10) })).max(20).default([]),
    pickup: z.string().trim().max(200),
    notes: z.string().trim().max(1500),
    language: z.enum(supportedLanguages).default("ru"),
    consent: z.literal(true),
    source: z.string().trim().max(120).default("website"),
    submittedAt: z.string().datetime(),
    website: z.string().max(0),
  })
  .superRefine((value, context) => {
    const services = value.serviceSelections.map((selection) => findBaliService(selection.serviceId)).filter(Boolean);
    const isServiceEnquiry = services.length > 0 && value.packageSelections.length === 0;
    const isOpenRequest = value.requestType === "open";
    if (isOpenRequest && (value.packageSelections.length > 0 || value.serviceSelections.length > 0)) {
      context.addIssue({ code: "custom", message: "Open requests cannot include selected items", path: ["requestType"] });
    }
    if (services.length !== value.serviceSelections.length) {
      context.addIssue({ code: "custom", message: "Unknown Bali service", path: ["serviceSelections"] });
    }
    value.serviceSelections.forEach((selection, index) => {
      const service = findBaliService(selection.serviceId);
      if (service && selection.optionIds.some((optionId) => !service.options.some((option) => option.id === optionId))) {
        context.addIssue({ code: "custom", message: "Unknown Bali service option", path: ["serviceSelections", index, "optionIds"] });
      }
      if (new Set(selection.optionIds).size !== selection.optionIds.length) context.addIssue({ code: "custom", message: "Duplicate Bali service option", path: ["serviceSelections", index, "optionIds"] });
    });
    const serviceIds = value.serviceSelections.map((selection) => selection.serviceId);
    if (new Set(serviceIds).size !== serviceIds.length) {
      context.addIssue({ code: "custom", message: "Duplicate Bali service", path: ["serviceSelections"] });
    }
    if (!isServiceEnquiry && !isOpenRequest && !value.date) {
      context.addIssue({ code: "custom", message: "Date is required for journeys", path: ["date"] });
    }
    if (value.preferredChannel === "Email" && !value.email) {
      context.addIssue({
        code: "custom",
        message: "Email is required when it is the preferred channel",
        path: ["email"],
      });
    }
    if (value.preferredChannel === "WhatsApp" && !value.whatsapp) {
      context.addIssue({ code: "custom", message: "WhatsApp is required when it is the preferred channel", path: ["whatsapp"] });
    }
    if ((value.preferredChannel === "Telegram" || value.preferredChannel === "VK") && !value.contactHandle) {
      context.addIssue({ code: "custom", message: "A username or profile link is required for this channel", path: ["contactHandle"] });
    }
  });

export type EnquiryPayload = z.infer<typeof enquirySchema>;
