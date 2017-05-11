/* eslint-disable */
const webpack = require('webpack');
const paths = require('./paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const extractCSS = new ExtractTextPlugin('re-style.css');
const extractLESS = new ExtractTextPlugin('re-style-less.css');
const ReWebpackPlugin = require('./plugin');


module.exports = function() {
  return {
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          paths.appSrc,
          paths.appNodeModules + '/preact-compat/src',
        ],
        options: {
          presets: [['es2015', { modules: false }], 'react', 'stage-3'],
          plugins: [
            'transform-decorators-legacy',
            'transform-class-properties',
            'syntax-dynamic-import',
            'transform-async-to-generator',
            'transform-regenerator',
            'transform-runtime'
          ]
        }
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: 'css-loader'
      //   }),
      // },
      // {
      //   test: /\.less$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
      //       'less-loader?outputStyle=expanded&sourceMap',
      //     ]
      //   }),
      // },
      // {
      //    test: /\.less$/,
      //    use: [
      //      'style-loader',
      //      'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
      //      'less-loader?outputStyle=expanded&sourceMap',
      //    ]
      // },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader',
      },
    ],
    },
    resolve: {
      modules: [paths.appSrc,`${paths.appSrc}/frontend` , 'node_modules'],
    },
    plugins: [
      // new webpack.IgnorePlugin(/(locale)/, /node_modules.+(momentjs)/),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/),
      new ReWebpackPlugin(),
      // extractCSS,
      // extractLESS,
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: {removeAll: true } },
        canPrint: true
      }),
    ]
  };
}

// # POST CSS Config
// {
//   loader: 'postcss-loader',
//   options: {
//     plugins: function () {
//       return [
//         require('autoprefixer')({
//           browsers: [
//             '>1%',
//             'last 4 versions',
//             'Firefox ESR',
//             'not ie < 9', // React doesn't support IE8 anyway
//           ]
//         })
//       ];
//     }
//   },
// }
//

// {
//   test: /\.css$/,
//   use: ExtractTextPlugin.extract({
//     fallback: 'style-loader',
//     use: 'css-loader'
//   }),
// },
// {
//   test: /\.less$/,
//   use: ExtractTextPlugin.extract({
//     fallback: 'style-loader',
//     use: [
//       'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
//       'less-loader?outputStyle=expanded&sourceMap',
//     ]
//   }),
// },



// use: [
//   'style-loader',
//   'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
//   'less-loader?outputStyle=expanded&sourceMap',
// ],
