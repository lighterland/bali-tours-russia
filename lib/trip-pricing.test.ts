import assert from "node:assert/strict";
import test from "node:test";

import { calculateTripEstimate } from "./trip-pricing.ts";
import type { TourPackage } from "./catalogue.ts";

const pricedTour = (id: string, pricing: TourPackage["pricing"]) => ({
  id,
  pricing,
  price: { status: "fixed", currencies: ["USD"], label: { ru: "", en: "" } },
} as unknown as TourPackage);

test("Private Sea Fishing adds another four-guest boat when capacity is exceeded", () => {
  const fishing = pricedTour("fishing", {
    model: "per_group",
    amountUsd: 390,
    includedGuests: 4,
    unitCapacity: 4,
  });
  assert.equal(calculateTripEstimate([fishing], 4, 1).subtotalUsd, 390);
  assert.equal(calculateTripEstimate([fishing], 5, 1).subtotalUsd, 780);
  assert.equal(calculateTripEstimate([fishing], 8, 1).subtotalUsd, 780);
  assert.equal(calculateTripEstimate([fishing], 9, 1).subtotalUsd, 1170);
});

test("Bali Water Sports exposes a per-guest minimum estimate", () => {
  const waterSports = pricedTour("water-sports", {
    model: "per_guest",
    amountUsd: 30,
    estimateOnly: true,
  });
  assert.equal(waterSports.pricing.model, "per_guest");
  assert.equal(waterSports.pricing.amountUsd, 30);
  assert.equal(calculateTripEstimate([waterSports], 3, 1).subtotalUsd, 90);
});
