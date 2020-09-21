process.env.NODE_ENV = 'development';
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: process.env.NODE_ENV,
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
  },
};

module.exports = merge(baseConfig, devConfig);
