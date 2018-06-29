'use strict'
process.env.NODE_ENV = 'production'
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const prod = require('webpack-merge')(require('./conf'), {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  plugins: [
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: 'src/index.html'}),
  ]
})

process.stdout.write("Building...")
webpack(prod, (err, stats) => {
  process.stdout.write("\n")
  if (err) throw err
  process.stdout.write(stats.toString({colors: true, modules: false, children: false, chunks: false, chunkModules: false}) + '\n\n')
  if (stats.hasErrors()) {
    console.log('  Build failed with errors.\n')
    process.exit(1)
  }
})

