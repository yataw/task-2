const path = require('path');

module.exports = {
    entry: './index.js',
    mode: 'development',
    watch: true,
    devtool: 'inline-source-map',
    output: {
        filename: 'linter.js',
        path: path.resolve(__dirname, 'dev'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx'
        ]
    }
};