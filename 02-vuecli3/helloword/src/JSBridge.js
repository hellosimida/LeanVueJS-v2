let enableJSBridge = false;
// Android 下判断 JSBridge 是否可用
try {
    /* eslint-disable no-undef */
    if (NativeApi.enableJSBridge) {
        enableJSBridge = true;
    }
} catch (e) {
    // do nothing
}
// 如果Android下没有效果，则尝试判断iOS是否生效
if (!enableJSBridge) {
    try {
        if (window.webkit.messageHandlers.enableJSBridge) {
            enableJSBridge = true;
        }
    } catch (e) {
        // do nothing
    }
}

// 请求序号
let requestNO = 1;
// callbackMap头标志
const CALLBACK_PREFIX = 'callback_';

let Private = {

    // 保存回调对象
    callbackMap: {},
    // 保存通知回调
    notificationCallBack: {},

    /**
     * 为请求生成唯一标识
     */
    getSid: function () {
        return '' + requestNO++;
    },

    /**
     * 创建请求参数
     * @param  action 请求操作
     * @param  sid 唯一标识
     * @param  params 请求参数
     * @return string json字符串
     */
    createRequest: function (action, sid, params) {
        // 如果
        if (params && typeof params === 'object') {
            params = JSON.stringify(params)
        }
        let requestObj = {
            action: action,
            params: params,
            sid: sid
        };
        return JSON.stringify(requestObj);
    },

    /**
     * @param  params 返回json字符串
     * @return 解析为对象的返回包
     */
    parseResponse: function (params) {
        let response;
        if (params && typeof params === 'string') {
            try {
                response = JSON.parse(params);
                if (response.params && typeof response.params === 'string') {
                    let obj = JSON.parse(response.params);
                    // 如果返回的param是JSON字符串，则解析为对象返回
                    if (obj && typeof obj === 'object') {
                        response.params = obj;
                    }
                }
            } catch (e) {
                if (!response) {
                    // 返回包解析失败
                    response = {
                        returnCode: -1,
                        message: 'RESPONSE_PARSE_ERROR'
                    }
                }
            }
        }
        return response;
    },

    /**
     * 注册回调
     * @param  sid 请求标识
     * @param  callback 回调
     */
    registerCallBack: function (sid, callback) {
        if (callback) {
            this.callbackMap[CALLBACK_PREFIX + sid] = callback;
        }
    },

    /**
     * 注销回调
     * @param  sid 请求标识
     */
    unregisterCallBack: function (sid) {
        let callback = this.callbackMap[CALLBACK_PREFIX + sid];
        if (callback) {
            delete this.callbackMap[CALLBACK_PREFIX + sid]
        }
        return callback
    }
};

// JSBridge 对外暴露
let JSBridge = {
    enable: enableJSBridge,
    /**
     * JS 调用 Native请求
     *
     * @param  action 请求action
     * @param  params 请求参数
     * @param  callback 回调
     * @return 同步方法返回结果，如果请求的动作是异步的(例如分享、支付等)，该方法不会返回内容
     */
    request: function (action, params, callback) {
        if (this.enable) {
            // 获取回调ID
            let sid = Private.getSid();
            let requestParams = Private.createRequest(action, sid, params);
            // console.log('JSBridge Request:' + requestParams);

            // 获取同步返回字符串
            let responseParams = window.prompt(requestParams);
            // 解析返回内容
            let response = Private.parseResponse(responseParams);
            if (response) {
                // console.log('JSBridge Sync Response:' + responseParams);
                return response;
            } else {
                // 没有同步返回，注册回调
                Private.registerCallBack(sid, callback);
            }
        }
    },

    /**
     * Native 调用JS返回
     *
     * @param  sid 请求标志
     * @param  params 返回对象json字符串
     */
    response: function (sid, params) {
        // console.log('JSBridge Async Response:' + params);
        let callback;
        if (sid) {
            callback = Private.unregisterCallBack(sid);
        }

        if (callback) {
            let response = Private.parseResponse(params);
            if (!response) {
                response = {
                    returnCode: -1,
                    message: 'RESPONSE_IS_NULL'
                }
            }
            callback(response);
        }
    },

    /**
     * 用于原生回调通知点击
     * @param params
     */
    onNotificationClick: function (params) {
        if (Private.notificationCallBack) {
            Private.notificationCallBack(params);
        }
    },
    /**
     * 注册通知点击回调
     * @param callback 回调
     */
    registerNotificationCallback(callback) {
        Private.notificationCallBack = callback;
    },

    // 本地存储封装
    storage: {
        /**
         * 根据key获取value
         *
         * @param  {string} key
         */
        get: function (key) {
            let response = JSBridge.request('storage', {
                type: 'get',
                key: key
            });
            if (response && response.returnCode >= 0) {
                return response.params.value
            }
            return '';
        },

        /**
         * 根据key保存value
         *
         * @param  {string} key
         * @param  {string} value
         */
        set: function (key, value) {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            JSBridge.request('storage', {
                type: 'set',
                key: key,
                value: value
            });
        }
    },

    // 弹窗封装
    alert: {
        /**
         * 消息提示，只有一个按钮
         * @param message 消息
         */
        show: function (message) {
            JSBridge.request('alert', {
                message: message,
                positiveText: '确定'
            });
        },

        /**
         * 确认提示，两个按钮
         *
         * @param message 消息
         * @param positiveCallback 点击确认的回调方法
         * @param negativeCallback 点击取消的回调方法
         */
        confirm: function (message, positiveCallback, negativeCallback) {
            JSBridge.request('alert', {
                message: message,
                positiveText: '确定',
                negativeText: '取消',
                cancelable: false
            }, function (response) {
                if (response.returnCode >= 0 && response.params) {
                    let type = response.params.clickType;
                    if (positiveCallback && type === 'positive') {
                        positiveCallback();
                    } else if (negativeCallback) {
                        negativeCallback();
                    }
                }
            });
        }
    },

    /**
     * 弹出提示
     *
     * @param message 消息
     * @param gravity 垂直方向，top | bottom | center
     */
    toast: function (message, gravity) {
        // 消息内容为空，不提示
        if (!message || message.length === 0) {
            return
        }
        JSBridge.request('toast', {
            message: message,
            gravity: gravity
        })
    },

    /**
     * 分享
     * @param title 标题
     * @param message 消息
     * @param url 分享链接
     * @param imgUrl 图片链接
     */
    share: function (title, message, url, imgUrl) {
        JSBridge.request('share', {
            title: title,
            message: message,
            url: url,
            imgUrl: imgUrl
        })
    }
};

// 设置为全局，
window.JSBridge = JSBridge;
// 对外暴露
export default JSBridge;
