const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js[x]?$/,
      loaders: ['babel'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loaders: ['style', 'css']
    }]
  }
}