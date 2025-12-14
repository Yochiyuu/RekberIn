export const REKBER_ADDRESS = "0x64131f33cfe3357A8A1b5624aE5E2b06e259fBe0";

export const REKBER_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_buyer", type: "address" },
      { internalType: "string", name: "_itemDetail", type: "string" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "createTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "transactionCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
