import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const sub = (process.env.VITE_PROJECT_SUBDOMAIN || '').trim();
const domain = (process.env.VITE_PROJECT_DOMAIN || '').trim();
const projectUrl = domain ? `${sub ? sub + '.' : ''}${domain}` : '';

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

// Clear old files if they exist
function clearPublicFile(filename) {
  const filePath = path.join(publicDir, filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

// Generate _redirects
function generateRedirects() {
  if (!projectUrl) return;
  const content = `https://${sub ? sub : 'www'}.${domain}/* https://${sub ? sub : 'www'}.${domain}/:splat 301!\n`;
  fs.writeFileSync(path.join(publicDir, '_redirects'), content);
  console.log('Generated _redirects');
}

// Generate robots.txt
function generateRobots() {
  if (!projectUrl) return;
  const lines = [
    '# Disallow all crawling (private site)',
    'User-agent: *',
    'Disallow: /',
    `# Sitemap: ${projectUrl}/sitemap.xml`,
    ''
  ];
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), lines.join('\n'));
  console.log('Generated robots.txt');
}

// Main execution
// Always clear existing files
clearPublicFile('_redirects');
clearPublicFile('robots.txt');

if (projectUrl) {
  generateRedirects();
  generateRobots();
} else {
  console.log('No domain configured; skipped generation of _redirects and robots.txt.');
}
