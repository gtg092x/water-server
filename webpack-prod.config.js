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
    ]},
    configBase)