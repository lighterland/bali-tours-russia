export const STANDARD_VEHICLE_CAPACITY = 4;
export const CRAFT_TRANSFER_USD_PER_CAR = 10;

export const vehicleCountForGuests = (guests: number, capacity = STANDARD_VEHICLE_CAPACITY) =>
  Math.max(1, Math.ceil(Math.max(1, Math.floor(guests)) / capacity));

export const craftTransferUsdFor = (guests: number, isFree: boolean) =>
  isFree ? 0 : vehicleCountForGuests(guests) * CRAFT_TRANSFER_USD_PER_CAR;

export const capacityUnitBreakdown = (unitUsd: number, capacity: number, guests: number) => {
  const units = vehicleCountForGuests(guests, capacity);
  return { unitUsd, capacity, units, totalUsd: unitUsd * units };
};

export const privateGroupBreakdown = (
  baseUsd: number,
  includedGuests: number,
  extraGuestUsd: number,
  guests: number,
) => {
  const extraGuests = Math.max(0, Math.floor(guests) - includedGuests);
  return {
    includedGuests,
    extraGuests,
    extraGuestUsd,
    baseUsd,
    totalUsd: baseUsd + extraGuests * extraGuestUsd,
  };
};
