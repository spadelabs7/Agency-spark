import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import netlify from "@netlify/vite-plugin-tanstack-start"; // <-- Added this

export default defineConfig({
  plugins: [
    tanstackStart(),
    netlify(), // <-- Added this
    viteReact(),
    tailwindcss(),
    tsConfigPaths(),
  ],
});