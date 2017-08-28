var path = require('path');

module.exports = {
    build : {
        env : require('./prod.env'),
        index : path.resolve(__dirname, '../dist/index.html'),
        assetsPublicPath : '/',
        assetsRoot : path.resolve(__dirname, '../dist')
    },
    dev : {
        env : require('./dev.env'),
        port : '8080',
        autoOpenBrowser : true,
        assetsPublicPath : '/',
        assetsSubDirectory : 'src/assets'
    }
}
