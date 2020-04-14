var HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: __dirname + 'app/index.jsx',
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: [
                    /node_modules/,
                    /other_projects/
                ],
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        filename: 'transformed.js',
        path: __dirname + '/build'
    }
};
