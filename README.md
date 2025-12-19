# RekberIn | Decentralized Escrow Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React_%2B_Vite-61DAFB.svg)
![Solidity](https://img.shields.io/badge/smart__contract-Solidity-363636.svg)
![Wagmi](https://img.shields.io/badge/web3-Wagmi_%2B_Viem-grey.svg)

**RekberIn** is a decentralized application (dApp) that facilitates secure peer-to-peer transactions using blockchain technology. It acts as a trustless middleman (Escrow) where funds are locked in a smart contract and only released when specific conditions are met, protecting both Buyers and Sellers from fraud.

## 🌟 Key Features

### For Sellers
- **Create Transaction:** Easily create a secured transaction link for your goods/services.
- **Auto-Claim Guarantee:** Protection against non-responsive buyers. If the buyer disappears after the deadline, you can claim the funds automatically.
- **Cancel Transaction:** Ability to cancel transactions before the buyer deposits funds.

### For Buyers
- **Secure Deposit:** Funds are held safely in the Smart Contract, not sent directly to the seller.
- **Inspection Period:** Time-bound guarantee to inspect the item before confirming the release of funds.
- **Dispute System:** Ability to raise a dispute if the received item does not match the description.

### Platform & Admin
- **Dispute Resolution:** Admin dashboard to adjudicate conflicts and decide whether to refund the buyer or release funds to the seller.
- **Fee System:** 1% platform fee on successful transactions to support sustainability.
- **Transparent Logic:** All rules are enforced by an immutable Smart Contract.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, Framer Motion (Animations)
- **Icons:** Lucide React
- **Blockchain Interaction:** Wagmi, Viem, TanStack Query
- **Smart Contract:** Solidity (EVM Compatible)

## 🚀 Getting Started

Follow these steps to run the project locally:

### Prerequisites
- Node.js (v18 or later)
- MetaMask or any Web3 Wallet
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/yochiyuu/rekberin.git](https://github.com/yochiyuu/rekberin.git)
   cd rekberin
2. **Install dependencies**
   ```bash
   npm install
3. **Run the development server**
   ```bash
   npm run dev

### SmartContract Address
1. **RekberIn V2**
   ```bash
   0x556E713C8aDd9FbC7a4D4A6d877BEb0d7a3Ff0c6
2. **Payment Token**
   ```bash
   0x6a09F0B88E89E8fD256D3eEe01EE1Ab6E2537188
3. **USDT (Mock)**
   ```bash
   0xCB0A85AE2B2Ea64924B06BC2B2379b5436072fc1
