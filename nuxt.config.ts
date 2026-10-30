export default defineNuxtConfig({
  extends: ['docus'],

  modules: ['nuxt-studio'],

  // Port 3000 is taken by other local Nuxt apps.
  devServer: {
    port: 4170,
  },

  site: {
    name: 'Guide IA agentique',
  },

  studio: {
    // Required only for publishing from production. The GitHub repository
    // does not exist yet: update owner/repo once it is created.
    repository: {
      provider: 'github',
      owner: 'BDeMot',
      repo: 'guide-ia',
      branch: 'main',
    },
  },
})
