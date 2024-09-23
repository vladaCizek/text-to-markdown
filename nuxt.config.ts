// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    openAiApiKey: process.env.OPENAI_API_KEY,
    openAiApiOrganizationId: process.env.OPENAI_API_ORGANIZATION_ID,
    openAiApiProjectId: process.env.OPENAI_API_PROJECT_ID,
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-snackbar"],
  snackbar: {
    bottom: true,
    right: true,
    duration: 5000,
  },
});
