const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src',
  module: {
    rules: [
      { use: 'babel-loader', test: /\.js$/ }
    ]
  },
  plugins: [new HtmlWebPackPlugin({ template: './src/index.html', filename: './index.html' })]
};