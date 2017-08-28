var webpack = require('webpack')
var express = require('express')
var open = require('opn')
var path = require('path')
var config = require('./config/config')
var webpackConfig = require('./config/webpack.conf.dev')

// 本地数据
var appData = require('./src/data.json');

// 默认开发环境
if(!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// 端口
var port = config.dev.port

var autoOpenBrowser = config.dev.autoOpenBrowser

// 接口路由
var apiRoutes = express.Router();
var app = express();

apiRoutes.get('/elm', function(req, res) {
    res.json({
        errno : 0,
        data : appData
    })
})

apiRoutes.get('/seller', function(req, res) {
    res.json({
        errno : 0,
        data : appData.seller
    })
})

apiRoutes.get('/goods', function(req, res) {
    res.json({
        errno : 0,
        data : appData.goods
    })
})

apiRoutes.get('/ratings', function(req, res) {
    res.json({
        errno : 0,
        data : appData.ratings
    })
})

app.use('/api', apiRoutes);

// webpack
var compiler = webpack(webpackConfig);

//热更新
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath : webpackConfig.output.publicPath,
    quiet : true
})
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log : () => {}
})
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({action : 'reload'})
        cb()
    })
})

app.use(devMiddleware)
app.use(hotMiddleware)

// 静态文件地址
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./src/assets'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
    console.log('NODE_ENV : ' + process.env.NODE_ENV)
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if(autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        open(uri)
        _resolve()
    }
})

if(module.hot) {
    module.hot.accept()
}

var server = app.listen(port)

module.exports = {
    ready : readyPromise,
    close : () => {
        server.close()
    }
}
