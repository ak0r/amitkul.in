/**
 * Image Utilities
 *
 * Gallery image resolution for folder-based post structure.
 * Reads from src/content/posts/{postDir}/gallery/
 */

import type { ImageMetadata } from 'astro';

// ============================================================================
// TYPES
// ============================================================================

export interface GalleryImage {
  src: ImageMetadata;
  alt: string;
  filename: string;
}

// ============================================================================
// GLOB — static, module-level, Vite requires a static pattern
// ============================================================================

const allGalleryImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/posts/**/gallery/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP}',
  { eager: true }
);

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Derive post directory name from entry.filePath
 * e.g. src/content/posts/2026-03-rajgad/index.md → 2026-03-rajgad
 */
export function extractPostDir(filePath: string): string {
  const parts = filePath.split('/');
  return parts[parts.length - 2] || '';
}

/**
 * Derive alt text from image filename
 * e.g. 01-rajgad-summit-view.jpg → Rajgad Summit View
 */
export function filenameToAlt(filename: string): string {
  return (
    filename
      .replace(/\.[^.]+$/, '')                  // remove extension
      .replace(/^\d+[-_]?/, '')                 // remove leading number
      .replace(/[-_]/g, ' ')                    // separators → spaces
      .replace(/\b\w/g, (c) => c.toUpperCase()) // capitalise words
      .trim()
  );
}

/**
 * Shuffle array — Fisher-Yates
 * Use when display order should be randomised
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ============================================================================
// GALLERY
// ============================================================================

/**
 * Get gallery images for a post, sorted by filename
 * Reads from src/content/posts/{postDir}/gallery/
 * Returns empty array if directory does not exist or has no images
 *
 * @param filePath - entry.filePath from Astro content collection entry
 */
export function getGalleryImages(filePath: string): GalleryImage[] {
  const postDir = extractPostDir(filePath);
  if (!postDir) return [];

  return Object.entries(allGalleryImages)
    .filter(([path]) => path.includes(`/posts/${postDir}/gallery/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, mod]) => {
      const filename = path.split('/').pop() ?? '';
      return {
        src: mod.default,
        alt: filenameToAlt(filename),
        filename,
      };
    });
}

/**
 * Check if a post has a gallery — use for conditional rendering decisions
 *
 * @param filePath - entry.filePath from Astro content collection entry
 */
export function hasGallery(filePath: string): boolean {
  return getGalleryImages(filePath).length > 0;
}