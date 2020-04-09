const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    webpackDevMiddleware(config) {
        config.watchOptions = {
            ignored: [
                /\.git\//,
                /\.next\//,
                /node_modules/
            ]
        }
        return config;
    },
    distDir: 'build',
    exportPathMap: () => ({
        '/': { page: '/' },
        '/register': { page: '/register' },
        '/login' : { page: '/login' },
        '/device' : { page: '/device '}
    }),
    assetPrefix: isProduction ? '/Dashboard' : '',
    publicRuntimeConfig: {
        // used in '/components/Link.js/', for more details go to the component itself
        linkPrefix: isProduction ? '/Dashboard' : ''
    }
}
