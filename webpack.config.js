const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        contentEditor: '/src/web/contentEditor.ts'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.less$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['contentEditor'],
            template: path.join(__dirname, 'src', 'web', 'contentEditor.html')
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: './node_modules/ace-builds/src-min-noconflict',
                    to: './js/ace'
                }
            ]
        })
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        watchFiles: ['src/**/*'],
        port: 9000
    },
    mode: 'development'
}