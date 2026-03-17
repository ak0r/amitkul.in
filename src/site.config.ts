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
  social: SocialItem[];
  navigation: NavItem[];
  recentPosts: number;
  relatedPosts: number;
  postsPerPage: number;
  pageWidth: string;
  contentWidth: string;
}

export const siteConfig: SiteConfig = {
  url: "https://base.amitkul.in",
  title: "Astro Base",
  description: "A foundational personal blog",
  author: "Amit K",
  social: [
    {
      title: "GitHub",
      url: "https://github.com/ak0r/astro-base",
      icon: "github",
    },
  ],
  navigation: [
    { title: "Articles", url: "/posts" },
    { title: "Tags", url: "/tags" },
    { title: "About", url: "/about" },
    { title: "Search", url: "/search" },
  ],
  recentPosts: 8,
  relatedPosts: 4,
  postsPerPage: 20,
  pageWidth: "lg",
  contentWidth: "md"
};