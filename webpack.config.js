const path = require('path');

module.exports = {
  entry: './Script/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    static: './',
    hot: true,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
  devtool: 'source-map',
  mode: 'development'
};
