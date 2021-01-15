import Module from "@/common/Module";

/**
 * 定义模块初始化接口类，由各模块自行实现，集成模块时，将模块初始化对象传入 SystemInit 中即可集成模块
 */
export default class FrameworkModule extends Module {

    /**
     * 获取PC路由配置
     * @return {any}
     */
    get pcRoutes() {
        return require('./pc/Router').default;
    }

    /**
     * 获取手机路由配置
     * @return {any}
     */
    get mobileRoutes() {
        return require('./mobile/Router').default;
    }

    /**
     * 返回 PC 主页面
     */
    get pcAppPage() {
        return require('./pc/App').default;
    }

    /**
     * 返回手机主页面
     */
    get mobileAppPage() {
        return require('./mobile/App').default;
    }

}
