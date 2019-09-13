const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const helpers = require('./helpers');
const ngtools = require('@ngtools/webpack');

const ENV = process.env.ENV = helpers.isDev ? 'development' : 'production';

let plugins = [];

module.exports = {
    mode: ENV,
    entry: {
        'app': './app/main.ts'
    },
    output:{
        path: helpers.root('../web/dist'),
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [ helpers.root("node_modules") ]
    },
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpg|png|ttf|eot|svg|mp3)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
            {
                test: /\.ico.png$/,
                use: [ "url-loader?mimetype=image/png" ]
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
                exclude: helpers.root('assets')
            },
            {
                test: /\.scss$/,
                use: [
                    'to-string-loader',
                    {
                        "loader": "css-loader",
                        "options": {
                            // "minimize": !helpers.isDev
                        }
                    },
                    'sass-loader'
                ],
                exclude: helpers.root('assets')
            },
            {
                test: /\.scss$/,
                
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        "loader":"css-loader",
                        "options": { 
                            // "minimize": !helpers.isDev
                        }
                    },
                    'sass-loader'
                ],
                include: helpers.root('assets')
            },
            {
                test: /\.(jade|pug)$/,
                use: ['html-loader?attrs=link:href img:src i:icon', 'pug-html-loader']
            }
        ]
    },

    plugins: [
        ...plugins,
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        new ngtools.AngularCompilerPlugin({
            tsConfigPath: helpers.root("tsconfig.json"),
            skipCodeGeneration: helpers.isDev,
            entryModule: helpers.root(
                "modules",
                "Application",
                "ApplicationModuleBrowser#ApplicationModuleBrowser"
            )
        }),

        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            /angular([\\\/])core([\\\/])@angular/,
            helpers.root('.'),
            {}
        ),

        new HtmlWebpackPlugin({
            template: 'app/template.pug'
        }),
    ],
    performance: {
        maxEntrypointSize: 20971520,
        maxAssetSize: 20971520
    }
};