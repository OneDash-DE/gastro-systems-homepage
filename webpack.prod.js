const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const selectedPreprocessor = {
	fileRegexp: /\.(sass|scss|css)$/,
	loaderName: "sass-loader",
};

module.exports = {
	entry: "./src/index.js",
	mode: "production",
	resolve: {
		extensions: [".js", ".mjs"],
		fallback: { buffer: false },
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[chunkhash].js",
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
				test: selectedPreprocessor.fileRegexp,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "",
						},
					},

					{
						loader: "css-loader",
						options: {
							modules: false,
							sourceMap: true,
						},
					},

					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,
						},
					},

					{
						loader: selectedPreprocessor.loaderName,
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|webp|woff(2)?|ttf|eot)$/i,
				type: "asset/resource",
			},
		],
	},
	plugins: [
		new ESLintPlugin({
			failOnError: true,
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "style.[contenthash].css",
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
