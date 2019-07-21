import webpack from 'webpack';

const HtmlWebPackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config: webpack.Configuration = {
    entry: './src',
    resolve: { extensions: ['.tsx', '.js'] },
    module: {
        rules: [
            { use: 'babel-loader', test: /\.(js|ts)(x?)$/ }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({ template: './src/index.html', filename: './index.html' }),
        // new BundleAnalyzerPlugin({})
    ]
};

module.exports = config;