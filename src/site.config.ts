export interface NavItem {
  title: string;
  url: string;
}

export interface SocialItem {
  title: string;
  url: string;
  icon?: string;
}

export interface SiteConfig {
  url: string;
  title: string;
  description: string;
  author: string;
  logo?: string;       // path to logo image in public/ e.g. '/logo.svg'
  social: SocialItem[];
  navigation: NavItem[];
  recentPosts: number;
  relatedPosts: number;
  postsPerPage: number;
  pageWidth: string;
  contentWidth: string;
}

export const siteConfig: SiteConfig = {
  url: "https://amitkul.in",
  title: "Amit K",
  description: "Building systems by day, exploring streets around the world whenever possible.Sharing tech articles, travel guides, and photo galleries.",
  author: "Amit K",
  logo: '/logo.svg',  // uncomment and set path when you have a logo
  social: [
    {
      title: "GitHub",
      url: "https://github.com/ak0r/astro-base",
      icon: "github",
    },
  ],
  navigation: [
    { title: "Travel",       url: "/travels" },
    { title: "Tech",         url: "/tech" },
    { title: "Destinations", url: "/destinations" },
    { title: "About",        url: "/about" },
    { title: "Search",       url: "/search" },
  ],
  recentPosts: 8,
  relatedPosts: 4,
  postsPerPage: 20,
  pageWidth: "lg",
  contentWidth: "md"
};