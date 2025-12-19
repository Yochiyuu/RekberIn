import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Loader2,
  Lock as LockIcon,
  Package,
  User,
  Wallet,
} from "lucide-react"; // Rename Lock jadi LockIcon
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

export function TransactionList() {
  const { data: count } = useReadContract({
    address: REKBER_ADDRESS as `0x${string}`,
    abi: REKBER_ABI,
    functionName: "transactionCount",
  });

  const total = count ? Number(count) : 0;
  const txIds = Array.from({ length: total }, (_, i) => total - i);

  if (total === 0) {
    return (
      <div className="text-center py-20 opacity-50">
        <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
        <p>Belum ada transaksi di blockchain.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {txIds.map((id) => (
        <TransactionCard key={id} id={id} />
      ))}
    </div>
  );
}

function TransactionCard({ id }: { id: number }) {
  const { address } = useAccount();

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

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  if (isSuccess) {
    refetch();
    refetchAllowance();
  }

  if (!txn)
    return <div className="animate-pulse h-32 bg-gray-800 rounded-xl"></div>;

  // Destructure array from contract
  // txId dan deadline kita skip karena belum dipakai (biar gak error unused var)
  const [, buyer, seller, amount, status, itemDetail] = txn;

  const isBuyer = address === buyer;
  const isSeller = address === seller;

  // Status Enum: 0=CREATED, 1=LOCKED, 2=RELEASED, 3=REFUNDED, 4=DISPUTE, 5=CANCELLED
  const statusText = [
    "Menunggu Deposit",
    "Dana Terkunci",
    "Selesai",
    "Refunded",
    "Dispute",
    "Batal",
  ][status];
  const statusColor = [
    "text-yellow-400",
    "text-blue-400",
    "text-green-400",
    "text-red-400",
    "text-orange-400",
    "text-gray-400",
  ][status];

  const handleAction = (action: string) => {
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
          <div className="flex gap-4 mt-2 text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-1">
              <User size={12} /> Byr: {buyer.slice(0, 6)}...{buyer.slice(-4)}
            </span>
            <span className="flex items-center gap-1">
              <User size={12} /> Slr: {seller.slice(0, 6)}...{seller.slice(-4)}
            </span>
          </div>
        </div>
        <div
          className={`px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold ${statusColor}`}
        >
          {statusText}
        </div>
      </div>

      <div className="flex justify-between items-end border-t border-white/5 pt-4">
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
            Total Harga
          </p>
          <p className="text-xl font-bold text-white font-mono">
            {formatEther(amount)}{" "}
            <span className="text-sm text-gray-500">IDRD</span>
          </p>
        </div>

        <div className="flex gap-2">
          {/* TOMBOL UNTUK BUYER */}
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
                  1. Approve Token
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
                  2. Deposit Dana
                </button>
              )}
            </>
          )}

          {isBuyer && status === 1 && (
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
              Konfirmasi Terima
            </button>
          )}

          {!isBuyer && !isSeller && (
            <span className="text-xs text-gray-500 italic py-2">
              Read-only mode
            </span>
          )}

          {isSeller && status === 0 && (
            <span className="text-xs text-yellow-500 py-2 flex items-center gap-1">
              <Clock size={12} /> Menunggu Deposit Buyer
            </span>
          )}
          {isSeller && status === 1 && (
            <span className="text-xs text-blue-400 py-2 flex items-center gap-1">
              <LockIcon size={12} /> Dana Dikunci
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
