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
const paths = require('./paths');
const commonConfig = require('./base');


const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractAdminCss = new ExtractTextPlugin('../css/reactive-admin.css');
const ExtractAdminLess = new ExtractTextPlugin('../css/reactive-admin-two.css');


const fileNames = ['googleMapSettings'];
const entries = {};

fileNames.forEach((fileName) => {
  entries[`lgm_${fileName}`] =  `${paths.appSrc}/${fileName}.js`;
});


module.exports = function(env) {
  return webpackMerge(commonConfig(), {
    // devtool: 'cheap-module-eval-source-map',
    entry: entries,
    output: {
      path: paths.appDest,
      filename: '[name]_[chunkhash:6].js',
      chunkFilename: '[name].[chunkhash:6].chunk.js',
    },
    module: {
      rules:[
        {
          test: /\.css$/,
          use: ExtractAdminCss.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          }),
        },
        {
          test: /\.less$/,
          use: ExtractAdminLess.extract({
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
      ExtractAdminCss,
      ExtractAdminLess,
      new WebpackMd5Hash(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false,
        __REACT_PERF__: false
      }),
      new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          mangle: {
              screw_ie8: true,
              keep_fnames: true
          },
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            screw_ie8: true,
            warnings: false
          },
          comments: false,
          sourceMap: true
      }),
      new CaseSensitivePathsPlugin(),
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      new AssetsPlugin({ fullPath: false, prettyPrint: true, filename: './resource/admin-assets.json'}),
      // new OfflinePlugin({
      //   publicPath: '/wp-content/plugins/reactivepro/assets/dist/js/', // need to change that. // runtime-template
      //   AppCache: false,
      // }),
    ]
  });
}
