const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  target: 'node',

  // root file of the server app
  entry: './src/index.js',

  // output bundle file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  // exclude node_modules modules dependencies from bundle.js
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);