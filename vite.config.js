import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Web Component App wrapper
    svelte({
      include: ["./src/lib/TrackingInput.svelte"],
      compilerOptions: {
        customElement: true,
      },
    }),
    // Svelte Components nested imported by Web Component wrapper
    svelte({
      exclude: ["./src/lib/TrackingInput.svelte"],
      compilerOptions: {
        customElement: false,
      },
      // Emit all Svelte component styles as <style> within Web Component wrapper's
      // shadow DOM, so the styles are encapsulated automatically.
      emitCss: false,
    }),
  ],
});
