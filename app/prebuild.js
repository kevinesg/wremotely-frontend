import { Storage } from '@google-cloud/storage';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert __filename and __dirname to work with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse the service account key from the environment variable
const serviceAccountKey = JSON.parse(process.env.VITE_GCLOUD_KEYFILE);

async function downloadData() {
  // Configure your GCS client; credentials can be provided via environment variables
  const storage = new Storage({
    projectId: process.env.VITE_GCLOUD_PROJECT,
    credentials: serviceAccountKey,
  });
  const bucketName = process.env.VITE_GCLOUD_BUCKET;
  const srcFilename = 'article_data.json';
  const destPath = path.join(__dirname, 'data', 'content.json');

  await storage.bucket(bucketName).file(srcFilename).download({ destination: destPath });
  console.log(`Downloaded ${srcFilename} to ${destPath}.`);
}

downloadData().catch(err => {
  console.error('Error downloading data:', err);
  process.exit(1);
});