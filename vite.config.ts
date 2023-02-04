import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import ffmpegPlugin from "./plugins/vite-plugin-ffmpeg";
export default defineConfig({
  plugins: [solidPlugin(), ffmpegPlugin()],
  server: {
    port: 3000,
  },

  build: {
    target: "esnext",
  },
});
