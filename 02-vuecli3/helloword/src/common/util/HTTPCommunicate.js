import axios from 'axios'
import {JSONParser} from "./ProtocolParser";
import Config from "../../Config"

/**
 * 前置机通讯封装
 */

class HttpCommunicate {

    /**
     * 通讯类构造函数
     * @param baseUrl  通讯地址
     * @param timeout 超时时间 单位毫秒(0 表示无超时时间)
     * @param returnCode 返回码映射
     * @param parser 协议解析器
     */
    constructor(baseUrl, timeout = 15 * 1000, returnCode, parser = new JSONParser(returnCode)) {
        this.axiosObject = axios.create({
            baseURL: baseUrl || '',
            timeout: timeout,
            headers: {'Content-Type': `application/x-www-form-urlencoded;charset=UTF-8`},
        });
        // 默认为不允许携带cookie
        this.axiosObject.defaults.withCredentials = false;
        this.parser = parser;

        // 添加返回包解析方法
        this.axiosObject.interceptors.response.use((response) => {
            let convertResponse = this.parser.parseResponse(response.data);
            if (this.afterResponseCallback) {
                this.afterResponseCallback(convertResponse);
            }
            if (Config.isDebug) {
                console.log(convertResponse);
            }
            return convertResponse;
        }, (error) => {
            console.log(error);
            return this.parser.parseResponse();
        })
    }

    /**
     * 设置是否携带cookie
     * @param value boolean true为允许携带cookie false为不允许携带cookie，默认为不允许携带cookie
     */
    set requestWithCookie(value) {
        if (value) {
            this.axiosObject.defaults.withCredentials = true;
        } else {
            this.axiosObject.defaults.withCredentials = false;
        }
    }

    /**
     * 设置通讯对象超时时间
     * @param value 超时时间  单位：毫秒
     */
    set timeout(value) {
        // 判断timeout合法性
        if (!value || value < 5 * 1000 || value > 5 * 60 * 1000) {
            value = 15 * 1000;
        }
        this.axiosObject.defaults.timeout = value;
    }

    /**
     * 请求发送前置操作
     * @param beforeRequestCallback 请求前置回调方法 参数为http的config
     */
    set beforeRequest(beforeRequestCallback) {
        this.axiosObject.interceptors.request.use((config) => {
            // 判断回调方法是不是function类型
            if (typeof (beforeRequestCallback) === 'function') {
                beforeRequestCallback(config);
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        })
    }

    /**
     * 请求返回后置操作
     * @param afterResponseCallback(response) 请求返回统一处理方法回调方法
     */
    set afterResponse(afterResponseCallback) {
        this.afterResponseCallback = afterResponseCallback;
    }

    /**
     * 通过请求包获取返回包的方法
     * @param frontend 对应前置
     * @param protocol 协议名称
     * @param params 参数名称
     * @returns {Promise<object>}
     */
    async request(frontend, protocol, params) {
        // 如果请求包为null则弹出错误信息
        if (!protocol) {
            throw new Error('协议名称不能为空');
        }
        let response;
        try {
            response = await this.axiosObject.post(frontend, this.parser.createRequest(protocol, params));
        } catch (e) {
            response = {RESULT: {RETCODE: -1, MESSAGE: '网络繁忙，请稍后再试'}};
        }

        return response;
    }

}

export default HttpCommunicate
