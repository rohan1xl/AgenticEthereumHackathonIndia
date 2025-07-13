import { useAccount, useConnect, useDisconnect, useBalance, useChainId } from 'wagmi';
import { metaMask } from 'wagmi/connectors';

export const useWallet = () => {
  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { data: balance } = useBalance({ address });

  const connectWallet = () => {
    connect({ connector: metaMask() });
  };

  const disconnectWallet = () => {
    disconnect();
  };

  return {
    wallet: {
      connected: isConnected,
      address,
      balance: balance?.formatted || '0',
      network: getNetworkName(chainId)
    },
    connectWallet,
    disconnectWallet,
    loading: isPending
  };
};

const getNetworkName = (chainId: number) => {
  switch (chainId) {
    case 1: return 'Ethereum';
    case 11155111: return 'Sepolia';
    case 137: return 'Polygon';
    case 80001: return 'Mumbai';
    default: return 'Unknown';
  }
};