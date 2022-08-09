const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: ["regenerator-runtime/runtime.js", "./client/index.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: '/build'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
    },
      {
        test: /\.png|jpg|gif$/,
        use: ["file-loader"],
      },
      {
        test: /\.mp4$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/views/index.html",
    }),
  ],
  devServer: {
    //historyApiFallback: true,
    // static: {
    //   publicPath: "build",
    //   directory: path.resolve(__dirname, "build"),
    // },
    // port: 8080,
    static: path.join(__dirname, "./src/client"),
    proxy: {
      "/": "http://localhost:3000",
    },
  },
};