export default defineNuxtConfig({
  extends: ['docus'],

  modules: ['nuxt-studio'],

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
