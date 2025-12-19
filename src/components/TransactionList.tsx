import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Loader2,
  Lock as LockIcon,
  Package,
  RotateCcw, // Icon Refresh
  User,
  Wallet,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { formatEther } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  REKBER_ABI,
  REKBER_ADDRESS,
  TOKEN_ABI,
  TOKEN_ADDRESS,
} from "../config/constants";

// Helper Format Rupiah
const formatIDR = (amountInWei: bigint) => {
  // Asumsi token punya 18 decimals, kita formatEther dulu baru jadikan Rupiah
  const etherValue = formatEther(amountInWei);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(etherValue));
};

export function TransactionList() {
  // State untuk trigger refresh (pakai teknik key remounting)
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: count, refetch: refetchCount } = useReadContract({
    address: REKBER_ADDRESS as `0x${string}`,
    abi: REKBER_ABI,
    functionName: "transactionCount",
  });

  const handleRefresh = () => {
    refetchCount(); // Cek jumlah transaksi baru
    setRefreshKey((prev) => prev + 1); // Paksa component anak render ulang
  };

  const total = count ? Number(count) : 0;
  const txIds = Array.from({ length: total }, (_, i) => total - i);

  return (
    <div className="space-y-4">
      {/* Header List dengan Tombol Refresh */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider text-gray-500">
          Daftar Transaksi
        </h3>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-xs rounded-lg transition-all active:scale-95 border border-white/5"
        >
          <RotateCcw size={12} /> Refresh Data
        </button>
      </div>

      {total === 0 ? (
        <div className="text-center py-20 opacity-50">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <p>Belum ada transaksi di blockchain.</p>
        </div>
      ) : (
        txIds.map((id) => (
          // Tambahkan refreshKey ke prop key agar component ini di-reset saat refresh ditekan
          <TransactionCard key={`${id}-${refreshKey}`} id={id} />
        ))
      )}
    </div>
  );
}

