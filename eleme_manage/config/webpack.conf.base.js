var webpack = require('webpack')
var path = require('path')
var config = require('./config')

module.exports = {
    entry : {
        app : './src/main.js'
    },
    output : {
        path : config.build.assetsRoot,
        filename : 'bundle.js',
        publicPath : '/'
    },
    module : {
        loaders : [
            {
                test : /\.js$/, loader : 'babel-loader', exclude : /node_modules/, query : { presets : ['es2015'] }
            },
            {
                test : /\.vue$/, loader : 'vue-loader'
            },
            {
                test : /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader : 'file-loader',
                query : {
                  name: '[name].[ext]?[hash]'
                }
            },
            {
                test : /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader : 'file-loader'
            },
            {
                test : /\.css$/ , loader : 'style-loader!css-loader'
            },
            {
                test : /\.scss$/, loader : 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    resolve : {
        extensions : ['.js', '.vue', '.json'],
        alias : {
            'vue$' : 'vue/dist/vue.esm.js'
        }
    }
}
