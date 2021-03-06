const path = require('path');

module.exports = {
    entry: {
        app: './src/main.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist/static'),
        publicPath: '/static/',
        filename: '[name].js',
    },
    resolve: {
        root: path.resolve(__dirname),
        extensions: ['', '.js', '.vue'],
        alias: {
            base: path.resolve(__dirname, '../src'),
            component: path.resolve(__dirname, '../src/components'),
            store: path.resolve(__dirname, '../src/vuex'),
            api: path.resolve(__dirname, '../src/api'),
            page: path.resolve(__dirname, '../src/pages'),
        },
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue',
            },
            {
                test: /\.js$/,
                loader: 'babel!eslint',
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash:7]',
                },
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass',
            },
        ],
    },
    vue: {
        loaders: {
            js: 'babel!eslint',
        },
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, '../src/css')],
    },
    eslint: {
        formatter: require('eslint-friendly-formatter'),
    },
};
