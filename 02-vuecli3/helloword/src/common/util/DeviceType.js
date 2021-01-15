// 用于判断当前环境是手机还是PC
import Config from "@/Config";

export default {
    isMobile() {
        // 如果配置了只显示PC，则始终返回false
        if (Config.onlyPC) {
            return false;
        }
        let userAgentInfo = navigator.userAgent;
        let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                return true
            }
        }
        return false;
    }
}