function TransactionCard({ id }: { id: number }) {
  const { address } = useAccount();
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);

  const { data: txn, refetch } = useReadContract({
    address: REKBER_ADDRESS as `0x${string}`,
    abi: REKBER_ABI,
    functionName: "transactions",
    args: [BigInt(id)],
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: TOKEN_ADDRESS as `0x${string}`,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [address as `0x${string}`, REKBER_ADDRESS as `0x${string}`],
  });

  const {
    writeContract,
    data: hash,
    isPending,
    error: writeError,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // --- LOGIKA COUNTDOWN DEADLINE ---
  useEffect(() => {
    if (!txn) return;
    const deadline = Number(txn[6]);
    const status = txn[4];

    if (status === 1 && deadline > 0) {
      const interval = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);
        const diff = deadline - now;

        if (diff <= 0) {
          setIsDeadlinePassed(true);
          setTimeLeft("Garansi Habis");
          clearInterval(interval);
        } else {
          const m = Math.floor(diff / 60);
          const s = diff % 60;
          setTimeLeft(`${m}m ${s}s`);
          setIsDeadlinePassed(false);
        }
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setTimeLeft("");
    }
  }, [txn]);

  if (isSuccess) {
    refetch();
    refetchAllowance();
  }

  if (!txn)
    return (
      <div className="animate-pulse h-32 bg-gray-800 rounded-xl mb-4"></div>
    );

  const [, buyer, seller, amount, status, itemDetail] = txn;

  const isBuyer = address === buyer;
  const isSeller = address === seller;

  const statusText = [
    "Menunggu Deposit",
    "Dana Terkunci",
    "Selesai",
    "Refunded",
    "Dispute",
    "Batal",
  ][status];

  const statusColor = [
    "text-yellow-400 border-yellow-400/20 bg-yellow-400/10",
    "text-blue-400 border-blue-400/20 bg-blue-400/10",
    "text-green-400 border-green-400/20 bg-green-400/10",
    "text-purple-400 border-purple-400/20 bg-purple-400/10",
    "text-orange-400 border-orange-400/20 bg-orange-400/10",
    "text-gray-400 border-gray-400/20 bg-gray-400/10",
  ][status];

  const handleAction = (action: string) => {
    // ... (SAMA SEPERTI SEBELUMNYA, TIDAK DIUBAH LOGIKANYA)
    if (action === "APPROVE") {
      writeContract({
        address: TOKEN_ADDRESS as `0x${string}`,
        abi: TOKEN_ABI,
        functionName: "approve",
        args: [REKBER_ADDRESS as `0x${string}`, amount],
      });
    } else if (action === "DEPOSIT") {
      writeContract({
        address: REKBER_ADDRESS as `0x${string}`,
        abi: REKBER_ABI,
        functionName: "depositFunds",
        args: [BigInt(id)],
      });
    } else if (action === "CONFIRM") {
      writeContract({
        address: REKBER_ADDRESS as `0x${string}`,
        abi: REKBER_ABI,
        functionName: "confirmDelivery",
        args: [BigInt(id)],
      });
    } else if (action === "CANCEL") {
      writeContract({
        address: REKBER_ADDRESS as `0x${string}`,
        abi: REKBER_ABI,
        functionName: "cancelTransaction",
        args: [BigInt(id)],
      });
    } else if (action === "DISPUTE") {
      writeContract({
        address: REKBER_ADDRESS as `0x${string}`,
        abi: REKBER_ABI,
        functionName: "raiseDispute",
        args: [BigInt(id)],
      });
    } else if (action === "CLAIM") {
      writeContract({
        address: REKBER_ADDRESS as `0x${string}`,
        abi: REKBER_ABI,
        functionName: "claimAutoRelease",
        args: [BigInt(id)],
      });
    }
  };

  const currentAllowance = allowance ? allowance : BigInt(0);
  const needApprove = currentAllowance < amount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111827] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-white text-lg flex items-center gap-2">
            #{id} <span className="text-gray-500">|</span> {itemDetail}
          </h4>
          <div className="flex flex-col gap-1 mt-2 text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-1">
              <User size={12} className={isBuyer ? "text-green-400" : ""} />
              Buyer: {buyer.slice(0, 6)}...{buyer.slice(-4)}{" "}
              {isBuyer && "(You)"}
            </span>
            <span className="flex items-center gap-1">
              <User size={12} className={isSeller ? "text-green-400" : ""} />
              Seller: {seller.slice(0, 6)}...{seller.slice(-4)}{" "}
              {isSeller && "(You)"}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div
            className={`px-3 py-1 rounded-full border text-xs font-bold inline-block mb-2 ${statusColor}`}
          >
            {statusText}
          </div>
          {status === 1 && (
            <div className="text-xs font-mono text-orange-400 flex items-center justify-end gap-1">
              <Clock size={12} /> {isDeadlinePassed ? "Siap Klaim" : timeLeft}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-end border-t border-white/5 pt-4 gap-4">
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
            Total Harga
          </p>
          {/* UBAH DISINI: Pakai formatIDR */}
          <p className="text-xl font-bold text-white font-mono">
            {formatIDR(amount)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-end w-full sm:w-auto">
          {/* LOGIKA TOMBOL (SAMA) */}
          {isSeller && status === 0 && (
            <button
              onClick={() => handleAction("CANCEL")}
              disabled={isPending || isConfirming}
              className="px-3 py-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="animate-spin w-3 h-3" />
              ) : (
                <XCircle className="w-3 h-3" />
              )}
              Batalkan
            </button>
          )}

          {isBuyer && status === 0 && (
            <>
              {needApprove ? (
                <button
                  onClick={() => handleAction("APPROVE")}
                  disabled={isPending || isConfirming}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  Approve
                </button>
              ) : (
                <button
                  onClick={() => handleAction("DEPOSIT")}
                  disabled={isPending || isConfirming}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    <Wallet className="w-4 h-4" />
                  )}
                  Deposit
                </button>
              )}
            </>
          )}

          {status === 1 && (
            <>
              {isBuyer && (
                <button
                  onClick={() => handleAction("CONFIRM")}
                  disabled={isPending || isConfirming}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  Terima Barang
                </button>
              )}

              {isSeller && isDeadlinePassed && (
                <button
                  onClick={() => handleAction("CLAIM")}
                  disabled={isPending || isConfirming}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50 animate-pulse"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    <Wallet className="w-4 h-4" />
                  )}
                  Klaim Dana
                </button>
              )}

              {(isBuyer || isSeller) && (
                <button
                  onClick={() => handleAction("DISPUTE")}
                  disabled={isPending || isConfirming}
                  className="px-3 py-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin w-3 h-3" />
                  ) : (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                  Komplain
                </button>
              )}
            </>
          )}

          {writeError && (
            <div className="w-full text-right mt-2">
              <span className="text-[10px] text-red-400 bg-red-400/10 px-2 py-1 rounded">
                {writeError.message.split("\n")[0].slice(0, 50)}...
              </span>
            </div>
          )}

          {isSeller && status === 0 && (
            <span className="text-xs text-yellow-500 py-2 flex items-center gap-1 self-center ml-2">
              <Clock size={12} /> Menunggu Deposit
            </span>
          )}
          {isBuyer && status === 1 && !isDeadlinePassed && (
            <span className="text-xs text-blue-400 py-2 flex items-center gap-1 self-center ml-2">
              <LockIcon size={12} /> Dana Aman
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
