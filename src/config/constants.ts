// GANTI REKBER_ADDRESS DENGAN ALAMAT KONTRAK V2 YANG BARU KAMU DEPLOY
export const REKBER_ADDRESS = "0x556E713C8aDd9FbC7a4D4A6d877BEb0d7a3Ff0c6";

export const REKBER_ABI = [
  // --- FUNGSI UTAMA ---
  {
    inputs: [
      { internalType: "address", name: "_buyer", type: "address" },
      { internalType: "string", name: "_itemDetail", type: "string" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint256", name: "_durationInMinutes", type: "uint256" },
    ],
    name: "createTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "depositFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "confirmDelivery",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "claimAutoRelease",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "cancelTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
    name: "raiseDispute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },

  // --- VIEW FUNCTIONS ---
  {
    inputs: [],
    name: "transactionCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "transactions",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "address", name: "buyer", type: "address" },
      { internalType: "address", name: "seller", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint8", name: "status", type: "uint8" },
      { internalType: "string", name: "itemDetail", type: "string" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

// --- TOKEN & USDT ABI ---
export const TOKEN_ADDRESS = "0x6a09F0B88E89E8fD256D3eEe01EE1Ab6E2537188";

export const TOKEN_ABI = [
  {
    inputs: [],
    name: "buyTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  // [PENTING] Tambahan fungsi allowance biar gak error
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const USDT_ADDRESS = "0xCB0A85AE2B2Ea64924B06BC2B2379b5436072fc1";
export const USDT_ABI = TOKEN_ABI;
