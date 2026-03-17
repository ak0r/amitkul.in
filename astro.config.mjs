// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: 'https://base.amitkul.in',

  image: {
    responsiveStyles: true,
    layout: "constrained"
  },

  security: {
    contentSecurityPolicy: {
      directives: {
        // 'self' covers same-origin scripts including /pagefind/pagefind-ui.js
        // Astro auto-nonces is:inline scripts when CSP is enabled
        "script-src": ["'self'"],
        // 'unsafe-inline' needed for Pagefind UI's dynamically injected result styles
        "style-src": ["'self'", "'unsafe-inline'"],
        // Pagefind fetches the search index via XHR
        "connect-src": ["'self'"],
        // Pagefind uses a Web Worker for indexing
        "worker-src": ["'self'", "blob:"],
      },
    },
  },

  fonts: [
    {
      name: "Rubik",
      cssVariable: "--font-headings",
      provider: fontProviders.fontsource(),
      weights: [400, 500, 600, 700],
      fallbacks: ["sans-serif"],
    },
    {
      name: "Poppins",
      cssVariable: "--font-primary",
      provider: fontProviders.fontsource(),
      weights: [400, 500, 600, 700],
      fallbacks: ["sans-serif"],
    },
    {
      name: "Newsreader",
      cssVariable: "--font-secondary",
      provider: fontProviders.fontsource(),
      weights: [400, 500, 600, 700],
      fallbacks: ["serif"],
    },
    {
      name: "Fira Code",
      cssVariable: "--font-code",
      provider: fontProviders.fontsource(),
      weights: [400, 500, 600, 700],
      fallbacks: ["monospace"],
    },
  ],

  experimental: {
    contentIntellisense: true,
    rustCompiler: true,
    queuedRendering: {
      enabled: true,
    },
  },

  integrations: [
    // Expressive Code must come before MDX
    expressiveCode({
      // Matches your data-theme attribute toggle
      themes: ['everforest-dark', 'everforest-light'],
      themeCssSelector: (theme) => 
        theme.name === 'everforest-dark' ? '[data-theme="dark"]' : '[data-theme="light"]',
    }),
    mdx(), 
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});