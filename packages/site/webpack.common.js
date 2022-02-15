const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin')
module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(tsx|jsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=10000', 'img-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new VanillaExtractPlugin(),
  ],
}
