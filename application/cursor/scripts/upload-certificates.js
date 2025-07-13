const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');

const PINATA_API_KEY = '32c3448594e9325c0860';
const PINATA_SECRET_API_KEY = 'b6289274b10e7f449bfc317d42cd1a25593d636aff417818094320c3cf6b5b79';

async function uploadToPinata(filePath, fileName) {
  try {
    const formData = new FormData();
    const fileBuffer = fs.readFileSync(filePath);
    
    formData.append('file', fileBuffer, {
      filename: fileName,
      contentType: 'application/pdf'
    });

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_API_KEY,
        ...formData.getHeaders()
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result.IpfsHash;
  } catch (error) {
    console.error(`Error uploading ${fileName}:`, error);
    return null;
  }
}

async function createSampleCertificates() {
  console.log('Creating sample certificates...');
  
  // Create sample certificate content
  const certificates = [
    {
      name: 'MIT_Computer_Science_Certificate.pdf',
      content: `MIT OpenCourseWare
Certificate of Completion

This is to certify that
[Student Name]
has successfully completed

Introduction to Computer Science

Course Details:
- Institution: MIT OpenCourseWare
- Course: Introduction to Computer Science
- Duration: 12 weeks
- Grade: A+
- Instructor: Prof. John Smith
- Issue Date: January 15, 2024

This certificate is issued on the blockchain and verified through IPFS.`
    },
    {
      name: 'Stanford_ML_Certificate.pdf',
      content: `Stanford Online
Certificate of Completion

This is to certify that
[Student Name]
has successfully completed

Machine Learning Fundamentals

Course Details:
- Institution: Stanford Online
- Course: Machine Learning Fundamentals
- Duration: 16 weeks
- Grade: A
- Instructor: Prof. Sarah Johnson
- Issue Date: February 20, 2024

This certificate is issued on the blockchain and verified through IPFS.`
    },
    {
      name: 'Harvard_Blockchain_Certificate.pdf',
      content: `Harvard Extension School
Certificate of Completion

This is to certify that
[Student Name]
has successfully completed

Blockchain and Cryptocurrency

Course Details:
- Institution: Harvard Extension School
- Course: Blockchain and Cryptocurrency
- Duration: 10 weeks
- Grade: A-
- Instructor: Prof. Michael Chen
- Issue Date: March 10, 2024

This certificate is issued on the blockchain and verified through IPFS.`
    }
  ];

  // Create certificates directory if it doesn't exist
  if (!fs.existsSync('public/sample-certificates')) {
    fs.mkdirSync('public/sample-certificates', { recursive: true });
  }

  // Create and upload certificates
  const results = [];
  
  for (const cert of certificates) {
    // Create a simple text file as certificate (easier to create than PDF)
    const filePath = `public/sample-certificates/${cert.name.replace('.pdf', '.txt')}`;
    fs.writeFileSync(filePath, cert.content);
    
    console.log(`Uploading ${cert.name}...`);
    const ipfsHash = await uploadToPinata(filePath, cert.name);
    
    if (ipfsHash) {
      results.push({
        name: cert.name,
        ipfsHash: ipfsHash,
        url: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
      });
      console.log(`✅ Uploaded: ${ipfsHash}`);
    } else {
      console.log(`❌ Failed to upload ${cert.name}`);
    }
  }

  // Save results to a JSON file
  fs.writeFileSync('public/sample-certificates/certificate-hashes.json', JSON.stringify(results, null, 2));
  
  console.log('\n📋 Certificate Upload Results:');
  console.log(JSON.stringify(results, null, 2));
  
  return results;
}

// Run the script
createSampleCertificates().catch(console.error); 