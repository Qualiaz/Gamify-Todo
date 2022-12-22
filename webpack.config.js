const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // npm i -D html-webpack-plugin

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  watch: true,
  devtool: "inline-source-map",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    watchFiles: ["./src/index.html"],
    port: 5001, // default 8080
    open: true,
    hot: true,
    compress: true,
  },
  // loaders
  module: {
    rules: [
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] }, // npm i -D sass style-loader css-loader sass-loader
      { test: /\.(svg|ico|png|webp|jpg|jpeg|gif)$/i, type: "asset/resource" },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "title",
      filename: "index.html",
      template: path.resolve(__dirname, "./src/index.html"),
    }),
    new HtmlWebpackPlugin({
      title: "auth",
      filename: "auth.html",
      template: path.resolve(__dirname, "./src/Auth/auth.html"),
    }),
  ],
};
