import { motion } from "framer-motion";
import { Clock, Package, RotateCcw } from "lucide-react"; // Import RotateCcw
import { useState } from "react";
import { formatEther } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { REKBER_ABI, REKBER_ADDRESS } from "../config/constants";

// Helper Format Rupiah
const formatIDR = (amountInWei: bigint) => {
  const etherValue = formatEther(amountInWei);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(etherValue));
};

export function History() {
  const { address } = useAccount();
  const [refreshKey, setRefreshKey] = useState(0); // State Refresh

  // Ambil total transaksi
  const { data: count, refetch: refetchCount } = useReadContract({
    address: REKBER_ADDRESS as `0x${string}`,
    abi: REKBER_ABI,
    functionName: "transactionCount",
  });

  const handleRefresh = () => {
    refetchCount();
    setRefreshKey((prev) => prev + 1);
  };

  const total = count ? Number(count) : 0;
  const txIds = Array.from({ length: total }, (_, i) => total - i);

  if (!address) {
    return (
      <div className="pt-40 text-center text-gray-400">
        Silakan connect wallet untuk melihat riwayat.
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Riwayat Transaksi Saya
          </h1>
          <p className="text-gray-400 mt-1">
            Transaksi dimana kamu sebagai Pembeli atau Penjual.
          </p>
        </div>

        {/* Tombol Refresh */}
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-xl transition-all border border-white/10 shadow-lg active:scale-95"
        >
          <RotateCcw size={16} /> Refresh History
        </button>
      </div>

      <div className="space-y-4">
        {total === 0 ? (
          <EmptyState />
        ) : (
          txIds.map((id) => (
            <HistoryItem
              key={`${id}-${refreshKey}`}
              id={id}
              userAddress={address}
            />
          ))
        )}
      </div>
    </div>
  );
}

function HistoryItem({ id, userAddress }: { id: number; userAddress: string }) {
  const { data: txn } = useReadContract({
    address: REKBER_ADDRESS as `0x${string}`,
    abi: REKBER_ABI,
    functionName: "transactions",
    args: [BigInt(id)],
  });

  if (!txn) return null;

  const [, buyer, seller, amount, status, itemDetail] = txn;

  const myAddress = userAddress.toLowerCase();
  const buyerAddress = buyer.toLowerCase();
  const sellerAddress = seller.toLowerCase();

  const isMyTx = myAddress === buyerAddress || myAddress === sellerAddress;

  if (!isMyTx) return null;

  const role = myAddress === buyerAddress ? "Pembeli" : "Penjual";

  const statusText = [
    "Menunggu Deposit",
    "Dana Terkunci",
    "Selesai",
    "Refunded",
    "Dispute",
    "Batal",
  ][status];

  const statusClass = [
    "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    "text-blue-400 bg-blue-400/10 border-blue-400/20",
    "text-green-400 bg-green-400/10 border-green-400/20",
    "text-purple-400 bg-purple-400/10 border-purple-400/20",
    "text-orange-400 bg-orange-400/10 border-orange-400/20",
    "text-gray-400 bg-gray-400/10 border-gray-400/20",
  ][status];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#0b0f19] border border-white/5 p-5 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 hover:border-white/10 transition-all"
    >
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center border border-white/5 bg-gray-900`}
        >
          <Package className="text-gray-400 w-6 h-6" />
        </div>
        <div>
          <h4 className="text-white font-bold">
            #{id} - {itemDetail}
          </h4>
          <p className="text-gray-500 text-xs mt-1 font-mono">
            Peran:{" "}
            <span
              className={
                role === "Pembeli" ? "text-blue-400" : "text-green-400"
              }
            >
              {role}
            </span>
            <span className="mx-2">•</span>
            {/* Format IDR Disini */}
            {formatIDR(amount)}
          </p>
        </div>
      </div>

      <div
        className={`px-4 py-2 rounded-lg text-xs font-bold border ${statusClass}`}
      >
        {statusText}
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-10">
      <div className="w-16 h-16 bg-gray-800/50 rounded-full mx-auto flex items-center justify-center mb-4">
        <Clock className="text-gray-600" />
      </div>
      <p className="text-gray-500">Belum ada data transaksi.</p>
    </div>
  );
}
