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

	resolve: {
		modulesDirectories: ['node_modules'], // user resolve.root as alternative
		extensions: ['', '.js', '.jsx'],
		alias: {
			components: path.resolve(__dirname, 'src/js/components'),
			HOC: path.resolve(__dirname, 'src/js/HOC'),
			actions: path.resolve(__dirname, 'src/js/actions'),
			dispatcher: path.resolve(__dirname, 'src/js/dispatcher'),
			stores: path.resolve(__dirname, 'src/js/stores'),
			data: path.resolve(__dirname, 'src/js/data'),
			constants: path.resolve(__dirname, 'src/js/constants'),
			utils: path.resolve(__dirname, 'src/js/utils'),
		}
	},

	/*watch: true,
	watchOptions: {
		aggregateTimeout: 100,
	},*/

	devtool: 'source-map',

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
			},
		]
	},

	resolveLoader: {
		modulesDirectories: ['node_modules'],
		moduleTemplates: ['*-loader', '*'],
		extensions: ['', '.js'],
	}
}
