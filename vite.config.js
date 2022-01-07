import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // svelte({
    //   include: ["./src/lib/TrackingInput.svelte"],
    //   compilerOptions: {
    //     customElement: true,
    //   },
    // }),
    // svelte({
    //   exclude: ["./src/lib/TrackingInput.svelte"],
    //   compilerOptions: {
    //     customElement: false,
    //   },
    // }),
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
});
