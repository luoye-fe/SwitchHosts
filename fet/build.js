const path = require('path');

const webpack = require('webpack');
const ora = require('ora');

const logger = require('./logger.js');

const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const webpackConfig = {
    entry: path.join(__dirname, './dist/src/ui.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=react,presets[]=es2015']
            }, {
                test: /\.less$/,
                loaders: ['style', 'css', 'less']
            }, {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            }
        ]
    },
    plugins: [
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
};

function run() {
	return new Promise((resolve, reject) => {
		resolve();
	});
}

function runWebpack() {
	return new Promise((resolve, reject) => {
		let spinner = ora('Building render process resource ...').start();
		webpack(webpackConfig, function(err, stats) {
			if (err) {
				spinner.stop();
				logger.fatal(err);
				reject(err);
			};
			spinner.stop();
			logger.success('Build render process resource succeed.');
			resolve();
		});
	});
}

run()
	.then(() => {
		return runWebpack();
	})
	.catch((e) => {
		logger.fatal(e);
	});