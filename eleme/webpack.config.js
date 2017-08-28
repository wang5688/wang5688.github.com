var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry : './src/main.js',
    output : {
        path : path.resolve(__dirname, './dist'),
        publicPath : '/dist/',
        filename : 'bundle.js'
    },
    module : {
        loaders : [
            {
                test : /\.js$/, loader : 'babel-loader', exclude : /node_modules/
            },
            {
                test : /\.vue$/, loader : 'vue-loader'
            },
            {
                test : /\.(png|jpg|gif)$/,
                loader : 'url-loader?limit=8192'
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
        alias : {
            'vue$' : 'vue/dist/vue.esm.js',
            'assets' : path.resolve(__dirname, './src/assets')
        }
    },
    devServer : {
        historyApiFallback : true,
        noInfo : true,
        inline : true,
        port : '5002'
    },
    performance : {
        hints : false
    },
    devtool : '#eval-source-map'
}

if(process.env.NODE_ENV == 'production') {
    moduel.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env' : {
                NODE_ENV : 'production'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap : true,
            compress : {
                warnings : false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize : true
        })
    ])
}
