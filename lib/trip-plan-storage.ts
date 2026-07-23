import { z } from "zod";

export const tripPlanStorageKey = "bali-closer-trip-plan-v1";

const storedTripPlanSchema = z.object({
  selectedPackageIds: z.array(z.string().trim().min(1).max(100)).max(20),
  serviceAdded: z.boolean(),
  selectedServiceOptionIds: z.array(z.string().trim().min(1).max(100)).max(10),
  vehicleVariantId: z.string().trim().max(100),
  rentalDays: z.number().int().min(1).max(365),
  guests: z.string().regex(/^\d{1,3}$/),
});

export type StoredTripPlan = z.infer<typeof storedTripPlanSchema>;

export function parseStoredTripPlan(value: string | null): StoredTripPlan | null {
  if (!value) return null;
  try {
    const result = storedTripPlanSchema.safeParse(JSON.parse(value));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function serializeTripPlan(plan: StoredTripPlan) {
  return JSON.stringify(plan);
}
