// 配置信息
import FrameworkModule from "@/framework/FrameworkModule";

export default {
    // 是否是调试环境，打开后请求会有日志输出
    isDebug: true,
    // 网页标题
    title: '南方小麦',

    // 动态配置文件
    runtime_config: './RuntimeConfig.json',
    // 返回码文件
    return_code: './ReturnCode.json',

    // DES加解密
    des_key_code: '30220451',
    // 返回码加解密
    return_code_key: '1g6n8n8t',

    // 当前系统子模块配置，框架模块放第一位
    modules: [
        // 框架
        new FrameworkModule({
            supportLogin: false
        })
    ]
}
