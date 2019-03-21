const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'ts/index.ts'),
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolveLoader: {
    modules: [path.join(__dirname, '../node_modules')]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'jquery': path.join(__dirname, '../stubs/jquery.js')
    }
  }
};
