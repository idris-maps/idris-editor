var HtmlwebpackPlugin = require('html-webpack-plugin')
var UglifyJsPlugin = require('webpack-uglify-js-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpack = require('webpack')

module.exports = {
	entry: './src/main.js',
	output: {
		path: './dist',
		filename: 'idris-editor.js'
	},
	plugins: [
		new HtmlwebpackPlugin({
			title: 'Idris editor',
			template: 'src/public/index.html'
		}),
		new CopyWebpackPlugin([
			{from: 'src/public/style.css'},
			{from: 'src/public/leaflet.css'},
			{from: 'src/public/img'}
		]),
/*
		new webpack.DefinePlugin({
				'process.env': {
				  NODE_ENV: JSON.stringify('developement')
				}
		}),
		new UglifyJsPlugin({cacheFolder: 'cache'})
*/
	]
}
