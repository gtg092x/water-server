var path = require('path');
var webpack = require('webpack');
var outDir = 'public';
var configBase = require('./webpack.config.base');
var _ = require('lodash');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = _.defaults({
    devtool: 'source-map',
    entry: [
        './app/entry'
    ],
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('main.css', { allChunks: true }),
    ],
        module: {
            loaders: [
                { test: /\.jsx?$/,
                    loader: 'babel',
                    include: path.join(__dirname, 'app') },
                { test: /\.jsx?$/,
                    loader: 'babel',
                    include: path.join(__dirname, 'app') },
                { test: /\.json?$/, exclude: /(node_modules|bower_components)/, loader: 'json' }, // JSON FILES
                {
                    test: /(\.scss|\.css)$/,
                    loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox')
                },
                { test: /\.(jpe?g|png|gif|svg)$/i, exclude: /(node_modules|bower_components)/, loader: 'url?limit=1000&name=images/[hash].[ext]' } // IMAGES
            ]
        }
    },

    configBase)