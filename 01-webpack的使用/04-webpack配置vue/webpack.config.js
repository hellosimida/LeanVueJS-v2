//固定写法，需要依赖path包，所以需要执行npm init初始化出一个package.json文件，然后npm install安装包
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
        //css-loader只负责将css文件进行加注
        //style-loader负责将样式添加到DOM中
        //使用多个loader时，webpack从右向左读取
        use: [ {
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }]
      },
      {
        test: /\.less$/,
        //css-loader只负责将css文件进行加注
        //style-loader负责将样式添加到DOM中
        //使用多个loader时，webpack从右向左读取
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