// xml协议解析类

import SecurityUtil from "./SecurityUtil";
import Config from "@/Config";

class Parser {
    constructor(returnCode = {}) {
        this.codeMap = returnCode;
    }

    /**
     * 解析返回码
     * @param code 返回码
     * @param args 格式化参数
     */
    parseReturnCode(code, args = []) {
        let message;
        try {
            message = SecurityUtil.desECBDecode(Config.return_code_key, this.codeMap[code + '']);
            if (args.length > 0) {
                // 依次替换占位符
                for (let item of args) {
                    message = message.replace('%s', item);
                }
            }
        } catch (e) {
            // do nothing
        }
        if (!message) {
            message = `返回错误，返回码${code}`;
        }
        return message;

    }

}

class XMLParser extends Parser {
    constructor(returnCode = {}) {
        super(returnCode);
    }

    /**
     * 生成请求包
     * @param protocol 协议名称
     * @param params 参数
     * @return {string} 返回请求包xml
     */
    createRequest(protocol, params) {
        let req = `<?xml version="1.0" encoding="gb2312" ?><GNNT><REQ name="${protocol}">`;
        // 只有当传入参数是对象时，才解析
        if (params && typeof params === 'object') {
            for (let key in params) {
                req += `<${key}>${params[key]}</${key}>`;
            }
        }
        req += '</REQ></GNNT>';
        return req;
    }

    /**
     * 解析返回包
     * @param responseString 返回字符串
     * @param arrayTag 数组节点
     */
    parseResponse(responseString, arrayTag = 'RESULTLIST') {

        function parseNode(node) {
            // 如果是数组节点
            if (node.nodeName === arrayTag) {
                let array = [];
                for (let childNode of node.childNodes) {
                    array.push(parseNode(childNode));
                }
                return array;
            } else if (node.childElementCount > 0) {
                // 如果子项大于0
                let nodeObj = {};

                for (let childNode of node.childNodes) {
                    nodeObj[childNode.nodeName] = parseNode(childNode);
                }
                return nodeObj;
            } else {
                return node.textContent;
            }
        }

        let response = null;
        const defaultError = {RESULT: {RETCODE: '-1', MESSAGE: '网络繁忙，请稍后重试'}};
        try {
            let doc = this.xmlToDoc(responseString);
            // 获取返回包节点
            let repNode = doc.getElementsByTagName('REP')[0];
            if (!repNode) {
                console.log('response format error 1');
            }
            let temp = parseNode(repNode);
            // 如果RESULT节点与返回码节点都存在
            if (temp.RESULT && temp.RESULT.RETCODE) {
                temp.RESULT.RETCODE = parseInt(temp.RESULT.RETCODE);
                response = temp;
            }
        } catch (e) {
            console.log(e);
        }

        // 返回包不存在，则配置默认返回包
        if (!response) {
            response = defaultError
        }

        // 如果返回码不存在，则解析返回码
        if (!response.RESULT.MESSAGE) {
            response.RESULT.MESSAGE = this.parseReturnCode(response.RESULT.RETCODE);
        }
        return response;
    }

    xmlToDoc(xmlString) {
        let xmlDoc = null;
        if (window.DOMParser) {
            let parser = new DOMParser();
            xmlDoc = parser.parseFromString(xmlString, "text/xml");
        } else {
            //IE
            // eslint-disable-next-line no-undef
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(xmlString);
        }

        return xmlDoc;
    }
}

// 交易 JSON 解析器
class JSONParser extends Parser {
    constructor(returnCode = {}) {
        super(returnCode);
    }

    /**
     * 生成请求包
     * @param protocol 协议名称
     * @param params 参数
     * @return {string} 返回请求包xml
     */
    createRequest(protocol, params) {
        let request = {
            name: protocol,
            ...params
        };
        return JSON.stringify(request);
    }

    /**
     * 解析返回包
     * @param responseData 返回字符串
     */
    parseResponse(responseData) {
        let response = responseData;
        // E现货前置result节点又变成了小写 - -！
        if (response && response.result) {
            response.RESULT = response.result;
            delete response.result;
        }
        // 如果没有 RESULT 节点或没有返回码
        if (!response || !response.RESULT || !response.RESULT.RETCODE) {
            response = {RESULT: {RETCODE: '-1', MESSAGE: '网络繁忙，请稍后重试'}}
        }
        // 如果返回码不存在，则解析返回码
        if (!response.RESULT.MESSAGE) {
            let args = response.RESULT.ARGS ? response.RESULT.ARGS.split('|') : [];
            response.RESULT.MESSAGE = this.parseReturnCode(response.RESULT.RETCODE, args);
        }
        return response;
    }
}

export {XMLParser, JSONParser}
