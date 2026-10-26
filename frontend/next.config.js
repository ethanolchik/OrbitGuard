const path = require('path');

const defaultDistDir = process.env.NODE_ENV === 'production' ? '.next' : '.next-local';
let configuredDistDir = process.env.NEXT_DIST_DIR || defaultDistDir;
if (path.isAbsolute(configuredDistDir)) {
  configuredDistDir = defaultDistDir;
}
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  distDir: configuredDistDir,
  output: isGitHubPages ? 'export' : 'standalone',
  trailingSlash: isGitHubPages,
};

module.exports = nextConfig;
