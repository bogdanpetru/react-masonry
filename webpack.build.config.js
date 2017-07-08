const path = require('path')

module.exports = {
  entry: './src/examples/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'Masonry',
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  devtool: 'source-map',
  context: __dirname,
  target: 'web',
  stats: 'errors-only',
  // lets you precisely control what bundle information gets displayed
  devServer: {
    port: 1234,
  },
}
