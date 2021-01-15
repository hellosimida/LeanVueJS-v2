/**
 * 定义模块接口类，由各模块自行实现
 */
export default class Module {

    /**
     * 构造方法
     * @param title 系统标题
     * @param moduleId 模块号
     * @param frontUrl 前置机地址
     * @param supportLogin 是否支持登录
     */
    constructor({title = '', moduleId = '', frontUrl = '', supportLogin = true}) {
        this.title = title;
        this.moduleId = moduleId;
        this.frontUrl = frontUrl;
        this.supportLogin = supportLogin;
    }

    /**
     * 获取PC路由配置
     * @return {any[]}
     */
    get pcRoutes() {
        return [];
    }

    /**
     * 获取手机路由配置
     * @return{any[]}
     */
    get mobileRoutes() {
        return [];
    }

    /**
     * 获取PC入口页面，一般用于框架模块重写该方法
     */
    get pcAppPage() {
        return null
    }

    /**
     * 获取手机入口页面，一般用于框架模块重写该方法
     */
    get mobileAppPage() {
        return null
    }

    /**
     * 获取当前模块store配置，
     * @return {{name: string, store: object}}
     */
    get storeOption() {
        return {
            name: '',
            store: null
        };
    }

    /**
     * 初始化模块
     * @param config 运行时配置，参考 public/RuntimeConfig
     * @param store 当前store
     * @param httpCommunicate 网络请求对象，已经配置入口路径、返回码、协议解析器
     * @return {boolean} true 初始化成功，false 初始化失败
     */
    // eslint-disable-next-line no-unused-vars
    async init(config, store, httpCommunicate) {
        return true;
    }

    /**
     * checkUser 到当前模块
     * @param userApi 用户请求api
     * @param user 当前登录的用户对象
     * @return {Promise<boolean>}
     */
    async checkUser(userApi, user) {
        const response = await userApi.checkUser({
            frontUrl: this.frontUrl,
            userId: user.userId,
            sessionId: user.sessionId,
            moduleId: user.moduleId
        })
        return response.code >= 0;
    }

}
