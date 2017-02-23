var webpack = require('webpack');

module.exports = {
	entry: {
		bundle_dashboard: './dashboard/index.js',
		bundle_customers: './customers/index.js',
		bundle_customers_findmobile: './customers/findmobile.js',
		bundle_domains: './domains/index.js',
		bundle_test: './test/index.js',
	},
	output: {
		filename: '[name].js',
		path: '../public/javascripts/'
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
		]
	},
	plugins: [
		// new webpack.DefinePlugin({
		// 	'process.env': {
		// 		'NODE_ENV': JSON.stringify('production')
		// 	}
		// }),
		new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
    })
	]
}