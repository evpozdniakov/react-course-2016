'use strict'

const path = require('path');
const webpack = require('webpack');

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
				test: /\.js$/,
				include: path.resolve(__dirname, 'src/js'),
				exclude: path.resolve(__dirname, 'node_modules'),
				loader: 'babel',
				query: {
					cacheDirectory: true,
					presets: ['es2015', 'stage-0'],
				},
			}, {
				test: /\.jsx$/,
				include: path.resolve(__dirname, 'src/js'),
				exclude: path.resolve(__dirname, 'node_modules'),
				loader: 'babel',
				query: {
					cacheDirectory: true,
					presets: ['es2015', 'stage-0', 'react'],
				},
			},
		]
	},

	resolveLoader: {
		modulesDirectories: ['node_modules'],
		moduleTemplates: ['*-loader', '*'],
		extensions: ['', '.js'],
	}
};