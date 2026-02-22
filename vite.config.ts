import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@walletconnect/ethereum-provider", "@web3modal/wagmi"],
  },
  resolve: {
    dedupe: ["wagmi", "viem", "@tanstack/react-query"],
  },
});
