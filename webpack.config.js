const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists
const nodeExternals = require('webpack-node-externals');

const getEnvKeys = (ENVIRONMENT) => {
    const currentPath = path.join(__dirname);
    const basePath = currentPath + '/.env';
    const envPath = basePath + '.' + ENVIRONMENT;
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;
    const fileEnv = dotenv.config({path: finalPath}).parsed;

    return Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});
};


const clientConfig = ({ENVIRONMENT}) => {
    console.log('START CLIENT');

    return {
        context: path.join(__dirname, 'src'),
        entry: './index.js',

        devtool: "source-map",

        output: {
            filename: "bundle.js",
            path: path.join(__dirname, 'dist/public'),
        },

        resolve: {
            extensions: ['.jsx', '.js'],
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src/index.html'),
                filename: path.join(__dirname, 'dist/public/index.html'),
            }),
            new webpack.DefinePlugin({...getEnvKeys(ENVIRONMENT)})
        ],

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    enforce: 'pre',
                    use: {
                        loader: 'prettier-loader',
                    }
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                modules: {
                                    mode: 'local',
                                    localIdentName: '[path][name]__[local]--[hash:base64:5]',
                                    context: path.resolve(__dirname, 'src'),
                                },
                            }
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: ["file-loader"]
                }
            ]
        },

        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            https: true,
            //     compress: true,
            watchContentBase: true,
            //     progress: true,
            open: true
        },
        //
        // watch: false,
    }
};

module.exports = [clientConfig];