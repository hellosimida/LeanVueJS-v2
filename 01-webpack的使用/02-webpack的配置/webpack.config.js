//�̶�д������Ҫ����path����������Ҫִ��npm init��ʼ����һ��package.json�ļ���Ȼ��npm install��װ��
const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}