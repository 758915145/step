const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config.js')
module.exports = merge(baseWebpackConfig, {
    output: {
        publicPath: "/dist/"
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, "../"),
        hot: true,
        quiet: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})