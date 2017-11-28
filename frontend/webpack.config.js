const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'app.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new LiveReloadPlugin({
      protocol: 'http',
      hostname: 'localhost',
      port: 35729,
    }),
  ],

};
