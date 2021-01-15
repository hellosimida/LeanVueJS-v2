import Vue from 'vue'
// 兼容IE不支持ES6语法问题
import 'babel-polyfill'
import SystemInit from "./common/SystemInit";
import Config from "@/Config";
import DeviceType from "@/common/util/DeviceType";

Vue.config.productionTip = false;

/**
 * 初始化方法，使用 SystemInit 进行初始化，该方法会将所有前置参数统一初始化
 */
function init() {
  let mobile = DeviceType.isMobile();
  if (mobile) {
    // 隐藏进度条 显示加载图片
    document.getElementById('progress').style.display = 'none';
    document.getElementById('welImg').style.display = 'block';
  } else {
    // 显示进度条 隐藏加载图片
    document.getElementById('progress').style.display = 'block';
    document.getElementById('welImg').style.display = 'none';
  }
  // 隐藏错误按钮
  document.getElementById('error-button').style.display = 'none';

  SystemInit.init(Config.modules).then(({store, router, app}) => {
    // 移除welcome
    document.body.removeChild(document.getElementById('welcome'));
    // 初始化Vue对象
    new Vue({
      router,
      store,
      render: h => h(app),
    }).$mount('#app');
  }).catch((e) => {
    console.log(e);
    // 隐藏进度条 加载图片
    document.getElementById('progress').style.display = 'none';
    document.getElementById('welImg').style.display = 'none';
    // 显示错误按钮
    document.getElementById('error-button').style.display = 'block';
  }).finally(()=>{
    // 等上面加载完成后，才初始化返回码
    SystemInit.initReturnCode().then((returnCode)=>{
      if (Vue.prototype.httpCommunicate){
        Vue.prototype.httpCommunicate.parser.codeMap = returnCode;
      }
    }).catch()
  })
}

// 绑定错误按钮点击事件
document.getElementById('error-button').onclick = init;
// 自动调用一次
init();
