const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const env = process.env.NODE_ENV === 'production'
   ? 'production'
   : 'development';

const devtool = env === 'production' ? 'source-map' : 'eval-source-map';

module.exports = {
   mode: env,
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.join(__dirname, '..', 'dist'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devtool,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env,
        }),
        new VueLoaderPlugin()
    ],
    stats: {
        children: false,
        modules: false,
    },
};