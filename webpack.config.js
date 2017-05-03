var path = require('path');

module.exports = {
    entry: "./scripts/imports.js",
    output: {
        path: "./",
        filename: "godwin.js",
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: "file-loader?name=assets/[path][name].[ext]"
            },
            {
                test: /\.(woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=assets/[path][name].[ext]"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=assets/[path][name].[ext]"
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)(\?v=3.0.0-alpha.3)?$/,
                loader: "file-loader?name=assets/[path][name].[ext]"
            },
            {
                test: /jquery-mousewheel/,
                loader: "imports?define=>false&this=>window"
            },
            {
                test: /malihu-custom-scrollbar-plugin/,
                loader: "imports?define=>false&this=>window"
            }
        ]
    }
}