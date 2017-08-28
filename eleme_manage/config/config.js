var path = require('path')

module.exports = {
    build : {
        env : require('./prod.env'),
        entry : './src/main.js',
        assetsPublicPath : '/',
        assetsRoot : path.resolve(__dirname, '../dist')
    },
    dev : {
        env : require('./dev.env'),
        port : 7878,
        autoOpenBrowser : true,
        assetsPublicPath : '/',
        assetsSubDirectory : 'src/assets'
    }
}
