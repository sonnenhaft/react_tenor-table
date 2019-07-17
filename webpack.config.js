const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src',
  module: {
    rules: [
      { use: 'babel-loader', test: /\.js$/ }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({ template: './src/index.html', filename: './index.html' }),
    new BundleAnalyzerPlugin({})
  ]
};