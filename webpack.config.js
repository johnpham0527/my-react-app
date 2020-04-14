module.exports = {
    entry: __dirname + 'app/slideshow_index.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
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
