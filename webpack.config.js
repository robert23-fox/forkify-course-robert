const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: "images/[name][ext]", // Ensures images are placed correctly
  },
  plugins: [
    new Dotenv({
      path: "./config.env",
      systemvars: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/images", to: "images" }, // copies all images to dist/images
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // <- your source HTML
      filename: "index.html", // <- ensures index.html is in dist/
    }),
    process.env.NODE_ENV === "development" && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  performance: {
    hints: false, // Or false to disable completely
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Match image files
        type: "asset/resource", // Emits images to output directory
      },
    ],
  },
};
