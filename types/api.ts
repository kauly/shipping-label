import { z } from "zod";

export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
};

export type ApiFieldError = {
  field: string;
  message: string;
  suggestion: string | null;
};

export type ApiError = {
  code: string;
  message: string;
  errors: ApiFieldError[];
};

export const ModeEnum = z.enum(["test", "production"]);
