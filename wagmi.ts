import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { mainnet, sepolia, polygon, bsc, arbitrum, optimism } from "wagmi/chains";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

const metadata = {
  name: "Wallet Scanning",
  description: "Decentralized Wallet Protection",
  url: window.location.origin,
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const chains = [mainnet, sepolia, polygon, bsc, arbitrum, optimism] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});
