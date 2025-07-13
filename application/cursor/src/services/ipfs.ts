// Pinata IPFS Service
const PINATA_API_KEY = '32c3448594e9325c0860';
const PINATA_SECRET_API_KEY = 'b6289274b10e7f449bfc317d42cd1a25593d636aff417818094320c3cf6b5b79';
const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';

export const ipfsService = {
  async uploadFile(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_API_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Pinata upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.IpfsHash;
    } catch (error) {
      console.error('IPFS upload error:', error);
      throw new Error('Failed to upload file to IPFS');
    }
  },

  async uploadJSON(data: any): Promise<string> {
    try {
      const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_API_KEY,
        },
        body: JSON.stringify({
          pinataMetadata: {
            name: 'EduCred Certificate Metadata',
          },
          pinataContent: data,
        }),
      });

      if (!response.ok) {
        throw new Error(`Pinata JSON upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.IpfsHash;
    } catch (error) {
      console.error('IPFS JSON upload error:', error);
      throw new Error('Failed to upload JSON to IPFS');
    }
  },

  getGatewayUrl(ipfsHash: string): string {
    return `${PINATA_GATEWAY}${ipfsHash}`;
  },

  async getFile(ipfsHash: string): Promise<Response> {
    const url = this.getGatewayUrl(ipfsHash);
    return fetch(url);
  },

  async getJSON(ipfsHash: string): Promise<any> {
    const response = await this.getFile(ipfsHash);
    if (!response.ok) {
      throw new Error('Failed to fetch JSON from IPFS');
    }
    return response.json();
  },
};