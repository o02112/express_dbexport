var webpack = require('webpack');

module.exports = {
	entry: {
		bundle_customers: './customers/index.js',
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
		new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
	// ,new webpack.DefinePlugin({  // 设置nodejs 运行环境 
	// 	'process.env': {
	// 		'NODE_ENV': JSON.stringify('production')
	// 	}
	// })
	]
}