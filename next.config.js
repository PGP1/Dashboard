const isProd = (process.env.NODE_ENV || 'production') === 'production'

module.exports = {
    distDir: 'build',
    exportPathMap: () => ({
        '/': { page: '/' },
      }),
    assetPrefix: isProd ? '/your-repository-name' : '',
}