import { z } from 'astro/zod';
import { baseSchema } from './base.schema';

/**
 * Post schema — extends base with content-specific fields.
 *
 * Destination system (0.7.0):
 *   countries    — reference to destinations collection (drives /destinations/[country]/)
 *   places       — specific places visited (display only, used in eyebrow + destinations page)
 *   region       — sub-country region e.g. Sahyadri, Konkan, Hokkaido (display only)
 *   type         — post type (display + filter on /travel/)
 *   location     — deprecated; use destination + places instead
 */
export const postSchema = baseSchema.extend({
  category: z.enum(['tech', 'travel']).optional(),
  cover:    z.string().optional(),
  tags:     z.array(z.string()).optional(),

  // ── Destination system ──────────────────────────────────────────────────
  countries:  z.array(z.string()).optional(),
  places:     z.array(z.string()).optional(),
  region:     z.string().optional(),

  // ── Post type ───────────────────────────────────────────────────────────
  type: z.enum(['journey', 'experience', 'guide', 'gallery', 'note']).optional(),

  // ── Series ──────────────────────────────────────────────────────────────
  series: z.string().optional(),
  order:  z.number().optional(),

  // ── Misc ────────────────────────────────────────────────────────────────
  lang:    z.string().optional(), // BCP 47 e.g. 'en', 'mr', 'hi'
  updated: z.coerce.date().optional(),

  /** @deprecated Use destination + places instead */
  location: z.string().optional(),
});

export type Post = z.infer<typeof postSchema>;