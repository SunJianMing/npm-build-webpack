process.env.NODE_ENV = 'production';
const { merge } = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssnano = require('cssnano');

const baseConfig = require('./webpack.base');

const proConfig = {
  mode: process.env.NODE_ENV,
  devtool: 'none',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:5].css',
      chunkFilename: '[id].css',
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /\/node_modules\//,
          priority: -10,
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: -20,
        },
      },
    },
  },
};

module.exports = merge(baseConfig, proConfig);
