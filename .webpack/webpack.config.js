const HtmlWebpackPlugin = require('html-webpack-plugin');
// 配置
const devConfig = require('./dev')
const prodConfig = require('./prod')

module.exports = (env) => {
  const config = env.prod ? prodConfig : devConfig

  return {
    entry: './src/main',
    devtool: 'eval-cheap-module-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '...']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    ...config
  }
}