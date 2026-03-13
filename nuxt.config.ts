// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui", "dayjs-nuxt", "@vueuse/nuxt"],
  css: ["~/assets/css/main.css"],
  dayjs: {
    defaultLocale: "ko",
    plugins: [
      "localizedFormat",
      "isBetween",
      "isSameOrBefore",
      "isSameOrAfter",
      "isToday",
    ],
  },
  imports: {
    presets: [
      { from: "zod/v4", imports: ["z"] },
      { from: "ofetch", imports: ["FetchError"], type: true },
      { from: "defu", imports: ["defu"] },
    ],
  },
  nitro: {
    imports: {
      presets: [
        { from: "zod/v4", imports: ["z"] },
        { from: "defu", imports: ["defu"] },
      ],
    },
  },

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
