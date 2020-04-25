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
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack'],
        });

        return config;
    },
    distDir: 'build',
    exportPathMap: () => ({
        '/': { page: '/' },
        '/register': { page: '/register' },
        '/login': { page: '/login' },
        '/device': { page: '/device' },
        '/dashboard': { page: '/dashboard' }
    }),
    assetPrefix: isProduction ? '/Dashboard' : '',
    publicRuntimeConfig: {
        // used in '/components/Link.js/', for more details go to the component itself
        linkPrefix: isProduction ? '/Dashboard' : ''
    }
}
