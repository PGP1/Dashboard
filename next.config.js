const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    distDir: 'build',
    exportPathMap: () => ({
        '/': { page: '/' },
      }),
    assetPrefix: isProduction ? '/Dashboard' : '',
    publicRuntimeConfig: {
        // used in '/components/Link.js/', for more details go to the component itself
        linkPrefix: isProduction ? '/Dashboard' : ''
    }
}