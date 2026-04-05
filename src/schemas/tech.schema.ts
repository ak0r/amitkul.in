import { z } from 'astro/zod';
import { baseSchema } from './base.schema';

/**
 * Tech post schema.
 * No location fields — those are travel-specific.
 */
export const techSchema = baseSchema.extend({
  cover:  z.string().optional(),
  tags:   z.array(z.string()).optional(),

  // ── Series ───────────────────────────────────────────────────────────────
  series: z.string().optional(),
  order:  z.number().optional(),

  // ── Misc ─────────────────────────────────────────────────────────────────
  lang:    z.string().optional(),
  updated: z.coerce.date().optional(),
});

export type Tech = z.infer<typeof techSchema>;