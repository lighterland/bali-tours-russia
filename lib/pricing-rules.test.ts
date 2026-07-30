import assert from "node:assert/strict";
import test from "node:test";

import {
  craftTransferUsdFor,
  privateGroupBreakdown,
  vehicleCountForGuests,
} from "./pricing-rules.ts";

test("vehicle transfers allocate one car for every four guests", () => {
  assert.equal(vehicleCountForGuests(1), 1);
  assert.equal(vehicleCountForGuests(4), 1);
  assert.equal(vehicleCountForGuests(5), 2);
  assert.equal(vehicleCountForGuests(10), 3);
});

test("Craft & Jewellery charges ten dollars for each required car", () => {
  assert.equal(craftTransferUsdFor(1, false), 10);
  assert.equal(craftTransferUsdFor(4, false), 10);
  assert.equal(craftTransferUsdFor(5, false), 20);
  assert.equal(craftTransferUsdFor(10, false), 30);
  for (const guests of [1, 4, 5, 10]) assert.equal(craftTransferUsdFor(guests, true), 0);
});

test("private-group breakdown preserves the existing extra-guest pricing", () => {
  assert.equal(privateGroupBreakdown(66, 4, 10, 1).totalUsd, 66);
  assert.deepEqual(privateGroupBreakdown(66, 4, 10, 4), {
    includedGuests: 4,
    extraGuests: 0,
    extraGuestUsd: 10,
    baseUsd: 66,
    totalUsd: 66,
  });
  assert.deepEqual(privateGroupBreakdown(66, 4, 10, 5), {
    includedGuests: 4,
    extraGuests: 1,
    extraGuestUsd: 10,
    baseUsd: 66,
    totalUsd: 76,
  });
  assert.deepEqual(privateGroupBreakdown(66, 4, 10, 10), {
    includedGuests: 4,
    extraGuests: 6,
    extraGuestUsd: 10,
    baseUsd: 66,
    totalUsd: 126,
  });
  assert.equal(privateGroupBreakdown(60, 4, 6, 10).totalUsd, 96);
});
