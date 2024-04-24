const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
  mode: "production",
  devtool: "source-map", // explore
  plugins: [
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("Codevoluation"),
    }),
    new BundleAnalyzerPlugin(),
  ],
};
