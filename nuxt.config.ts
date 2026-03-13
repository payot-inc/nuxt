// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["github:payot-inc/nuxt#ui"],
  modules: [],
  css: ["~/assets/css/main.css"],
  ssr: false,
  compatibilityDate: "2025-01-15",
  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});
