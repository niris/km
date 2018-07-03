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
    chunkFilename: '[id].[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
//      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'src/index.html'
    }),
  ]
})

require('rimraf')(path.resolve(__dirname, '../dist'), err => {
  if (err) throw err
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
})
