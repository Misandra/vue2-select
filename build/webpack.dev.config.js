const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.config.js');

module.exports = merge(baseWebpackConfig, {
    entry: {
        app: ['@babel/polyfill', './dev/script.js']
    },
    output: {
        path: path.resolve(__dirname, '../dev'),
        filename: 'build.js'
    },
    externals: {
        'vue': 'Vue'
    },
    devServer: {
        historyApiFallback: {
            index: './dev/index.html'
        },
        noInfo: true,
        port: 8000
    },
    performance: {
        hints: false
    },
    devtool: 'source-map'
});