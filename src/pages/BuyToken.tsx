import { motion } from "framer-motion";
import { ArrowDown, Coins, DollarSign, RefreshCw, Wallet } from "lucide-react";
import { useState } from "react";
import { formatEther, parseEther } from "viem";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  TOKEN_ABI,
  TOKEN_ADDRESS,
  USDT_ABI,
  USDT_ADDRESS,
} from "../config/constants";

export function BuyToken() {
  const { address } = useAccount();
  const [ethAmount, setEthAmount] = useState("");
  // State buat milih token: 'IDRD' atau 'USDT'
  const [selectedToken, setSelectedToken] = useState<"IDRD" | "USDT">("IDRD");

  const { data: ethBalance } = useBalance({ address });

  // 1. Baca Saldo IDRD
  const { data: idrdBalance, refetch: refetchIdrd } = useReadContract({
    address: TOKEN_ADDRESS as `0x${string}`,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  // 2. Baca Saldo USDT
  const { data: usdtBalance, refetch: refetchUsdt } = useReadContract({
    address: USDT_ADDRESS as `0x${string}`,
    abi: USDT_ABI,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // RATE CONFIG
  const RATE_IDRD = 40000000; // 1 ETH = 40 Juta Rupiah
  const RATE_USDT = 2500; // 1 ETH = 2.500 Dollar

  const currentRate = selectedToken === "IDRD" ? RATE_IDRD : RATE_USDT;
  const estimatedOutput = ethAmount ? Number(ethAmount) * currentRate : 0;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  const handleBuy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ethAmount) return;

    // Logic Switch Address & ABI
    const targetAddress =
      selectedToken === "IDRD" ? TOKEN_ADDRESS : USDT_ADDRESS;
    const targetAbi = selectedToken === "IDRD" ? TOKEN_ABI : USDT_ABI;

    writeContract({
      address: targetAddress as `0x${string}`,
      abi: targetAbi,
      functionName: "buyTokens", // Pastikan nama function di SC USDT juga 'buyTokens'
      value: parseEther(ethAmount),
    });
  };

  if (isSuccess) {
    if (selectedToken === "IDRD") refetchIdrd();
    else refetchUsdt();
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-lg mx-auto">
      <div className="text-center mb-10">
        <motion.h1
          key={selectedToken}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
            selectedToken === "IDRD"
              ? "from-red-500 to-white"
              : "from-green-400 to-teal-300"
          }`}
        >
          {selectedToken === "IDRD" ? "IDRD Money Changer" : "Fake USDT Faucet"}
        </motion.h1>
        <p className="text-gray-400 mt-2">
          Tukar Lisk ETH menjadi{" "}
          {selectedToken === "IDRD" ? "Rupiah Stablecoin" : "Mock USDT"}
        </p>
      </div>

      {/* TOKEN SELECTOR (TABS) */}
      <div className="flex bg-[#1a1f2e] p-1 rounded-xl mb-6 border border-white/5">
        <button
          onClick={() => setSelectedToken("IDRD")}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            selectedToken === "IDRD"
              ? "bg-red-600 text-white shadow-lg"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <div className="w-4 h-4 rounded-full bg-white text-red-600 flex items-center justify-center text-[10px]">
            Rp
          </div>
          IDRD (Rupiah)
        </button>
        <button
          onClick={() => setSelectedToken("USDT")}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            selectedToken === "USDT"
              ? "bg-green-600 text-white shadow-lg"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <DollarSign size={14} />
          Fake USDT
        </button>
      </div>

      <motion.div className="bg-[#0b0f19] border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* Dynamic Background Blob */}
        <div
          className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-colors duration-500 ${
            selectedToken === "IDRD" ? "bg-red-600/10" : "bg-green-500/10"
          }`}
        ></div>

        <form onSubmit={handleBuy} className="relative z-10 space-y-2">
          {/* INPUT ETH */}
          <div className="bg-gray-900/50 rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex justify-between mb-2">
              <label className="text-gray-400 text-sm">Kamu Bayar (ETH)</label>
              <div className="text-gray-500 text-xs flex items-center gap-1">
                <Wallet size={12} />
                Bal:{" "}
                {ethBalance ? Number(ethBalance.formatted).toFixed(4) : "0"}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                placeholder="0.0"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
                className="w-full bg-transparent text-3xl font-bold text-white focus:outline-none placeholder-gray-700"
                step="0.0001"
              />
              <div className="bg-gray-800 px-3 py-1 rounded-full text-white font-bold text-sm flex items-center gap-2 border border-white/5">
                ETH
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-3 relative z-20">
            <div className="bg-[#0b0f19] border border-gray-700 p-2 rounded-lg text-gray-400 shadow-lg">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>

          {/* OUTPUT TOKEN (DYNAMIC) */}
          <div className="bg-gray-900/50 rounded-2xl p-4 border border-white/5">
            <div className="flex justify-between mb-2">
              <label className="text-gray-400 text-sm">
                Kamu Terima ({selectedToken})
              </label>
              <div className="text-gray-500 text-xs flex items-center gap-1">
                <Coins size={12} />
                Bal:{" "}
                {selectedToken === "IDRD"
                  ? idrdBalance
                    ? formatNumber(Number(formatEther(idrdBalance as bigint)))
                    : "0"
                  : usdtBalance
                  ? formatNumber(Number(formatEther(usdtBalance as bigint)))
                  : "0"}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={ethAmount ? formatNumber(estimatedOutput) : "0"}
                disabled
                className="w-full bg-transparent text-3xl font-bold text-gray-300 focus:outline-none cursor-not-allowed"
              />
              <div
                className={`px-3 py-1 rounded-full text-white font-bold text-sm flex items-center gap-2 border border-white/5 ${
                  selectedToken === "IDRD" ? "bg-red-600" : "bg-green-600"
                }`}
              >
                {selectedToken}
              </div>
            </div>
          </div>

          <div className="flex justify-between px-2 text-xs text-gray-500 mt-2 font-mono">
            <span>Rate:</span>
            <span>
              1 ETH ≈ {formatNumber(currentRate)} {selectedToken}
            </span>
          </div>

          <button
            disabled={isPending || isConfirming || !ethAmount}
            type="submit"
            className={`w-full mt-6 py-4 bg-gradient-to-r text-white font-bold rounded-xl shadow-lg transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
              selectedToken === "IDRD"
                ? "from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 shadow-red-900/20"
                : "from-green-600 to-teal-700 hover:from-green-500 hover:to-teal-600 shadow-green-900/20"
            }`}
          >
            {isPending ? <RefreshCw className="animate-spin" /> : <Coins />}
            {isPending
              ? "Processing..."
              : isConfirming
              ? "Confirming..."
              : `Beli ${selectedToken} Sekarang`}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center">
            Error:{" "}
            {error.message.includes("insufficient")
              ? "Saldo ETH kurang"
              : "Transaksi Gagal"}
          </div>
        )}

        {isSuccess && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-xs text-center font-bold">
            ✅ Sukses! Saldo {selectedToken} bertambah.
          </div>
        )}
      </motion.div>
    </div>
  );
}
