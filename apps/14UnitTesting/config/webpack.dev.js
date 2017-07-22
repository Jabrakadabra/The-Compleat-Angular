'use strict';
const path = require('path');
const rootDir = path.resolve(__dirname, '..');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
	devtool: 'cheap-module-eval-source-map',

	output: {
		path: path.resolve(rootDir, 'dist'),
		publicPath: '/',
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js'
	},

	plugins: [
		new ExtractTextPlugin('[name].css')
	],

	devServer: {
		inline: true,
		historyApiFallback: {
			index: path.resolve(rootDir, '/')
		},
		contentBase: path.resolve(rootDir, 'dist'),
		stats: 'minimal',
		port: 3142
	}
});
