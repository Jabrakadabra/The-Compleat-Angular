'use strict';
const path = require('path');
const rootDir = path.resolve(__dirname, '..');
const webpack = require('webpack');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
	devtool: 'inline-source-map',
	resolve: {
		extensions: ['.ts', '.js', '.html'],
		plugins: [
			new TsConfigPathsPlugin()
		]
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loaders: [
					{
						loader: 'awesome-typescript-loader',
						options: {
							configFileName: path.resolve(rootDir, 'tsconfig.json')
						}
					},
					'angular2-template-loader'
				]
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'null-loader'
			},
			{
				test: /\.css$/,
				exclude: path.resolve(rootDir, 'src', 'app'),
				loader: 'null-loader'
			},
			{
				test: /\.css$/,
				include: path.resolve(rootDir, 'src', 'app'),
				loader: 'raw-loader'
			}
		]
	},
	plugins: [
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
			path.resolve(rootDir, './src'), // location of your src
			{} // a map of your routes
		)
	]
};
