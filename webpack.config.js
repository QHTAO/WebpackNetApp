const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./Styles/_bootstrap.js",
  output: {
    path: path.resolve(__dirname, "./wwwroot/lib/bootstrap/dist"),
    filename: "js/bootstrap.bundle.min.js",
  },
  optimization: {
    // minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }), // 壓縮Js文件
      new CssMinimizerPlugin(), // 壓縮CSS文件
    ],
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [require("autoprefixer")],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), //清除構建資料夾
    new MiniCssExtractPlugin({
      filename: "css/bootstrap.min.css",
    }),
  ],
};
