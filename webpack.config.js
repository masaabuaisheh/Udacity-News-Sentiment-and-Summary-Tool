const webpack = require("webpack"),
path = require("path"),
HtmlWebPackPlugin = require('html-webpack-plugin'),
{ CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/client/index.js",
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [new HtmlWebPackPlugin({
        template: './src/client/views/index.html',
        filename: './index.html'
    }),
    new CleanWebpackPlugin({
        // For development use only
        // Simulate the removal of files
        dry: true,
        // Write logs to console
        verbose: true,
        // Automatically remove all unused webpack assets on rebuild
        cleanStaleWebpackAssets: true,
        protectWebpackAssets: false
    })],
}