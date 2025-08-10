import z from "zod";

import { ModeEnum } from "./api";

export const ParcelSchema = z.object({
  id: z.string(),
  object: z.literal("Parcel"),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
  length: z.number(),
  width: z.number(),
  height: z.number(),
  predefined_package: z.string().nullable(),
  weight: z.number(),
  mode: ModeEnum.default("test"),
});

export type Parcel = z.infer<typeof ParcelSchema>;
