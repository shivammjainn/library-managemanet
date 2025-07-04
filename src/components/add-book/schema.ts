import { z } from "zod";

export const bookSchema = z.object({
  name: z
    .string()
    .min(1, "Book name is required")
    .refine((val) => /^[A-Za-z]/.test(val), {
      message: "Book name must start with a letter",
    }),

  description: z
    .string()
    .min(1, "Description is required")
    .refine((val) => /^[A-Za-z]/.test(val), {
      message: "Description must start with a letter",
    }),

  author: z
    .string()
    .min(1, "Author name is required")
    .refine((val) => /^[A-Za-z]/.test(val), {
      message: "Author name must start with a letter",
    }),

  detail: z
    .string()
    .min(1, "Detail is required")
    .refine((val) => /^[A-Za-z]/.test(val), {
      message: "Detail must start with a letter",
    }),

  available: z.boolean(),
});
