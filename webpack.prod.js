const webpack = require("webpack"),
path = require("path"),
HtmlWebPackPlugin = require('html-webpack-plugin'),
{ CleanWebpackPlugin } = require('clean-webpack-plugin'),
CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
MiniCssExtractPlugin = require('mini-css-extract-plugin'),
TerserPlugin = require("terser-webpack-plugin")

module.exports = {
    entry: "./src/client/index.js",
    mode: 'development',
    devtool: 'hidden-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [new HtmlWebPackPlugin({
        template: './src/client/views/index.html',
        filename: './index.html'
    }),
    new MiniCssExtractPlugin({
        filename:'style.[contenthash].css'
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
    }),
    new MiniCssExtractPlugin()
],
    optimization: {
       minimizer : [
        new CssMinimizerPlugin(),
        new TerserPlugin()
       ],
       minimize: true,
    },
}