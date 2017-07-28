var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'

module.exports = {
  devtool: 'eval-source-map',
  name: 'browser',
  context: path.join(__dirname, '..','src'),
  debug:true,
  entry: {
    vendor: ['react','redux','react-redux','react-router'],
    bundle: ['./client.js',hotMiddlewareScript]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVCLIENT__: true,
      __DEVSERVER__: false,
      __DEVTOOLS__: false,
      __DEVLOGGER__: true,
      'process.env':{
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js)|(jsx)$/,
        exclude: /node_modules|lib/,
        loaders: ['eslint-loader'],
        include: path.join(__dirname, '../src'),
      }
    ],
    loaders: [{
      test: /\.js$|\.jsx$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, 
    { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap' ) },
    { test: /\.json$/, loader: 'json-loader' },
    {
      test: /\.(jpe?g|png|gif)$/i,
      loaders: [
        'url?limit=10000&name=images/[hash:8].[name].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    },{
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
    }]
  },
  eslint: {
    configFile: path.join(__dirname, '../eslintrc.json')
  },
  resolve: {
    extensions: ['','.js','.jsx','.scss','.css']
  }
}