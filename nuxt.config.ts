import { defineNuxtConfig } from "@nuxt/bridge";
import ohmyfetch from "ohmyfetch";

const apiBaseURL = (process.env.API_BASE_URL != null) || "https://localhost:8000";

export default defineNuxtConfig({
  devtools: { enabled: true },
  buildModules: ["@nuxt/typescript-build"],
  modules: [
    "@pinia/nuxt",
    "nuxt-icon",
    "@nuxtjs/tailwindcss",
    "@nuxt/image-edge",
  ],
  runtimeConfig: {
    apiBaseURL,
  },
  fetch: {
    // @ts-expect-error typescript
    client: ohmyfetch, // Use ohmyfetch as the fetch client
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
});
