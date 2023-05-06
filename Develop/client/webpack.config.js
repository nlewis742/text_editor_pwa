const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'PWA Text Editor',
      }),
      
      new InjectManifest({
        swSrc: './src/js/sw.js',
        swDest: 'sw.js',
      }),

    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'PWA Text Editor',
      short_name: 'PWA Text Editor',
      description: 'A simple text editor that works offline',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      start_url: '/',
      publicPath: '/',
      icons: [
        {
          src: path.resolve('src/assets/icons/icon-512x512.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
    

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
           test: /\.js$/,
           exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime', '@bable/plugin-proposal-object-rest-spread']
              }
          }
        }
      ],
    },
  };
};
