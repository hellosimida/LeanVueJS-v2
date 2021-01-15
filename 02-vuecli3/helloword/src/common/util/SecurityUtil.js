import CryptoJS from 'crypto-js'

export default {
    /**
     * CBC模式加密，用于密码加密
     */
    desCBCEncode(key, str) {
        if (str) {
            return CryptoJS.DES.encrypt(str, CryptoJS.enc.Utf8.parse(key), {
                iv: CryptoJS.enc.Utf8.parse(key),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString();
        }

        return ''
    },

    /**
     * CBC模式解密
     */
    desCBCDecode(key, str) {
        if (str) {
            return CryptoJS.DES.decrypt(str, CryptoJS.enc.Utf8.parse(key), {
                iv: CryptoJS.enc.Utf8.parse(key),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString(CryptoJS.enc.Utf8);
        }
        return ''
    },

    /**
     * ECB模式加密
     */
    desECBEncode(key, str) {
        if (str) {
            return CryptoJS.DES.encrypt(str, CryptoJS.enc.Utf8.parse(key), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }).toString();
        }

        return ''
    },

    /**
     * ECB模式解密，用于返回码解密
     */
    desECBDecode(key, str) {
        if (str) {
            return CryptoJS.DES.decrypt(str, CryptoJS.enc.Utf8.parse(key), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }).toString(CryptoJS.enc.Utf8);
        }
        return ''
    },
}
