import { motion } from "framer-motion";
import {
  AlertTriangle,
  DollarSign,
  Gavel,
  ShieldCheck,
  User,
} from "lucide-react";
import { formatEther } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { REKBER_ABI, REKBER_ADDRESS } from "../config/constants";

export function AdminDashboard() {
  const { address } = useAccount();

  // Cek apakah user adalah Admin
  const { data: adminAddress } = useReadContract({
    address: REKBER_ADDRESS as `0x${string}`,
    abi: REKBER_ABI,
    functionName: "admin",
  });

  const { data: totalFees, refetch: refetchFees } = useReadContract({
    address: REKBER_ADDRESS as `0x${string}`,
    abi: REKBER_ABI,
    functionName: "totalFeeCollected",
  });

  const { writeContract, isPending } = useWriteContract();

  const isAdmin = address === adminAddress;

  if (!isAdmin) {
    return (
      <div className="pt-40 text-center text-red-500 font-bold text-xl">
        <ShieldCheck className="w-16 h-16 mx-auto mb-4" />
        AKSES DITOLAK: Halaman ini khusus Admin.
      </div>
    );
  }

  const handleWithdraw = () => {
    writeContract({
      address: REKBER_ADDRESS as `0x${string}`,
      abi: REKBER_ABI,
      functionName: "withdrawFees",
    });
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="text-blue-500" /> Admin Dashboard
          </h1>
          <p className="text-gray-400">
            Panel kendali untuk penyelesaian sengketa & pendapatan.
          </p>
        </div>

        <div className="bg-[#111827] border border-green-500/20 p-4 rounded-xl flex items-center gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase">
              Total Fee Terkumpul
            </p>
            <p className="text-xl font-mono text-green-400 font-bold">
              {totalFees ? formatEther(totalFees) : "0"} IDRD
            </p>
          </div>
          <button
            onClick={handleWithdraw}
            disabled={!totalFees || totalFees === BigInt(0) || isPending}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50"
          >
            <DollarSign size={16} /> Tarik Fee
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">
        Daftar Sengketa (Dispute) Aktif
      </h3>

      <DisputeList />
    </div>
  );
}

function DisputeList() {
  const { data: count } = useReadContract({
    address: REKBER_ADDRESS as `0x${string}`,
    abi: REKBER_ABI,
    functionName: "transactionCount",
  });

  const total = count ? Number(count) : 0;
  const txIds = Array.from({ length: total }, (_, i) => total - i);

  return (
    <div className="grid grid-cols-1 gap-4">
      {txIds.map((id) => (
        <DisputeCard key={id} id={id} />
      ))}
    </div>
  );
}

function DisputeCard({ id }: { id: number }) {
  const { data: txn, refetch } = useReadContract({
    address: REKBER_ADDRESS as `0x${string}`,
    abi: REKBER_ABI,
    functionName: "transactions",
    args: [BigInt(id)],
  });

  const { writeContract, isPending, isSuccess } = useWriteContract();

  if (isSuccess) refetch();

  if (!txn) return null;
  const [, buyer, seller, amount, status, itemDetail] = txn;

  // HANYA TAMPILKAN YANG STATUSNYA DISPUTE (4)
  if (status !== 4) return null;

  const handleResolve = (winner: string) => {
    writeContract({
      address: REKBER_ADDRESS as `0x${string}`,
      abi: REKBER_ABI,
      functionName: "resolveDispute",
      args: [BigInt(id), winner as `0x${string}`],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-red-500/5 border border-red-500/20 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-red-500/10 rounded-full">
          <AlertTriangle className="text-red-500 w-6 h-6" />
        </div>
        <div>
          <h4 className="text-white font-bold text-lg">
            Kasus #{id}: {itemDetail}
          </h4>
          <p className="text-gray-400 text-sm">
            Nominal Sengketa:{" "}
            <span className="text-white font-mono">
              {formatEther(amount)} IDRD
            </span>
          </p>
          <div className="flex gap-4 mt-2 text-xs font-mono text-gray-500">
            <span className="flex items-center gap-1">
              <User size={12} /> Buyer: {buyer}
            </span>
            <span className="flex items-center gap-1">
              <User size={12} /> Seller: {seller}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 min-w-[200px]">
        <p className="text-xs text-center text-gray-400 mb-1">
          Pilih Pemenang:
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handleResolve(buyer)}
            disabled={isPending}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2"
          >
            <Gavel size={14} /> Menangkan Buyer
          </button>
          <button
            onClick={() => handleResolve(seller)}
            disabled={isPending}
            className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2"
          >
            <Gavel size={14} /> Menangkan Seller
          </button>
        </div>
      </div>
    </motion.div>
  );
}
