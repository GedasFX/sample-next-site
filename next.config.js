const withPlugins = require('next-compose-plugins');

const bundleAnalyzerPlugin = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const runtimeCaching = require('next-pwa/cache');
const pwaPlugin = require('next-pwa');
const pwaConfig = {
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
    publicExcludes: [],
  },
}

const redirects = {
  // Redirect Error pages (including 404) to main page.
  async redirects() {
    return [
      {
        source: '/_error',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = withPlugins([
  [redirects],
  [pwaPlugin, pwaConfig],
  [bundleAnalyzerPlugin],
]);
