/**
 * Provides Webpack configuration for the project.
 * @author  Isha CHopde
 */
const path = require("path");
module.exports = {
    entry: "./src/client/index.tsx",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/"
    },
    devtool: "source-map",
    resolve: {
        modules: ['src/client', 'node_modules'],
        extensions: [".js", ".ts", ".tsx", ".json"]
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: [
                    "node_modules"
                ]
            },
            {
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [{
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader'
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
        ]
    }
};