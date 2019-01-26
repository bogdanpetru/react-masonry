var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/lib/index.js'),
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'index.js',
    library: '',
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
