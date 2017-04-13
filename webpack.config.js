var path = require('path');

module.exports = {
    entry: "./scripts/imports.js",
    output: {
        path: "./",
        filename: "godwin.js"
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|eot|woff2|woff|svg|ttf)$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /jquery-mousewheel/,
                loader: "imports?define=>false&this=>window"
            }
        ]
    }
}