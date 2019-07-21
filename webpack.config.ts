import webpack from 'webpack'

const HtmlWebPackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

interface SystemEnvVariables {
    mode: string
}

module.exports = (ignored: any, env: SystemEnvVariables): webpack.Configuration => ({
    entry: './src',
    resolve: { extensions: ['.tsx', '.js'] },
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
        ...(env.mode === 'production' ? [] : [new BundleAnalyzerPlugin({})])
    ]
})