const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: './dist',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

};