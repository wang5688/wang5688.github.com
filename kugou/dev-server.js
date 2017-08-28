var open = require('opn') // 打开浏览器
var path = require('path')
var webpack = require('webpack')
var express = require('express')
var config = require('./src/config/config')
var webpackConfig = require('./src/config/webpack.dev.conf') // webpack配置文件
var URL = require('url');

// 本地数据
var appData = require('./src/common/data/rank.json');

// 默认开发环境
if(!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
// 端口
var port = config.dev.port
// 自动打开页面
var autoOpenBrowser = config.dev.autoOpenBrowser
// 接口路由
var apiRoutes = express.Router();
var app = express();

// 配置接口
apiRoutes.get('/rank', function(req, res) {
    res.json(appData);
});
apiRoutes.get('/news', function(req, res) {
    res.json(require('./src/common/data/new_music.json'))
})
// 排行list
apiRoutes.get('/rank/28', function(req, res) {
    res.json(require('./src/common/data/american_new.json'))
})
apiRoutes.get('/rank/27', function(req, res) {
    res.json(require('./src/common/data/china_new.json'))
})
apiRoutes.get('/rank/24971', function(req, res) {
    res.json(require('./src/common/data/dj_hot.json'))
})
apiRoutes.get('/rank/22050', function(req, res) {
    res.json(require('./src/common/data/hongkang_new.json'))
})
apiRoutes.get('/rank/6666', function(req, res) {
    res.json(require('./src/common/data/hot.json'))
})
apiRoutes.get('/rank/23784', function(req, res) {
    res.json(require('./src/common/data/internet_hot.json'))
})
apiRoutes.get('/rank/24047', function(req, res) {
    res.json(require('./src/common/data/japan_new.json'))
})
apiRoutes.get('/rank/24045', function(req, res) {
    res.json(require('./src/common/data/korea_new.json'))
})
apiRoutes.get('/rank/8888', function(req, res) {
    res.json(require('./src/common/data/top500.json'))
})
apiRoutes.get('/rank/21101', function(req, res) {
    res.json(require('./src/common/data/vivo.json'))
})
apiRoutes.get('/rank/28653', function(req, res) {
    res.json(require('./src/common/data/yuangchuang.json'))
})
apiRoutes.get('/rank/29951', function(req, res) {
    res.json(require('./src/common/data/selling.json'))
})
// 歌单内
apiRoutes.get('/list/item', function(req, res) {
    res.json(require('./src/common/data/list_item.json'))
})
//歌单
apiRoutes.get('/list/song_list', function(req, res) {
    res.json(require('./src/common/data/song_list.json'))
})
apiRoutes.get('/list/recomand', function(req, res) {
    res.json(require('./src/common/data/recomand_list.json'))
})
// 歌手
apiRoutes.get('/singer', function(req, res) {
    res.json(require('./src/common/data/singer.json'))
})
// 搜索
apiRoutes.get('/search', function(req, res) {
    res.json(require('./src/common/data/search.json'))
})


app.use('/api', apiRoutes)

// 配置webpack
var compiler = webpack(webpackConfig);

// 热更新
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath : webpackConfig.output.publicPath,
    quiet : true
})
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log : () => {}
})

// html热更新
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(devMiddleware)
app.use(hotMiddleware)

// 静态文件地址
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./src/assets'))

// 地址
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
    module.hot.accept();
}

var server = app.listen(port)

module.exports = {
    ready : readyPromise,
    close : () => {
        server.close()
    }
}
