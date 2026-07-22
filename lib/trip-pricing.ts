import type { TourPackage } from "@/lib/catalogue";

export const TRAVEL_SERVICE_VAT_RATE = 0.011;
export function conditionalTransferUsdFor(tour: TourPackage, packageIds: readonly string[]) {
  if (tour.pricing.model !== "conditional_transfer") return tour.pricing.amountUsd;
  return packageIds.some((id) => tour.pricing.freeWhenPackageIds?.includes(id)) ? 0 : tour.pricing.amountUsd;
}

export type TripEstimate = {
  lines: Array<{ id: string; totalUsd: number; guestSavingUsd: number }>;
  subtotalUsd: number;
  guestSavingUsd: number;
  bundleRate: number;
  bundleSavingUsd: number;
  totalUsd: number;
  taxIncludedUsd: number;
  bookingFeeUsd: number;
  balanceUsd: number;
};

const guestUnitSaving = (guests: number) => {
  if (guests >= 21) return 3;
  if (guests >= 11) return 2;
  if (guests >= 6) return 1;
  return 0;
};

export const bundleRateFor = (eligibleCount: number) => {
  if (eligibleCount >= 6) return 0.08;
  if (eligibleCount >= 5) return 0.05;
  if (eligibleCount >= 3) return 0.03;
  return 0;
};

export function nextBundleTarget(eligibleCount: number) {
  if (eligibleCount < 3) return { remaining: 3 - eligibleCount, rate: 0.03 };
  if (eligibleCount < 5) return { remaining: 5 - eligibleCount, rate: 0.05 };
  if (eligibleCount < 6) return { remaining: 6 - eligibleCount, rate: 0.08 };
  return null;
}

export function calculateTripEstimate(
  selectedPackages: TourPackage[],
  guests: number,
  rentalDays: number,
  vehicleAmountUsd?: number,
): TripEstimate {
  const safeGuests = Math.max(1, Math.floor(guests));
  const lines = selectedPackages.map((tour) => {
    if (tour.pricing.model === "conditional_transfer") return { id: tour.id, totalUsd: conditionalTransferUsdFor(tour, selectedPackages.map((item) => item.id)), guestSavingUsd: 0 };
    if (tour.pricing.model === "free") return { id: tour.id, totalUsd: 0, guestSavingUsd: 0 };
    if (tour.id === "vehicle-rental" && vehicleAmountUsd !== undefined) {
      return { id: tour.id, totalUsd: vehicleAmountUsd * Math.max(1, rentalDays), guestSavingUsd: 0 };
    }
    if (tour.pricing.model === "per_guest") {
      const savingPerGuest = Math.min(guestUnitSaving(safeGuests), Math.max(0, tour.pricing.amountUsd - 1));
      return {
        id: tour.id,
        totalUsd: (tour.pricing.amountUsd - savingPerGuest) * safeGuests,
        guestSavingUsd: savingPerGuest * safeGuests,
      };
    }
    if (tour.pricing.model === "per_group") {
      const extraGuests = Math.max(0, safeGuests - (tour.pricing.includedGuests || safeGuests));
      return {
        id: tour.id,
        totalUsd: tour.pricing.amountUsd + extraGuests * (tour.pricing.extraGuestUsd || 0),
        guestSavingUsd: 0,
      };
    }
    return { id: tour.id, totalUsd: tour.pricing.amountUsd, guestSavingUsd: 0 };
  });

  const subtotalUsd = lines.reduce((sum, line) => sum + line.totalUsd, 0);
  const guestSavingUsd = lines.reduce((sum, line) => sum + line.guestSavingUsd, 0);
  const eligibleIds = new Set(selectedPackages.filter((tour) => tour.pricing.discountEligible).map((tour) => tour.id));
  const eligibleSubtotal = lines.filter((line) => eligibleIds.has(line.id)).reduce((sum, line) => sum + line.totalUsd, 0);
  const bundleRate = bundleRateFor(eligibleIds.size);
  const bundleSavingUsd = Math.round(eligibleSubtotal * bundleRate);
  const totalUsd = Math.max(0, Math.round(subtotalUsd - bundleSavingUsd));
  const taxIncludedUsd = Number((totalUsd * TRAVEL_SERVICE_VAT_RATE / (1 + TRAVEL_SERVICE_VAT_RATE)).toFixed(2));

  return {
    lines,
    subtotalUsd,
    guestSavingUsd,
    bundleRate,
    bundleSavingUsd,
    totalUsd,
    taxIncludedUsd,
    bookingFeeUsd: Math.round(totalUsd * 0.2),
    balanceUsd: totalUsd - Math.round(totalUsd * 0.2),
  };
}
