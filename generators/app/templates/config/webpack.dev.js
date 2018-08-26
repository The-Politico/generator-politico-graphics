const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const portfinder = require('portfinder');

portfinder.basePort = 3000;

const config = (env, argv, port) => ({
  mode: 'development',
  entry: {
    app: [
      '@babel/polyfill',
      path.resolve(process.cwd(), 'src/js/demo/App.jsx'),
    ],
  },
  devServer: {
    compress: true,
    port,
    open: true,
    contentBase: path.resolve(process.cwd(), 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                'targets': {
                  'browsers': 'last 2 versions',
                },
              }],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/proposal-class-properties',
            ],
          },
        },
      }, {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      }, {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeComments: false,
              collapseWhitespace: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'src/index.html'),
      filename: 'index.html',
      chunks: ['app'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/style.css',
    }),
  ],
});

module.exports = (env, argv) =>
  portfinder.getPortPromise()
    .then(port => config(env, argv, port));
