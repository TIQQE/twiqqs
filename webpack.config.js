const path = require('path')
const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')

const config = {
  entry: slsw.lib.entries,
  target: 'node',
  externals: [nodeExternals()],
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  module: {
    rules: [{ test: /\.js$/, use: [{ loader: 'babel-loader' }] }]
  }
}

if (slsw.lib.webpack.isLocal) {
  config.devtool = 'source-map'
}

module.exports = config
