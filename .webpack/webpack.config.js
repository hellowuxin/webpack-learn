const path = require('path')
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
      alias: {
        '@': path.resolve(__dirname, '../src')
      },
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
        {
          test: /\.less$/i,
          use: [
            // compiles Less to CSS
            'style-loader',
            'css-loader',
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                }
              }
            }
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // 将 JS 字符串生成为 style 节点
            'style-loader',
            // 将 CSS 转化成 CommonJS 模块
            'css-loader',
            // 将 Sass 编译成 CSS
            'sass-loader',
          ],
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