const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  entry: './src/components',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.tsx', '.ts', '...']
  },
  plugins: [new MiniCssExtractPlugin()],
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
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    library: {
      name: 'DoveDesign',
      type: 'umd'
    },
  },
  externals: ['react'],
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
    },
  },
};