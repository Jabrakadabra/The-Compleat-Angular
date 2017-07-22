'use strict';

module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es6': true
	},
	'plugins': [
		'node'
	],
	'extends': [
		'eslint:recommended',
		'plugin:node/recommended'
	],
	'parserOptions': {
		'sourceType': 'module',
		'ecmaVersion': 2017
	},
	'globals': {
		'__dirname': true
	},
	'rules': {
		'node/no-unpublished-require': ['error', {
			'allowModules': [
				'webpack',
				'html-webpack-plugin',
				'extract-text-webpack-plugin',
				'copy-webpack-plugin',
				'webpack-merge',
				'karma-jasmine',
				'karma-chrome-launcher',
				'jasmine-core',
				'es6-shim',
				'karma-webpack',
				'awesome-typescript-loader'
			]
		}],

		'node/no-unsupported-features': ['error', {
			'version': 7,
			'ignores': []
		}],

		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
