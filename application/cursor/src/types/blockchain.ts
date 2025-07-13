export interface Credential {
  id: string;
  tokenId: number;
  recipient: string;
  institution: string;
  courseName: string;
  issueDate: string;
  ipfsHash: string;
  transactionHash: string;
  verified: boolean;
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  balance: string;
  network: string | null;
}

export interface VerificationResult {
  isValid: boolean;
  credential?: Credential;
  error?: string;
}