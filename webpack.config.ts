import { Configuration } from 'webpack';

const HtmlWebPackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

interface SystemEnvVariables {
  mode: string
}

module.exports = (ignored: any, env: SystemEnvVariables): Configuration => ({
  entry: './src',
  resolve: { extensions: ['.tsx', '.ts', '.js', '.jsx'] },
  module: {
    rules: [
      { use: 'babel-loader', test: /\.(js|ts)(x?)$/ }
    ]
  },
  output: {
    path: require('path').resolve(__dirname, 'docs'),
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebPackPlugin({ template: './src/index.html', filename: './index.html' }),
    ...(
      env.mode === 'production'
        ? [] :
        [new BundleAnalyzerPlugin({ openAnalyzer: false })]
    )
  ]
});