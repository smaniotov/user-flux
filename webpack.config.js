const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  devtool: '#source-map',
  entry: {
    index: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['src', 'node_modules']
  },
  externals: [nodeExternals()],
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  optimization: {
    minimize: false
  }
};
