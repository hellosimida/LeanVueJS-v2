import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
/**
 * 根 store
 */
const store = new Vuex.Store({
    state: {
        modules: [], // 配置的系统板块
        config: {}, // 动态配置
        event: { // 用于页面监听全局事件，对象type表示事件类型，该值内容表示最后一个事件值，读取无意义
            type: '',
            data: undefined
        },
        user: null, //当前登录用户
        windowHeight: document.documentElement.clientHeight, // 当前页面高度
        windowWidth: document.documentElement.clientWidth, // 当前页面宽度
    },
    getters: {
        /**
         * 获取配置内容
         */
        config(state) {
            return state.config;
        },
        /**
         * 当前浏览器高度，该值会跟随窗口变化实时更新
         */
        windowHeight(state) {
            return state.windowHeight;
        },
        /**
         * 当前浏览器宽度，该值会跟随窗口变化实时更新
         */
        windowWidth(state) {
            return state.windowWidth;
        },
        /**
         * 当前登录用户
         */
        user(state) {
            return state.user;
        },
        /**
         * 判断指定模块是否有权限啊
         */
        modulePermission: (state) => (moduleId) => {
            const user = state.user;
            return user && user.permissionId && user.permissionId.indexOf(moduleId) >= 0;
        },
    },
    mutations: {
        /**
         * 设置当前系统板块
         */
        setModules(state, modules) {
            state.modules = modules;
        },
        /**
         * 动态配置
         */
        setConfig(state, config) {
            state.config = config;
        },
        /**
         * 触发事件，事件格式为字符串或者 {type:string, data:any}
         */
        setEvent(state, event) {
            if (event) {
                // 如果是字符串，则格式化为事件格式
                if (typeof event === 'string') {
                    event = {type: event};
                }
                // 只有在event的type有值时才处理
                if (event.type) {
                    state.event = event;
                }
            } else {
                console.log(`无效的事件：${event}`);
            }
        },
        /**
         * 设置当前窗口尺寸
         */
        setWindowSize(state, payload) {
            state.windowHeight = payload.height;
            state.windowWidth = payload.width;
        },
        /**
         * 修改当前用户
         */
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('loginUser', JSON.stringify(user));
        },

        /**
         * 设置用户已修改密码，下次不弹出修改密码弹出了
         */
        setUserChangedPassword(state) {
            if (state.user) {
                state.user.changePassword = false;
                localStorage.setItem('loginUser', JSON.stringify(state.user));
            }
        },
    },
});

// 全局统一监听窗口宽度改变，其他地方只需要监听store的值即可
let windowChangedTimer;
window.onresize = () => {
    // 清除前一个定时
    clearTimeout(windowChangedTimer);
    // 避免频繁调用导致页面卡顿
    windowChangedTimer = setTimeout(() => {
        store.commit('setWindowSize', {
            width: document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        });
    }, 200);
}

export default store;
