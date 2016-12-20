module.exports = {
	entry: {
		bundle_customers: './customers/index.js',
		bundle_domains: './domains/index.js',
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
	}
}