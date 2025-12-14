import { useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { REKBER_ABI, REKBER_ADDRESS } from "../config/constants";

export function CreateTransaction() {
  const [buyer, setBuyer] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");

  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyer || !item || !amount) return;

    writeContract({
      address: REKBER_ADDRESS as `0x${string}`,
      abi: REKBER_ABI,
      functionName: "createTransaction",
      args: [buyer as `0x${string}`, item, BigInt(amount)],
    });
  };

  return (
    <div className="w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6 text-center">
        Buat Transaksi Baru
      </h3>

      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Alamat Pembeli
          </label>
          <input
            type="text"
            placeholder="0x..."
            value={buyer}
            onChange={(e) => setBuyer(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Detail Barang
          </label>
          <input
            type="text"
            placeholder="Contoh: Akun Valorant"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Harga (Wei)
          </label>
          <input
            type="number"
            placeholder="5000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition"
          />
        </div>

        <button
          disabled={isPending || isConfirming}
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending
            ? "Processing..."
            : isConfirming
            ? "Confirming..."
            : "Buat Transaksi 🚀"}
        </button>

        {error && (
          <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
            Error: {error.message.split("\n")[0]}
          </div>
        )}

        {isSuccess && (
          <div className="p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-200 text-sm font-bold text-center">
            ✅ Transaksi Berhasil!
          </div>
        )}
      </form>
    </div>
  );
}
