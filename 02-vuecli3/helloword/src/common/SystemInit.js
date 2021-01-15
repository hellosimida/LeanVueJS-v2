import Vue from 'vue';

// 引入状态管理
import rootStore from './RootStore';
// 引入路由
import Router from 'vue-router'

Vue.use(Router);

import Config from '@/Config'
import axios from "axios";
import HttpCommunicate from "./util/HTTPCommunicate"
import DeviceType from "./util/DeviceType";

/**
 * 系统初始化入口方法
 * 1. store 汇总
 * 2. router 汇总
 * 3. 请求动态配置
 * 4. 请求返回码配置
 * 5. 调用各个模块的初始化
 * 6. 初始化历史登录用户
 * 7. 根据当前设备类型引入相关 UI 库和 css
 * 8. 初始化入口 App 页面
 */
export default {
    isMobile: DeviceType.isMobile(), // 当前是否是手机
    store: undefined, // 临时保存store 避免重复初始化
    router: undefined, // 临时保存router，避免重复初始化
    config: undefined, // 临时保存config，避免重复初始化
    returnCode: undefined, // 临时保存返回码，避免重复初始化
    /**
     * 初始化入口方法
     * @param modules 需要初始化的模块
     * @return {Promise<{store,router}>}
     */
    async init(modules = []) {
        // 如果没有可用模块
        if (modules.length === 0) {
            throw new Error('模块配置为空');
        }
        // 如果 store 为空，则初始化 store
        if (!this.store) {
            this.store = this.initStore(modules);
            // 模块信息保存到store中
            this.store.commit('setModules', modules);
        }
        // 如果 router 为空，则初始化router
        if (!this.router) {
            this.router = this.initRouter(modules, this.store);
        }

        // 初始化动态配置
        if (!this.config) {
            this.config = await this.initRuntimeConfig();
            this.store.commit('setConfig', this.config);
        }

        // 初始化返回码
        if (!this.returnCode) {
            // 客户要求不再此处初始化返回码了，等页面加载完毕才初始化
            // this.returnCode = await this.initReturnCode();
        }
        // 初始化网络通讯类
        if (!Vue.prototype.httpCommunicate) {
            let httpCommunicate = this.initHttpCommunicate(this.config.host_url, this.returnCode, this.store);
            Vue.prototype.httpCommunicate = httpCommunicate;
        }

        // 初始化各个模块基本信息
        let success = await this.initModuleInfo(modules, this.config, this.store, Vue.prototype.httpCommunicate);
        if (!success) {
            throw new Error('网络请求失败，请稍后重试（Network request failed, please try again later）');
        }

        // 初始化样式
        this.initStyle();

        // 初始化JSBridge
        this.initJSBridge();

        // 初始化 app 页面
        const app = await this.initAppPage(modules);
        if (!app) {
            throw new Error('框架未配置 App 主界面');
        }
        console.log('初始化完成');
        return {store: this.store, router: this.router, app: app};
    },

    /**
     * 初始化store，汇总子模块 store
     */
    initStore(modules) {
        for (let module of modules) {
            // 如果板块的 store 存在，则注册到根 store 上
            if (module.storeOption && module.storeOption.store) {
                rootStore.registerModule(module.storeOption.name, module.storeOption.store);
            }
        }
        return rootStore;
    },

    /**
     * 初始化路由，汇总子模块路由
     */
    initRouter(modules, store) {
        let routes = [];
        for (let module of modules) {
            // 如果板块的 store 存在，则挂到根 store 上
            if (this.isMobile) {
                if (module.mobileRoutes) {
                    routes.push(...module.mobileRoutes);
                }
            } else if (module.pcRoutes) {
                routes.push(...module.pcRoutes);
            }
        }
        // 声明路由对象
        const router = new Router({routes: routes});

        // 定义全局路由守卫，当前往页面需要登录时，自动跳转到登录页
        router.beforeEach((to, from, next) => {
            // 如果前往的路由需要登录，则先判断是否登录
          /*if (!to.meta.unrequiresLogin && !store.state.user) {
              // 未登录的情况下重定向到登录页
              next('/login');
          } else {
              next();
          }*/
          next();
        });

        router.afterEach((to) => {
            // 如果页码有标题属性，页码改变时修改网页标题
            if (to.meta.title) {
                document.title = to.meta.title;
            }
            // 重置滚动位置
            document.documentElement.scrollTop = 0;
        });
        return router;
    },

    /**
     * 初始化运行时配置
     * @return {Promise<object>}
     */
    async initRuntimeConfig() {
        console.log('获取动态配置');
        let response = await axios.get(Config.runtime_config);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data;
    },

    /**
     * 请求返回码文件
     * @return {Promise<object>}
     */
    async initReturnCode() {
        console.log('获取返回码文件');
        let response = await axios.get(Config.return_code);
        if (response.status !== 200) {
            // 再请求一次
            response = await axios.get(Config.return_code);
            if (response.status !== 200){
                throw new Error(response.statusText);
            }
        }
        return response.data;
    },

    /**
     * 初始化网络通信类，同时挂载全局返回码失效监听
     */
    initHttpCommunicate(hostUrl, returnCodeMap, store) {
        let httpCommunicate = new HttpCommunicate(hostUrl, 15 * 1000, returnCodeMap);
        // 设置统一返回码失效处理
        httpCommunicate.afterResponse = (response) => {
            // 如果返回码是登录失效
            /*if (Config.user_invalid_code.indexOf(response.RESULT.RETCODE) >= 0) {
                // 如果用户不为空，则发送登录失效事件，同时设置用户为空
                if (store.state.user) {
                    // 发送登录失效事件
                    store.commit('setEvent', Config.event.USER_LOGIN_INVALID);
                    // 设置用户为空
                    store.commit('setUser', null);
                }
            }*/
        };
        return httpCommunicate;
    },

    /**
     * 初始化模块信息
     * @param modules 当前引入模块
     * @param config 运行时配置
     * @param store 当前 store
     * @param httpCommunicate http请求类
     * @return {Promise<boolean>}
     */
    async initModuleInfo(modules, config, store, httpCommunicate) {
        console.log('---模块初始化开始---');
        for (let module of modules) {
            let result = await module.init(config, store, httpCommunicate);
            // 如果某一模块初始化失败，则返回false
            if (!result) {
                return false;
            }
        }
        console.log('---模块初始化结束---');
        return true;
    },

    /**
     * 初始化历史登录的用户
     */
    async initUser(userApi, modules, store) {
        console.log('读取登录用户缓存');
        let loginUser = null;
        try {
            loginUser = JSON.parse(localStorage.getItem('loginUser'))
        } catch (e) {
            // do nothing
        }
        // 如果用户存在
        if (loginUser) {
            for (let module of modules) {
                // 只检测有权限的板块
                if (loginUser.permissionId && loginUser.permissionId.indexOf(module.moduleId) >= 0) {
                    let result = await module.checkUser(userApi, loginUser);
                    // 如果某一模块初始化失败，则不继续处理，同时清除本地登录缓存
                    if (!result) {
                        localStorage.setItem('loginUser', null);
                        return;
                    }
                }
            }
            // checkUser成功，设置到store
            store.commit('setUser', loginUser);
        }
    },

    /**
     * 初始化样式
     */
    initStyle() {
        if (this.isMobile) {
            let vant = require('vant');
            Vue.component(vant);
            // 引入 vant 样式
            require('vant/lib/index.css');
            // 引入自定义手机端样式
            require('./assets/mobile/style/common.scss');
            // 引入覆盖vant的样式
            require('./assets/mobile/style/vant_reset.scss');
            // 引入手机图标
            require('./assets/mobile/icon/iconfont.css');
        } else {
            let element = require('element-ui');
            Vue.component(element);
            // 引入 element 样式
            require('element-ui/lib/theme-chalk/index.css')
            // 引入自定义PC端样式
            require('./assets/pc/style/common.scss');
            // 引入覆盖element-ui的样式
            require('./assets/pc/style/element_reset.scss');
            // 引入PC图标
            require('./assets/pc/icon/iconfont.css');
        }
    },

    /**
     * 引入JSBridge
     */
    initJSBridge(){
        if (this.isMobile){
          Vue.prototype.JSBridge = require('../JSBridge.js').default;
            // 设置状态栏颜色
          Vue.prototype.JSBridge.request('statusBar',{color: '#f2f6fc', isDarkText: true});
        }
    },

    /**
     * 初始化 App 页面
     */
    async initAppPage(modules) {
        // 默认第一个模块为框架模块，取第一个模块的 app 页面
        const framework = modules[0];
        let appPage;
        if (this.isMobile) {
            appPage = framework.mobileAppPage;
        } else {
            appPage = framework.pcAppPage;
        }
        return appPage;
    }
}
