var webpack = require('webpack');

module.exports = {
  entry: './static/js/index.js',
  output: {
    path: __dirname,
    filename: './static/dist/js/index.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /.(png|jpg|jpeg)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.woff$/,
      loader: "url-loader?limit=8192&mimetype=application/font-woff"
    }, {
      test: /\.woff2$/,
      loader: "url-loader?limit=8192&mimetype=application/font-woff2"
    }, {
      test: /\.ttf$/,
      loader: "url-loader?limit=8192&mimetype=application/octet-stream"
    }, {
      test: /\.eot$/,
      loader: "file-loader"
    }, {
      test: /\.svg$/,
      loader: "url-loader?limit=8192&mimetype=image/svg+xml"
    }]
  },
  plugins: [
  new webpack.HotModuleReplacementPlugin(),

  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
    React: 'react',
    ReactDOM: 'react-dom'
  })
  ]
}