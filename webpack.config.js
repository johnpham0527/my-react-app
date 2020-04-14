module.exports = {
    entry: __dirname + 'app/slideshow_index.js',
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
