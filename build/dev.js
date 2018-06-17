'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {},
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {},
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '8080',
    open: false,
    overlay: { warnings: true, errors: true },
    proxy: {'/api': 'http://localhost:3200'},
    quiet: true,
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"development"'}}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({template: 'src/index.html'}),
  ]
})

portfinder.basePort = devWebpackConfig.devServer.port
module.exports = portfinder.getPortPromise().then(port => {
  devWebpackConfig.devServer.port = port;
  devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [`App Running on http://${devWebpackConfig.devServer.host}:${devWebpackConfig.devServer.port}`],
    }
  }))
  return devWebpackConfig;
})

