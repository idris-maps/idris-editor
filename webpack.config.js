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
			{from: 'src/public/img'},
			{from: 'src/public/images', to: 'images'},
		]),
		new webpack.DefinePlugin({
				'process.env': {
				  NODE_ENV: JSON.stringify('production')
				}
		}),
		new UglifyJsPlugin({cacheFolder: 'cache'})
	]
}
