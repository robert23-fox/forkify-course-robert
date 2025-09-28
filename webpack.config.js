const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: "images/[name][ext]", // Ensures images are placed correctly
  },
  plugins: [
    // Load env vars from Netlify or local .env/config.env
    new Dotenv({
      path: "./config.env", // only used locally
      systemvars: true, // allows Netlify env vars to be used
    }),

    // Only enable Bundle Analyzer in dev
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
