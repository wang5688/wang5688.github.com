var path = require('path')
var config = require('./config')

function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}

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
                test : /\.js$/,
                loader : 'babel-loader',
                exclude : /node_modules/,
                query : {
                    presets : ['es2015']
                }
            },
            {
                test : /\.vue$/, loader : 'vue-loader'
            },
            {
                test : /\.(png|jpg|gif)$/, loader : 'url-loader?limit=8192'
            },
            {
                test : /\.css$/, loader : 'style-loader!css-loader'
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
