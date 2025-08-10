import { z } from "zod";

export const PostageLabelSchema = z.object({
  object: z.literal("PostageLabel"),
  id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  date_advance: z.number(),
  integrated_form: z.string(),
  label_date: z.string(),
  label_resolution: z.number(),
  label_size: z.string(),
  label_type: z.string(),
  label_file_type: z.string(),
  label_url: z.url(),
  label_pdf_url: z.url().nullable(),
  label_zpl_url: z.url().nullable(),
  label_epl2_url: z.url().nullable(),
  label_file: z.string().nullable(),
});

export type PostageLabel = z.infer<typeof PostageLabelSchema>;
