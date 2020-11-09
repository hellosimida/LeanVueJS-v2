//使用commonjs的模块化规范
const {add,mul} = require('./js/mathUtil.js');

console.log(add(1,2));
console.log(mul(2,3));

//使用es6的模块化规范
import {name,age,height} from "./js/info"

console.log(name);
console.log(age);
console.log(height);