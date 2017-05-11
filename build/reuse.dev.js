/* eslint-disable */
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const notify = require('webpack-notifier');
const WebpackMd5Hash = require('webpack-md5-hash');
const AssetsPlugin = require('assets-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractReuseCss = new ExtractTextPlugin('../css/reuse-form.css');
const ExtractReuseLess = new ExtractTextPlugin('../css/reuse-form-two.css');


const paths = require('./paths');
const commonConfig = require('./base');

module.exports = function(env) {
  return webpackMerge(commonConfig(), {
    devtool: 'cheap-module-eval-source-map',
    entry: {
      'reuse': paths.appSrc + '/reuse-form/index.js',
    },
    output: {
      path: paths.appDest,
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    },
    module: {
      rules:[
        {
          test: /\.css$/,
          use: ExtractReuseCss.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          }),
        },
        {
          test: /\.less$/,
          use: ExtractReuseLess.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
              'less-loader?outputStyle=expanded&sourceMap',
            ]
          }),
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify('dev'),
      }),
      ExtractReuseCss,
      ExtractReuseLess,
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'reuse_vendor.js',
        minChunks: function (module) {
           // this assumes your vendor imports exist in the node_modules directory
           return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),
      new CaseSensitivePathsPlugin(),
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      new AssetsPlugin({ fullPath: false, prettyPrint: true, filename: './resource/reuse.json'}),
      new notify({ title: 'Webpack', sound: 'Glass' }),
    ]
  });
}
