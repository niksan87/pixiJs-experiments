const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const outputNameFormat = '[name].[hash:6]';

module.exports = {
    mode: 'development',
    entry: [path.resolve(__dirname, 'src/main'), path.resolve(__dirname, 'src/styles')],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `${outputNameFormat}.js`
    },
    optimization: {
        splitChunks: {
            chunks: 'async'
        }
    },
    devServer: {
        // stats: {
        //     all: false,
        //     timings: true
        // },
        stats: 'errors-only',
        host: process.env.HOST,
        port: 9000, //process.env.PORT,
        open: false,
        overlay: true
    },
    resolve: {
        extensions: ['.mjs', '.js', '.ts', '.css', '.svelte'],
        alias: {
            '@modules': path.resolve(__dirname, './src/modules/index'),
            '@shared': path.resolve(__dirname, './src/shared/index')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Webpack.HashedModuleIdsPlugin(),
        new Webpack.ProvidePlugin({
            PIXI: path.resolve(__dirname, './node_modules/pixi.js'),
            gsap: [path.resolve(__dirname, './node_modules/gsap'), 'default']
        }),
        new MiniCssExtractPlugin({
            filename: `${outputNameFormat}.css`
        }),
        new HtmlWebpackPlugin({
            title: 'pixiJs-experiments'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                include: [path.resolve(__dirname, 'src')],
                loaders: ['babel-loader']
            },
            {
                test: /\.svelte$/,
                include: [path.resolve(__dirname, 'src')],
                loaders: ['svelte-loader-hot']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    }
};
