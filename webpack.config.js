var path = require('path');
var webpack = require('webpack');
var outDir = 'build';
module.exports = {
    devtool: 'eval',

    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './app/entry'
    ],

    output: {
        path: path.join(__dirname, outDir),
        filename: 'bundle.js',
        publicPath: '/'+outDir+'/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            { test: /\.jsx$/,
                loader: 'react-hot!babel',
                include: path.join(__dirname, 'app') },
            { test: /\.js$/,
                loader: 'babel',
                include: path.join(__dirname, 'app') },
            { test: /\.scss?$/,
                loader: 'style!css!sass',
                include: path.join(__dirname, 'style') },
            { test: /\.css$/,
                loader: 'style!css' }
        ]
    }
}