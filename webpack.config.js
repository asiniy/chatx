const path  = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: path.join(__dirname, 'frontend', 'src', 'app.js'),
  output: {
    path: path.join(__dirname, 'frontend', 'build'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
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
