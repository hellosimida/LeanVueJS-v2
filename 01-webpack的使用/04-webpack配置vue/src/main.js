//使用commonjs的模块化规范
const {add,mul} = require('./js/mathUtil.js');

console.log(add(1,2));
console.log(mul(2,3));

//使用es6的模块化规范
import {name,age,height} from "./js/info"

console.log(name);
console.log(age);
console.log(height);

//依赖css
require('./css/normal.css');

//依赖less文件
require('./css/special.less')

//使用VUE
import Vue from 'vue'

//import App from './vue/app.js'
import App from './vue/App'

const app = new Vue({
  el: '#app',
  data: {},
  template: `<App/>`,
  components: {
    App
  }
})