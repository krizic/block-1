const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
entry: './src/index.js',
mode: "development",
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
},
plugins: [
    new HtmlWebpackPlugin({
        template: "index.html"
    })
],
module: {
    rules: [
        {
            test: /\.js$/, //using regex to tell babel exactly what files to transcompile
            exclude: /node_modules/, // files to be ignored
            use: {
                loader: 'babel-loader' // specify the loader
            } 
        }
    ]
}
}