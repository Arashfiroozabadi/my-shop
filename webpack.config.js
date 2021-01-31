const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MCEP = require('mini-css-extract-plugin');

module.exports = (env) => {
  const mode = env.NODE_ENV;
  console.log(mode);
  return {
    entry: {
      index: './src/index.ts',
      login: './src/login/index.ts',
    },
    target: 'web',
    mode,
    devtool: 'inline-source-map',
    watch: true,
    devServer: {
      inline: true,
      historyApiFallback: true,
      hot: true,
      host: '0.0.0.0',
      port: 3000,
    },
    performance: {
      maxEntrypointSize: 2000000,
      maxAssetSize: 2000000,
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            mode === 'development' ? 'style-loader' : MCEP.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]',
              },
            },
          ],
        },
        {
        // HTML LOADER
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },

    resolve: {
      extensions: ['.ts', '.js'],
    },

    output: {
      filename: '[name]/[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '',
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ['index'],
        filename: 'index.html',
        template: 'src/index.html',
      }),
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ['login', 'index'],
        filename: 'login/index.html',
        template: 'src/login/index.html',
      }),
      new MCEP({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
        filename: '[name]/[name].css',
        chunkFilename: '[id].css',
      }),
    ],
  };
};
