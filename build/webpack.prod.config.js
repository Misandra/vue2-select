const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.config.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
   entry: '@/app.js',
   output: {
      path: path.resolve(__dirname, '..', 'dist'),
      filename: 'vue2-select.js',
      library: 'v2-select',
      libraryTarget: 'umd',
      globalObject: 'typeof self !== \'undefined\' ? self : this',
   },
   externals: {
      'vue': 'Vue'
   },
   performance: {
      hints: false
   },
   optimization: {
      minimizer: [
         new TerserPlugin({
            sourceMap: true,
         }),
      ],
   }
});