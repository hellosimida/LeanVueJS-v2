//ʹ��commonjs��ģ�黯�淶
const {add,mul} = require('./js/mathUtil.js');

console.log(add(1,2));
console.log(mul(2,3));

//ʹ��es6��ģ�黯�淶
import {name,age,height} from "./js/info"

console.log(name);
console.log(age);
console.log(height);

//����css
require('./css/normal.css');

//����less�ļ�
require('./css/special.less')

//ʹ��VUE
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