import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["**/*"],
      manifest: {
        name: "FeelTheWeather",
        short_name: "FeelTheWeather",
        description:
          "FeelTheWeather lets you explore real-time weather from any location with immersive visuals, interactive particles, and ambient sounds that match the conditions.",
        start_url: "/",
        display: "standalone",
        display_override: ["window-controls-overlay", "standalone"],
        background_color: "#f0f9ff",
        theme_color: "#f0f9ff",
        icons: [
          { src: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
          { src: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
          {
            src: "/icons/icon-192-maskable.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "/icons/icon-512-maskable.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/desktop_screenshot_1.png",
            sizes: "3840x2160",
            type: "image/png",
            form_factor: "wide",
            label: "Rio de Janeiro, Clear Sky Night, PT-BR, Desktop",
          },
          {
            src: "/screenshots/desktop_screenshot_2.png",
            sizes: "3840x2160",
            type: "image/png",
            form_factor: "wide",
            label: "Tokyo, Light Rain Day, JP, Desktop",
          },
          {
            src: "/screenshots/desktop_screenshot_3.png",
            sizes: "3840x2160",
            type: "image/png",
            form_factor: "wide",
            label: "Seoul, Overcast Clouds Day, KR, Desktop",
          },
          {
            src: "/screenshots/mobile_screenshot_1.png",
            sizes: "1170x2532",
            type: "image/png",
            form_factor: "narrow",
            label: "Rio de Janeiro, Clear Sky Night, PT-BR, Mobile",
          },
          {
            src: "/screenshots/mobile_screenshot_2.png",
            sizes: "1170x2532",
            type: "image/png",
            form_factor: "narrow",
            label: "Tokyo, Light Rain Day, JP, Mobile",
          },
          {
            src: "/screenshots/mobile_screenshot_3.png",
            sizes: "1170x2532",
            type: "image/png",
            form_factor: "narrow",
            label: "Seoul, Overcast Clouds Day, KR, Mobile",
          },
        ],
      },
    }),
  ],
});
