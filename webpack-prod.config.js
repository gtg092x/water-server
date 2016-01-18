var path = require('path');
var webpack = require('webpack');
var outDir = 'public';

module.exports = {
    devtool: 'source-map',
    entry: [
        './app/entry'
    ],
    output: {
        path: path.join(__dirname, outDir),
        filename: 'bundle.js',
        publicPath: '/' + outDir + '/'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.jsx$/,
                loader: 'babel',
                include: path.join(__dirname, 'app') },
            { test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/ },
            { test: /\.scss?$/,
                loader: 'style!css!sass',
                include: path.join(__dirname, 'style') },
        ]
    }
}