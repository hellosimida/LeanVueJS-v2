//固定写法，需要依赖path包，所以需要执行npm init初始化出一个package.json文件，然后npm install安装包
const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}