const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    port: 5001,
    open: true,
    hot: true,
    compress: true,
  },

  module: {
    rules: [
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.(svg|ico|png|webp|jpg|jpeg|gif)$/i, type: "asset/resource" },
      { test: /\.(wav|mp3)$/, type: "asset/resource" },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "index",
      filename: "index.html",
      template: path.resolve(__dirname, "./src/index.html"),
    }),
    new HtmlWebpackPlugin({
      title: "auth",
      filename: "auth.html",
      template: path.resolve(__dirname, "./src/Auth/auth.html"),
    }),
    new HtmlWebpackPlugin({
      title: "static home",
      filename: "home.html",
      template: path.resolve(__dirname, "./src/static/home.html"),
    }),
  ],
};
