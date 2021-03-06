var webpack = require('webpack')
var config = require('./config')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var baseWebpackConfig = require('./webpack.conf.base')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// 自动刷新页面
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./config/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    devtool : '#eval-source-map',
    plugins : [
        new webpack.DefinePlugin({
            'process.env' : config.dev.env
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename : 'index.html',
            template : 'index.html',
            inject : true
        }),
        new FriendlyErrorsPlugin()
    ]
})
