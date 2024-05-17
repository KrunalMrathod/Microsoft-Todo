const webpack = require("webpack");
const reactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    hot: true,
    open: true,
    port : 9000,
  },
  devtool: "cheap-module-source-map", // explore
  plugins: [
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("Haresh"),
    }),
    new reactRefreshWebpackPlugin(),
  ],
};
