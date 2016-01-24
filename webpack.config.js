var path = require('path');
var webpack = require('webpack');
var outDir = 'public';
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var configBase = require('./webpack.config.base');
var _ = require('lodash');

module.exports = _.defaults({
    devtool: 'eval',

    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './app/entry'
    ],


    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('main.css',{allChunks: true})
    ]},
    configBase
)