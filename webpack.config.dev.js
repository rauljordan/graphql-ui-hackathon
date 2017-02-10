const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: [
		'webpack-hot-middleware/client',
		path.resolve(__dirname, 'src')
	],
	devtool: 'eval',
	devServer: {
    contentBase: './dist'
  },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		}),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'public'),
				to: path.resolve(__dirname, 'dist')
			}
		])
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				include: path.resolve(__dirname, 'src'),
				query: {
					presets: [ 'react-hmre' ]
				}
			},
			{
				test: /\.css/,
				loader: 'style!css',
				include: path.resolve(__dirname, 'src')
			},
			{
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
				include: path.resolve(__dirname, 'src'),
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
			{
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: 'url',
				include: path.resolve(__dirname, 'src'),
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
		]
	}
};
