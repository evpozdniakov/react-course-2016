'use strict'

const path = require('path')
const webpack = require('webpack')
const NODE_ENV = process.env.NODE_ENV || 'development'
const DEVELOPMENT = NODE_ENV === 'development'
const PRODUCTION = !DEVELOPMENT

module.exports = {
	context: path.resolve(__dirname, 'src/js'),
	entry: {
		index: './index',
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build/',
		filename: '[name].js',
	},

  devServer: {
		proxy: [{
				path: '/api/*',
				target: 'http://localhost:3001'
		}],
		historyApiFallback: true,
  },

	resolve: {
		modulesDirectories: ['node_modules'], // user resolve.root as alternative
		extensions: ['', '.js', '.jsx'],
		alias: {
			i18n: path.resolve(__dirname, 'src/js/i18n'),
			constants: path.resolve(__dirname, 'src/js/constants'),
			HOC: path.resolve(__dirname, 'src/js/HOC'),
			components: path.resolve(__dirname, 'src/js/components'),
			containers: path.resolve(__dirname, 'src/js/containers'),
			reducers: path.resolve(__dirname, 'src/js/reducers'),
			store: path.resolve(__dirname, 'src/js/store'),
		}
	},

	watch: true,
	watchOptions: {
		aggregateTimeout: 100,
	},

	devtool: 'eval',

	plugins: [
		new webpack.NoErrorsPlugin(),
	],

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: path.resolve(__dirname, 'src/js'),
				exclude: path.resolve(__dirname, 'node_modules'),
				loader: 'babel',
				query: {
					cacheDirectory: true,
					presets: ['es2015', 'stage-0', 'react'].concat(DEVELOPMENT ? 'react-hmre' : ''),
				},
			}, {
				test: /\.css$/,
				include: path.resolve(__dirname, 'src/js'),
				exclude: path.resolve(__dirname, 'node_modules'),
				loader: 'style!css',
			}, {
				test: /\.json$/,
				include: path.resolve(__dirname, 'src/js'),
				exclude: path.resolve(__dirname, 'node_modules'),
				loader: 'json',
			}
		]
	},

	resolveLoader: {
		modulesDirectories: ['node_modules'],
		moduleTemplates: ['*-loader', '*'],
		extensions: ['', '.js'],
	}
}
