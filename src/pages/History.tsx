export function History() {
  return (
    <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">
        Riwayat Transaksi Saya
      </h1>

      <div className="bg-gray-900 rounded-2xl border border-white/10 p-8 text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto flex items-center justify-center mb-4">
          <span className="text-2xl">📭</span>
        </div>
        <h3 className="text-xl font-semibold text-white">Belum ada riwayat</h3>
        <p className="text-gray-400 mt-2">
          Kamu belum pernah melakukan transaksi sebagai Pembeli atau Penjual.
        </p>
      </div>
    </div>
  );
}
