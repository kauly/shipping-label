import { z } from "zod";

export const TabsEnum = z.enum(["To", "From", "Parcel", "Result"]);
export type TabsValueType = z.infer<typeof TabsEnum>;
export const ModeEnum = z.enum(["test", "production"]);

export const AddressSchema = z.object({
  id: z.string(),
  object: z.literal("Address"),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  name: z.string().nullable(),
  company: z.string().nullable(),
  street1: z.string(),
  street2: z.string().nullable(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
  phone: z.string().nullable(),
  email: z.union([z.literal(""), z.email()]),
  mode: ModeEnum,
  carrier_facility: z.string().nullable(),
  residential: z.boolean().nullable(),
  federal_tax_id: z.string().nullable(),
  state_tax_id: z.string().nullable(),
});

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
});

export const ParcelSchema = z.object({
  id: z.string(),
  object: z.literal("Parcel"),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
  length: z.number(),
  width: z.number(),
  height: z.number(),
  predefined_package: z.string().nullable(),
  weight: z.number(),
  mode: ModeEnum,
});

export const ParcelInputSchema = ParcelSchema.pick({
  length: true,
  width: true,
  height: true,
  predefined_package: true,
  weight: true,
});

export const ShippingSchema = z.object({
  to_form: AddressInputSchema,
  from_form: AddressInputSchema,
  parcel: ParcelInputSchema,
});

export type Shipping = z.infer<typeof ShippingSchema>;

export type Parcel = z.infer<typeof ParcelSchema>;

export type Address = z.infer<typeof AddressSchema>;

export type AddressInput = z.infer<typeof AddressInputSchema>;

export type ParcelInput = z.infer<typeof ParcelInputSchema>;
