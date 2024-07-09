import path from 'path';
import { fileURLToPath } from 'url';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const publicPath = process.env.PUBLIC_PATH || '/';

export default {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    filename: isProduction ? 'bundle.[name].[contenthash].js' : 'bundle.[name].js',
    path: path.resolve(__dirname, 'public/js'),
    publicPath: publicPath  // Utiliser la variable d'environnement pour configurer publicPath
  },
  resolve: {
    alias: {
      wasm: path.resolve(__dirname, 'public/wasm/')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            sourceMaps: true
          }
        }
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'node_modules/materialize-css/dist/css/materialize.min.css', to: '../css/materialize.min.css' },
        { from: 'node_modules/materialize-css/dist/js/materialize.min.js', to: 'materialize.min.js' },
        { from: 'src/custom.css', to: '../css/custom.css' },
        { from: 'public/wasm', to: 'wasm' }
      ],
    }),
    new MonacoWebpackPlugin({
      languages: ['c']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: path.resolve(__dirname, 'public/index.html'),  // Générer index.html dans le répertoire public
      minify: isProduction ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      } : false
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
      setImmediate: ['setimmediate', 'setImmediate']
    }),
    ...(isProduction ? [new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    })] : [])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
  },
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/',
    },
    compress: true,
    port: 9000,
    hot: true,
    open: false,
    historyApiFallback: true,
  },
};
