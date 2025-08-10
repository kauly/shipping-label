import { z } from "zod";

import { AddressSchema } from "./address";
import { ParcelSchema } from "./parcel";
import { RateSchema } from "./rate";
import { PostageLabelSchema } from "./postage-label";
import { AddressInputSchema, ParcelInputSchema } from "./generate";
import { ModeEnum } from "./api";

const PaymentSchema = z.object({
  type: z.string(),
});

const OptionsSchema = z.object({
  currency: z.string(),
  payment: PaymentSchema,
  date_advance: z.number(),
});

const CustomsInfoSchema = z.object({}).loose();

const VerificationsSchema = z.object({}).loose();

const AddressWithVerificationsSchema = AddressSchema.extend({
  mode: z.string(),
  verifications: VerificationsSchema,
});

export const ShippingSchema = z.object({
  id: z.string(),
  object: z.literal("Shipment"),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
  is_return: z.boolean(),
  messages: z.array(z.record(z.string(), z.string().or(z.number()))),
  mode: ModeEnum,
  options: OptionsSchema,
  reference: z.string().nullable(),
  status: z.string(),
  tracking_code: z.string().nullable(),
  batch_id: z.string().nullable(),
  batch_status: z.string().nullable(),
  batch_message: z.string().nullable(),
  customs_info: CustomsInfoSchema.nullable(),
  from_address: AddressWithVerificationsSchema,
  to_address: AddressWithVerificationsSchema,
  return_address: AddressWithVerificationsSchema,
  buyer_address: AddressWithVerificationsSchema,
  parcel: ParcelSchema.extend({
    mode: z.string(),
  }),
  postage_label: PostageLabelSchema.nullable(),
  rates: z.array(RateSchema),
  insurance: z.string().nullable(),
  order_id: z.string().nullable(),
  refund_status: z.string().nullable(),
  scan_form: z.string().nullable(),
  selected_rate: RateSchema.nullable(),
  tracker: z.string().nullable(),
  usps_zone: z.number().nullable(),
  forms: z.array(z.unknown()),
  fees: z.array(z.unknown()),
});

export const GenerateShippingPropsSchema = z.object({
  shipment: z.object({
    to_address: AddressInputSchema,
    from_address: AddressInputSchema,
    parcel: ParcelInputSchema,
    mode: ModeEnum,
  }),
});

export const BuyShippingPropsSchema = z.object({
  rateId: z.string(),
  shipmentId: z.string(),
  insurance: z.string().nullish(),
});

export type GenerateShippingProps = z.infer<typeof GenerateShippingPropsSchema>;

export type BuyShippingProps = z.infer<typeof BuyShippingPropsSchema>;

export type Shipping = z.infer<typeof ShippingSchema>;
