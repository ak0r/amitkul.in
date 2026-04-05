import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { travelSchema, techSchema, pageSchema } from '@/schemas';
import { destinationSchema } from '@/schemas/destination.schema';

const travel = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/travels' }),
  schema: travelSchema,
});

const tech = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: techSchema,
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: pageSchema,
});

const destinations = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/destinations' }),
  schema: ({ image }) => destinationSchema({ image }),
});

export const collections = { travel, tech, pages, destinations };