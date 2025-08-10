import { z } from "zod";

import { ParcelSchema } from "./parcel";
import { AddressSchema } from "./address";

export const TabsEnum = z.enum(["To", "From", "Parcel"]);

export const AddressInputSchema = AddressSchema.pick({
  name: true,
  company: true,
  street1: true,
  street2: true,
  city: true,
  state: true,
  zip: true,
  phone: true,
  email: true,
  country: true,
  mode: true,
});

export const ParcelInputSchema = ParcelSchema.pick({
  length: true,
  width: true,
  height: true,
  weight: true,
}).extend({
  length: z.coerce.number<string>(),
  width: z.coerce.number<string>(),
  height: z.coerce.number<string>(),
  weight: z.coerce.number<string>(),
});

export type AddressInput = z.infer<typeof AddressInputSchema>;

export type ParcelInput = z.infer<typeof ParcelInputSchema>;
export type ParcelOutput = z.output<typeof ParcelInputSchema>;

export type GenerateState = {
  to_address?: AddressInput;
  from_address?: AddressInput;
};
export type TabsValueType = z.infer<typeof TabsEnum>;
