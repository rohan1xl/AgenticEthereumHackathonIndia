import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, polygon, polygonMumbai } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  [mainnet.id]: '0x54164870512f7A7362BaD47B26EB75AeFC0d8dA4',
  [sepolia.id]: '0x54164870512f7A7362BaD47B26EB75AeFC0d8dA4',
  [polygon.id]: '0x54164870512f7A7362BaD47B26EB75AeFC0d8dA4',
  [polygonMumbai.id]: '0x54164870512f7A7362BaD47B26EB75AeFC0d8dA4'
}

// EduCred NFT Contract ABI
export const EDUCRED_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "string", "name": "institution", "type": "string"},
      {"internalType": "string", "name": "courseName", "type": "string"},
      {"internalType": "string", "name": "ipfsHash", "type": "string"}
    ],
    "name": "mintCredential",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "getCredential",
    "outputs": [
      {
        "components": [
          {"internalType": "address", "name": "recipient", "type": "address"},
          {"internalType": "string", "name": "institution", "type": "string"},
          {"internalType": "string", "name": "courseName", "type": "string"},
          {"internalType": "uint256", "name": "issueDate", "type": "uint256"},
          {"internalType": "string", "name": "ipfsHash", "type": "string"},
          {"internalType": "bool", "name": "verified", "type": "bool"}
        ],
        "internalType": "struct EduCred.Credential",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "ownerOf",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "tokenURI",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "index", "type": "uint256"}
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
      {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"},
      {"indexed": false, "internalType": "string", "name": "institution", "type": "string"},
      {"indexed": false, "internalType": "string", "name": "courseName", "type": "string"}
    ],
    "name": "CredentialMinted",
    "type": "event"
  }
] as const

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, polygon, polygonMumbai],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId: 'your-project-id' })
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [polygonMumbai.id]: http()
  }
})