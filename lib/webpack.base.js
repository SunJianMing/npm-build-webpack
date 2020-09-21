const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const glob = require('glob');
const webpack = require('webpack');

const projectRoot = process.cwd();
const isDevelop = process.env.NODE_ENV === 'development' ? 'style-loader' : {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: '../',
  },
};
function setMPA() {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/views/**/index.js'));
  entryFiles.forEach((file) => {
    file.match(/src\/views\/(.+?)\/index.js$/);
    entry[RegExp.$1] = file;
    htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: path.join(projectRoot, `./src/views/${RegExp.$1}/index.html`),
      filename: `${RegExp.$1}.html`,
      chunks: ['vendors', 'commons', RegExp.$1],
      inject: true,
      minify: {
        html5: true,
        minifyCss: true,
        minifyJs: true,
        collapseWhitespace: true,
        removeComments: false,
      },
    }));
  });
  return { entry, htmlWebpackPlugins };
}
const { entry, htmlWebpackPlugins } = setMPA();
module.exports = {
  entry,
  output: {
    filename: 'js/[name]_[chunkhash:5].js',
    path: path.resolve(projectRoot, './dist'),
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
    }, {
      test: /\.(le|c)ss$/,
      use: [
        isDevelop,
        'css-loader',
        'less-loader',
        'postcss-loader',
      ],
    }, {
      test: /\.(png|jpe?g|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 9082,
          name: 'img/[name]_[hash:8].[ext]',
        },
      }],
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'fonts/[name]_[hash:8].[ext]',
        },
      }],
    }],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only',
};
