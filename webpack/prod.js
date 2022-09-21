const path = require('path');
const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const deadCodePlugin = require('webpack-deadcode-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const shareable = require('./shareable');

const htmlMinify = {
  removeComments: true,
  preserveLineBreaks: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true
};

module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve('src', 'index.jsx')
  },
  output: {
    filename: 'js/[name]_[contenthash].js',
    path: path.resolve('dist'),
    publicPath: ''
  },
  ...shareable,
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        include: /src/
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCss.loader,
            options: {
              esModule: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64:5]'
              }
            }
          },
          'postcss-loader',
          'stylus-loader'
        ],
        include: /src/
      }
    ]
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin()
    ],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          name: 'vendors',
          test: /node_modules/,
          maxSize: 150000,
          chunks: 'initial'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      APP_ENV: JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['app', 'runtime'],
      filename: 'index.html',
      template: path.resolve('templates', 'index.html'),
      minify: { ...htmlMinify }
    }),
    new MiniCss({ filename: 'css/[name]_[contenthash].css', ignoreOrder: true }),
    new deadCodePlugin({
      patterns: ['src/**/*.*'],
      failOnHint: true
    })
  ]
};
