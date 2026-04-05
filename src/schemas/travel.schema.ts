import { z } from 'astro/zod';
import { baseSchema } from './base.schema';

/**
 * Travel post schema.
 * Location fields (countries, region, places, type) are travel-specific.
 */
export const travelSchema = baseSchema.extend({
  cover:  z.string().optional(),
  tags:   z.array(z.string()).optional(),

  // ── Location ─────────────────────────────────────────────────────────────
  countries: z.array(z.string()).optional(), // e.g. ["India", "Sri Lanka"]
  places:    z.array(z.string()).optional(), // e.g. ["Rajgad", "Pune"]
  region:    z.string().optional(),          // e.g. "Sahyadri"
  type:      z.enum(['journey', 'experience', 'guide', 'gallery', 'notes', 'hiking']).optional(),

  // ── Series ───────────────────────────────────────────────────────────────
  series: z.string().optional(),
  order:  z.number().optional(),

  // ── Misc ─────────────────────────────────────────────────────────────────
  lang:    z.string().optional(),
  updated: z.coerce.date().optional(),

  /** @deprecated Use countries + places */
  location: z.string().optional(),
});

export type Travel = z.infer<typeof travelSchema>;