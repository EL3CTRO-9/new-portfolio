import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.enum(["Security", "Research", "Finance", "Writing", "Notes"]),
    date: z.date(),
    tileKey: z.enum([
      "victorian_plum",
      "red_oxide",
      "indigo_cross",
      "royal_blue",
      "emerald",
      "plum_vine",
      "burgundy",
      "ochre",
    ]),
    excerpt: z.string(),
    ogImage: z.string().optional(),
    endDog: z.string().optional(),
    dogCaption: z.string().optional(),
  }),
});

export const collections = { posts };
