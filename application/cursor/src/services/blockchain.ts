import { readContract, writeContract, waitForTransactionReceipt } from '@wagmi/core'
import { wagmiConfig, CONTRACT_ADDRESSES, EDUCRED_ABI } from '../config/blockchain'
import { Credential, VerificationResult } from '../types/blockchain'
import { ipfsService } from './ipfs'

export class BlockchainService {
  private getContractAddress(chainId: number): string {
    const address = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]
    if (!address) {
      throw new Error(`Contract not deployed on chain ${chainId}`)
    }
    return address
  }

  async mintCredential(
    recipientAddress: string,
    institution: string,
    courseName: string,
    certificateFile: File,
    chainId: number
  ): Promise<string> {
    try {
      // Upload certificate file to IPFS
      const ipfsHash = await ipfsService.uploadFile(certificateFile)
      
      // Create and upload metadata
      const metadata = {
        name: `${courseName} Certificate`,
        description: `Academic credential issued by ${institution}`,
        image: ipfsService.getGatewayUrl(ipfsHash),
        attributes: [
          { trait_type: "Institution", value: institution },
          { trait_type: "Course", value: courseName },
          { trait_type: "Issue Date", value: new Date().toISOString() },
          { trait_type: "Certificate Hash", value: ipfsHash }
        ]
      }
      
      const metadataHash = await ipfsService.uploadJSON(metadata)
      
      // Mint the NFT on blockchain
      const contractAddress = this.getContractAddress(chainId)
      
      const hash = await writeContract(wagmiConfig, {
        address: contractAddress as `0x${string}`,
        abi: EDUCRED_ABI,
        functionName: 'mintCredential',
        args: [recipientAddress as `0x${string}`, institution, courseName, metadataHash]
      })

      // Wait for transaction confirmation
      await waitForTransactionReceipt(wagmiConfig, { hash })
      
      return hash
    } catch (error) {
      console.error('Failed to mint credential:', error)
      throw new Error('Failed to mint credential on blockchain')
    }
  }

  async verifyCredential(tokenId: number, chainId: number): Promise<VerificationResult> {
    try {
      const contractAddress = this.getContractAddress(chainId)
      
      // Get credential data from contract
      const credentialData = await readContract(wagmiConfig, {
        address: contractAddress as `0x${string}`,
        abi: EDUCRED_ABI,
        functionName: 'getCredential',
        args: [BigInt(tokenId)]
      }) as any

      // Get owner of the token
      const owner = await readContract(wagmiConfig, {
        address: contractAddress as `0x${string}`,
        abi: EDUCRED_ABI,
        functionName: 'ownerOf',
        args: [BigInt(tokenId)]
      }) as string

      // Get token URI
      const tokenURI = await readContract(wagmiConfig, {
        address: contractAddress as `0x${string}`,
        abi: EDUCRED_ABI,
        functionName: 'tokenURI',
        args: [BigInt(tokenId)]
      }) as string

      const credential: Credential = {
        id: tokenId.toString(),
        tokenId,
        recipient: owner,
        institution: credentialData.institution,
        courseName: credentialData.courseName,
        issueDate: new Date(Number(credentialData.issueDate) * 1000).toISOString(),
        ipfsHash: credentialData.ipfsHash,
        transactionHash: '', // Would need to be retrieved from events
        verified: credentialData.verified
      }

      return { isValid: true, credential }
    } catch (error) {
      console.error('Failed to verify credential:', error)
      return { 
        isValid: false, 
        error: 'Credential not found or verification failed. Please check the token ID and network.' 
      }
    }
  }

  async getCredentialsByOwner(ownerAddress: string, chainId: number): Promise<Credential[]> {
    try {
      const contractAddress = this.getContractAddress(chainId)
      
      // Get balance of owner
      const balance = await readContract(wagmiConfig, {
        address: contractAddress as `0x${string}`,
        abi: EDUCRED_ABI,
        functionName: 'balanceOf',
        args: [ownerAddress as `0x${string}`]
      }) as bigint

      const credentials: Credential[] = []
      
      // Get all tokens owned by the address
      for (let i = 0; i < Number(balance); i++) {
        try {
          const tokenId = await readContract(wagmiConfig, {
            address: contractAddress as `0x${string}`,
            abi: EDUCRED_ABI,
            functionName: 'tokenOfOwnerByIndex',
            args: [ownerAddress as `0x${string}`, BigInt(i)]
          }) as bigint

          const verificationResult = await this.verifyCredential(Number(tokenId), chainId)
          if (verificationResult.isValid && verificationResult.credential) {
            credentials.push(verificationResult.credential)
          }
        } catch (error) {
          console.error(`Failed to get token at index ${i}:`, error)
        }
      }

      return credentials
    } catch (error) {
      console.error('Failed to get credentials by owner:', error)
      return []
    }
  }

  // Mock data for demo purposes when contract is not available
  getMockCredentials(): Credential[] {
    return [
      {
        id: '1',
        tokenId: 1,
        recipient: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b',
        institution: 'MIT',
        courseName: 'Blockchain Fundamentals',
        issueDate: '2024-01-15T00:00:00Z',
        ipfsHash: 'QmX7Y8Z9MockHash1',
        transactionHash: '0xabc123def456...',
        verified: true
      },
      {
        id: '2',
        tokenId: 2,
        recipient: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b',
        institution: 'Stanford University',
        courseName: 'Advanced Cryptography',
        issueDate: '2024-02-20T00:00:00Z',
        ipfsHash: 'QmX7Y8Z9MockHash2',
        transactionHash: '0xdef456ghi789...',
        verified: true
      },
      {
        id: '3',
        tokenId: 3,
        recipient: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b',
        institution: 'NPTEL',
        courseName: 'Introduction to Machine Learning',
        issueDate: '2024-03-10T00:00:00Z',
        ipfsHash: 'QmX7Y8Z9MockHash3',
        transactionHash: '0xghi789jkl012...',
        verified: true
      }
    ]
  }

  async verifyMockCredential(tokenId: number): Promise<VerificationResult> {
    const mockCredentials = this.getMockCredentials()
    const credential = mockCredentials.find(c => c.tokenId === tokenId)
    
    if (credential) {
      return { isValid: true, credential }
    } else {
      return { 
        isValid: false, 
        error: 'Credential not found. Try token IDs: 1, 2, or 3 for demo.' 
      }
    }
  }
}

export const blockchainService = new BlockchainService()