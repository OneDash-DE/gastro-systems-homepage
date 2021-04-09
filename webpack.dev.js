const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	mode: "development",
	resolve: {
		extensions: [".js", ".mjs"],
		fallback: { buffer: false },
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[chunkhash].js",
	},
	devtool: "source-map",
	devServer: {
		open: true,
		hot: true,
		inline: true,
		contentBase: path.join(__dirname, "src"),
		disableHostCheck: true,
		host: "0.0.0.0",
		openPage: "http://localhost:8080",
		stats: {
			colors: true,
			hash: false,
			version: false,
			timings: false,
			assets: false,
			chunks: false,
			modules: false,
			reasons: false,
			children: false,
			source: false,
			errors: true,
			errorDetails: true,
			warnings: true,
			publicPath: false,
		},
	},

	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},

			{
				test: /\.(sass|scss|css)$/,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},

			{
				test: /\.(png|svg|jpg|jpeg|gif|webp|woff(2)?|ttf|eot)$/i,
				type: "asset/resource",
			},
		],
	},

	performance: {
		hints: false,
		maxEntrypointSize: 1024000,
		maxAssetSize: 1024000,
	},

	optimization: {
		minimize: false,
	},

	plugins: [
		new ESLintPlugin({
			failOnError: false,
		}),
		new MiniCssExtractPlugin({
			filename: "style.css",
		}),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
		}),
		new CopyPlugin({
			patterns: [{ from: "static", to: "./" }],
		}),
	],
};
