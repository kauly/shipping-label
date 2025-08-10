import z from "zod";

import { ModeEnum } from "./api";

export const AddressSchema = z.object({
  id: z.string(),
  object: z.literal("Address"),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
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
  carrier_facility: z.string().nullable(),
  residential: z.boolean().nullable(),
  federal_tax_id: z.string().nullable(),
  state_tax_id: z.string().nullable(),
  mode: ModeEnum.default("test"),
});

export type Address = z.infer<typeof AddressSchema>;
