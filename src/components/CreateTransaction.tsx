import { motion } from "framer-motion";
import { AlertCircle, Clock, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { parseEther } from "viem"; // IMPORT PENTING: parseEther
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { REKBER_ABI, REKBER_ADDRESS } from "../config/constants";

export function CreateTransaction() {
  const { address } = useAccount();
  const [buyer, setBuyer] = useState("");
  const [item, setItem] = useState("");

  // amount menyimpan string angka murni ("500000")
  const [amount, setAmount] = useState("");

  const [duration, setDuration] = useState("3");
  const [localError, setLocalError] = useState("");

  const {
    data: hash,
    writeContract,
    isPending,
    error: contractError,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Hapus titik/koma agar jadi angka murni untuk blockchain
    const rawValue = e.target.value.replace(/\D/g, "");
    setAmount(rawValue);
  };

  const getDisplayAmount = () => {
    if (!amount) return "";
    return new Intl.NumberFormat("id-ID").format(Number(amount));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!buyer || !item || !amount || !duration) {
      setLocalError("Semua kolom wajib diisi!");
      return;
    }

    if (address && buyer.toLowerCase() === address.toLowerCase()) {
      setLocalError("Tidak bisa transaksi dengan diri sendiri.");
      return;
    }

    try {
      writeContract({
        address: REKBER_ADDRESS as `0x${string}`,
        abi: REKBER_ABI,
        functionName: "createTransaction",
        args: [
          buyer as `0x${string}`,
          item,
          parseEther(amount), // PERBAIKAN DISINI: Gunakan parseEther
          BigInt(duration),
        ],
      });
    } catch (err) {
      console.error(err);
      setLocalError("Gagal membuat transaksi");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full bg-[#0b0f19] p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] -mr-16 -mt-16 pointer-events-none" />

      <h3 className="text-2xl font-bold text-white mb-2">
        Buat Transaksi Baru
      </h3>
      <p className="text-gray-400 text-sm mb-8">
        Isi detail transaksi escrow dengan aman.
      </p>

      <form onSubmit={handleCreate} className="space-y-5">
        {localError && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-xs font-bold">
            <AlertCircle className="w-4 h-4" /> {localError}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Alamat Pembeli (Wallet)
          </label>
          <input
            type="text"
            placeholder="0x..."
            value={buyer}
            onChange={(e) => setBuyer(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Detail Barang/Jasa
          </label>
          <input
            type="text"
            placeholder="Contoh: Akun Game / Jasa Design"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Harga (IDRD)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="0"
                value={getDisplayAmount()}
                onChange={handleAmountChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Garansi Otomatis
            </label>
            <div className="relative">
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              />
              <div className="absolute right-4 top-3 text-xs font-bold text-gray-500 flex items-center gap-1">
                <Clock size={12} /> Menit
              </div>
            </div>
          </div>
        </div>

        <button
          disabled={isPending || isConfirming}
          type="submit"
          className="w-full py-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending || isConfirming ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Memproses...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" /> Buat Transaksi
            </>
          )}
        </button>

        {contractError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs mt-4 break-words">
            Error: {contractError.message.split("\n")[0]}
          </div>
        )}

        {isSuccess && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm font-bold text-center mt-4">
            ✅ Transaksi Berhasil! <br />
            <span className="text-xs font-normal text-gray-400">
              Cek status di Public Explorer.
            </span>
          </div>
        )}
      </form>
    </motion.div>
  );
}
