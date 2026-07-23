import client from 'file:///C:/Users/Ruveen/AppData/Roaming/npm/node_modules/firebase-tools/lib/index.js';

async function main() {
  try {
    console.log("Deploying hosting to Firebase project business-landing-web...");
    await client.deploy({
      project: 'business-landing-web',
      only: 'hosting',
      cwd: process.cwd()
    });
    console.log("FIREBASE_DEPLOY_SUCCESS");
  } catch (err) {
    console.error("FIREBASE_DEPLOY_ERROR:", err);
    process.exit(1);
  }
}

main();
