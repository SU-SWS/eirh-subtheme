
const path = require("path");
const Webpack = require("webpack");
const autoprefixer = require('autoprefixer')({ grid: true });
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ignoreEmitPlugin = require('ignore-emit-webpack-plugin');

const config = {
  isProd: process.env.NODE_ENV === "production",
  hmrEnabled: process.env.NODE_ENV !== "production" && !process.env.NO_HMR,
  distFolder: path.resolve(__dirname, "./dist/css"),
  wdsPort: 3001,
};

var webpackConfig = {
  entry: {
    "main": ["./src/scss/main.scss"],
    "ckeditor5": ["./src/scss/ckeditor5.scss"]
  },
  output: {
    path: config.distFolder,
    filename: '[name].js',
    assetModuleFilename: '../assets/[name][ext][query]'
  },
  mode: config.isProd ? "production" : "development",
  resolve: {
    alias: {
      'decanter-assets': path.resolve('node_modules', 'decanter/core/src/img'),
      'decanter-src': path.resolve('node_modules', 'decanter/core/src'),
      '@fortawesome': path.resolve('node_modules', '@fortawesome'),
      'fa-fonts': path.resolve('node_modules', '@fortawesome/fontawesome-free/webfonts')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new Webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer
        ]
      }
    }),
    new ignoreEmitPlugin(['ckeditor5.js', 'main.js'])
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          'sass-loader',
        ],
      },
    ],
  },
};

module.exports = webpackConfig;
