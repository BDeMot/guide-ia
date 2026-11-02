export default defineNuxtConfig({
  extends: ['docus'],

  modules: ['nuxt-studio'],

  // Port 3000 is taken by other local Nuxt apps.
  devServer: {
    port: 4170,
  },

  site: {
    name: 'Guide IA agentique',
    // Required by the sitemap when the site is generated.
    url: 'https://guide-ia.onrender.com',
  },

  nitro: {
    prerender: {
      // Render does not map /page to page.html: write page/index.html instead.
      autoSubfolderIndex: true,
    },
  },

  studio: {
    // The site is deployed as static files on Render, so Studio only runs
    // locally (npm run dev). This repository is used if Studio is ever
    // enabled in production.
    repository: {
      provider: 'github',
      owner: 'BDeMot',
      repo: 'guide-ia',
      branch: 'main',
    },
  },
})
