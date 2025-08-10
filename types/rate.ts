import { z } from "zod";

export const RateSchema = z.object({
  id: z.string(),
  object: z.literal("Rate"),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
  mode: z.enum(["test", "production"]),
  service: z.string(),
  carrier: z.string(),
  rate: z.string(),
  currency: z.string(),
  retail_rate: z.string().nullable(),
  retail_currency: z.string().nullable(),
  list_rate: z.string().nullable(),
  list_currency: z.string().nullable(),
  billing_type: z.string(),
  delivery_days: z.number().nullable(),
  delivery_date: z.string().nullable(),
  delivery_date_guaranteed: z.boolean(),
  est_delivery_days: z.number().nullable(),
  shipment_id: z.string(),
  carrier_account_id: z.string(),
});

export type Rate = z.infer<typeof RateSchema>;
