module.exports = {
  // Redirect Error pages (including 404) to main page.
  async redirects() {
    return [
      {
        source: '/_error',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
