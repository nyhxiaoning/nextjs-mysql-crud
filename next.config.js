module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/emails',
        permanent: true
      }
    ]
  }
}
