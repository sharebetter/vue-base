import { decode } from '@utils/base64.js'
/**
 * 版本切换
 */
export function configInit () {
    if (location.href.indexOf('rr.jjshebao.com') > -1) {
    // 微信授权回调地址
        global.redirect = 'http://authapi.jjshebao.com/v20/wechat/backUrl'
        global.base_redirect = 'http://authapi.jjshebao.com/v20/wechat/backUrl'
        global.APPID = 'wx0e3c9f92fa48e32a'
        global.entry = 'ucontOnline'
        global.base = 'http://rr.jjshebao.com/'
        global.env = {
            resourceService: 'http://resourceapi.jjshebao.com/apiUcont/v20',
            otherService: 'https://otherapi.jjshebao.com/v20'
        }
    } else {
    // 微信授权回调地址
        global.redirect = 'http://test-authapi.jjshebao.com/v20/wechat/backUrl'
        global.base_redirect = 'http://test-authapi.jjshebao.com/v20/wechat/backUrl'
        global.APPID = 'wx9cd70d2eb2642a40'
        global.entry = 'ucontTest'
        global.base = 'http://rr-test.jjshebao.com/'
        global.env = {
            resourceService: 'http://test-resourceapi.jjshebao.com/apiUcont/v20',
            otherService: 'https://tst-otherapi.jjshebao.com/v20'
        }
    }
}

/**
 * 环境切换
 * @param {*} envs
 */
export function setENV (envs) {
    // 资源请求目录
    if (location.href.indexOf('rr.jjshebao.com') > -1) {
        // global.env = envs.online
    } else {
        // global.env = envs.test
    }
}

/**
 * 首页基础信息
 * @param {*} baseInfo
 */
export function setBaseInfo (res) {
    global.commonInfo = res
    global.nickName = decode(res.nickName)
    global.headImg = res.headImg
}
