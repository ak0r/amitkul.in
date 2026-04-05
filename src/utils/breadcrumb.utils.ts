/**
 * Breadcrumb Utilities
 *
 * Route map (0.7.0):
 *   /travel/              Travel
 *   /travel/[slug]        Travel → Post title
 *   /tech/                Tech
 *   /tech/[slug]          Tech → Post title
 *   /destinations/        Destinations
 *   /destinations/[id]/   Destinations → Country name
 *   /[page]               Page title
 */

export interface Crumb {
  title: string;
  href:  string;
}

const SEGMENT_LABELS: Record<string, string> = {
  travel:       'Travel',
  tech:         'Tech',
  destinations: 'Destinations',
  search:       'Search',
  about:        'About',
};

export function buildCrumbs(pathname: string, label?: string): Crumb[] {
  const crumbs: Crumb[] = [{ title: 'Home', href: '/' }];

  if (pathname === '/') return crumbs;

  // Strip trailing slash and pagination segments
  const cleanPath = pathname
    .replace(/\/$/, '')
    .replace(/\/\d+$/, '');

  const segments = cleanPath.split('/').filter(Boolean);

  if (segments.length === 0) return crumbs;

  const [first, second] = segments;

  // ── /travel/* ──────────────────────────────────────────────────────────────

  if (first === 'travels') {
    crumbs.push({ title: 'Travels', href: '/travels' });

    if (second) {
      // Individual post — label passed from BlogLayout
      crumbs.push({
        title: label || slugToLabel(second),
        href:  pathname,
      });
    }

    return crumbs;
  }

  // ── /tech/* ────────────────────────────────────────────────────────────────

  if (first === 'tech') {
    crumbs.push({ title: 'Tech', href: '/tech' });

    if (second) {
      crumbs.push({
        title: label || slugToLabel(second),
        href:  pathname,
      });
    }

    return crumbs;
  }

  // ── /destinations/* ────────────────────────────────────────────────────────

  if (first === 'destinations') {
    crumbs.push({ title: 'Destinations', href: '/destinations' });

    if (second) {
      // Country page — label is the country name passed from the page
      crumbs.push({
        title: label || slugToLabel(second),
        href:  pathname,
      });
    }

    return crumbs;
  }

  // ── Static pages e.g. /about, /search ──────────────────────────────────────

  crumbs.push({
    title: label || SEGMENT_LABELS[first] || slugToLabel(first),
    href:  pathname,
  });

  return crumbs;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}