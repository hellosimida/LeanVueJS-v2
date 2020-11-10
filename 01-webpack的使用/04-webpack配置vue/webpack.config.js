//�̶�д������Ҫ����path����������Ҫִ��npm init��ʼ����һ��package.json�ļ���Ȼ��npm install��װ��
const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        //css-loaderֻ����css�ļ����м�ע
        //style-loader������ʽ��ӵ�DOM��
        //ʹ�ö��loaderʱ��webpack���������ȡ
        use: [ {
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }]
      },
      {
        test: /\.less$/,
        //css-loaderֻ����css�ļ����м�ע
        //style-loader������ʽ��ӵ�DOM��
        //ʹ�ö��loaderʱ��webpack���������ȡ
        use: [ {
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 13000,
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css' , '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}