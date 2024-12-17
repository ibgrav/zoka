/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  plugins: [],
  test: {
    // browser: {
    //   enabled: true,
    //   name: "chromium",
    //   provider: "playwright",
    //   // https://playwright.dev
    //   providerOptions: {
    //     launch: {
    //       devtools: true,
    //     },
    //   },
    // },
  },
});
