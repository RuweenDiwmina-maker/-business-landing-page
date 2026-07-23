import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import zlib from 'zlib';

const configPath = 'C:/Users/Ruveen/.config/configstore/firebase-tools.json';
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const accessToken = config.tokens.access_token;

async function deploy() {
  const siteId = 'business-landing-web';
  const publicDir = path.resolve('.');

  console.log(`1. Creating hosting version for site ${siteId}...`);
  const createVersionRes = await fetch(`https://firebasehosting.googleapis.com/v1beta1/projects/-/sites/${siteId}/versions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: 'CREATED',
      config: { cleanUrls: true }
    })
  });

  const versionData = await createVersionRes.json();
  if (!createVersionRes.ok) {
    throw new Error(`Failed to create version: ${JSON.stringify(versionData)}`);
  }

  const versionName = versionData.name;
  console.log(`Version created: ${versionName}`);

  // Calculate SHA256 of GZIPPED files in public/
  const files = fs.readdirSync(publicDir);
  const hashMap = {};
  const gzippedMap = {};

  for (const file of files) {
    if (file === '.git' || file === 'node_modules' || file.startsWith('.')) continue;
    
    const filePath = path.join(publicDir, file);
    if (fs.statSync(filePath).isFile()) {
      if (!file.endsWith('.html') && !file.endsWith('.css') && !file.endsWith('.js') && !file.endsWith('.jpg')) continue;
      
      const rawContent = fs.readFileSync(filePath);
      const gzipped = zlib.gzipSync(rawContent, { level: 9 });
      const hash = crypto.createHash('sha256').update(gzipped).digest('hex');
      const reqPath = `/${file}`;
      hashMap[reqPath] = hash;
      gzippedMap[hash] = gzipped;
      console.log(`  File: ${reqPath} -> Gzip SHA256: ${hash}`);
    } else if (file === 'assets') {
      const assetFiles = fs.readdirSync(filePath);
      for (const assetFile of assetFiles) {
        const assetFilePath = path.join(filePath, assetFile);
        if (fs.statSync(assetFilePath).isFile()) {
          const rawContent = fs.readFileSync(assetFilePath);
          const gzipped = zlib.gzipSync(rawContent, { level: 9 });
          const hash = crypto.createHash('sha256').update(gzipped).digest('hex');
          const reqPath = `/assets/${assetFile}`;
          hashMap[reqPath] = hash;
          gzippedMap[hash] = gzipped;
          console.log(`  File: ${reqPath} -> Gzip SHA256: ${hash}`);
        }
      }
    }
  }

  console.log("2. Populating files...");
  const populateRes = await fetch(`https://firebasehosting.googleapis.com/v1beta1/${versionName}:populateFiles`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ files: hashMap })
  });

  const populateData = await populateRes.json();
  if (!populateRes.ok) {
    throw new Error(`Failed to populate files: ${JSON.stringify(populateData)}`);
  }

  const uploadUrl = populateData.uploadUrl;
  const uploadRequiredHashes = populateData.uploadRequiredHashes || [];
  console.log(`Upload URL: ${uploadUrl}`);
  console.log(`Required file uploads: ${uploadRequiredHashes.length} files.`);

  for (const hash of uploadRequiredHashes) {
    console.log(`  Uploading hash: ${hash}...`);
    const gzippedContent = gzippedMap[hash];

    const uploadRes = await fetch(`${uploadUrl}/${hash}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/octet-stream'
      },
      body: gzippedContent
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      throw new Error(`Failed to upload hash ${hash}: ${errText}`);
    }
    console.log(`  Uploaded ${hash} successfully.`);
  }

  console.log("3. Finalizing version...");
  const finalizeRes = await fetch(`https://firebasehosting.googleapis.com/v1beta1/${versionName}?updateMask=status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: 'FINALIZED' })
  });

  if (!finalizeRes.ok) {
    const errText = await finalizeRes.text();
    throw new Error(`Failed to finalize version: ${errText}`);
  }

  console.log("4. Creating release...");
  const releaseRes = await fetch(`https://firebasehosting.googleapis.com/v1beta1/projects/-/sites/${siteId}/releases?versionName=${versionName}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: 'Deployed successfully' })
  });

  const releaseData = await releaseRes.json();
  if (!releaseRes.ok) {
    throw new Error(`Failed to create release: ${JSON.stringify(releaseData)}`);
  }

  console.log("\n==========================================");
  console.log("🎉 DEPLOYMENT SUCCESSFUL!");
  console.log(`Site URL: https://${siteId}.web.app`);
  console.log(`Firebase App URL: https://${siteId}.firebaseapp.com`);
  console.log("==========================================");
}

deploy().catch(err => {
  console.error("DEPLOYMENT FAILED:", err);
  process.exit(1);
});
