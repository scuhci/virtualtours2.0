const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "development",
	optimization: {
		minimize: false,
	},
	entry: "./src/index.tsx",
	output: {
		filename: "js/[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	devtool: "source-map",
	resolve: {
		extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				loader: "ts-loader",
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: "url-loader",
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{ enforce: "pre", test: /\.js$/, use: ["source-map-loader"] },
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "Development",
			template: "index.html",
		}),
		new CopyPlugin({
			patterns: [
				{ from: "node_modules/@mp/bundle-sdk", to: "bundle" },
				{ from: "assets", to: "assets" },
			],
		}),
	],
	devServer: {
		port: 8000,
		devMiddleware: {
			writeToDisk: true,
		},
	},
};
