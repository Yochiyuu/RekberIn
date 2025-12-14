import { useReadContract } from "wagmi";
import { CreateTransaction } from "../components/CreateTransaction";
import { REKBER_ABI, REKBER_ADDRESS } from "../config/constants";

export function RekberApp() {
  return (
    <div className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* KOLOM KIRI: FORM CREATE (1/3 Lebar) */}
        <div className="lg:col-span-1">
          <CreateTransaction />
        </div>

        {/* KOLOM KANAN: PUBLIC FEED (2/3 Lebar) */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-2xl border border-white/10 p-6 min-h-[500px]">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              🌍 Public Explorer
              <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded border border-gray-700">
                Realtime
              </span>
            </h2>

            {/* Disini kita akan panggil list transaksi nanti */}
            <PublicTransactionList />
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen Kecil buat Nampilin List (Dummy dulu, nanti kita connect)
function PublicTransactionList() {
  // Logic untuk fetch data array dari Smart Contract butuh mapping loop.
  // Untuk sekarang kita tampilkan placeholder atau count total.

  const { data: count } = useReadContract({
    address: REKBER_ADDRESS as `0x${string}`,
    abi: REKBER_ABI,
    functionName: "transactionCount",
  });

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl text-blue-300">
        Total Transaksi di Platform:{" "}
        <span className="font-bold text-white text-xl ml-2">
          {count ? count.toString() : "0"}
        </span>
      </div>

      <p className="text-gray-500 text-center mt-10">
        List transaksi publik akan muncul di sini. <br />
        (Menunggu user membuat transaksi pertama...)
      </p>
    </div>
  );
}
