import local from '@utils/localUtil.js'
import {baseURL} from '../assets/baseUrls.js'

/**
 * 微信授权逻辑判断
 */
export function getwxAuth () {
    if (local.getItem('rr_uid')) {
        local.setItem('has_uid', true)
    } else {
        local.setItem('has_uid', false)
    }
    // getEntry()
    if (location.href.indexOf('familyId') > -1) {
        // 设置授权appid
        global.APPID = splitUtil('familyId=')
        // 设置授权回调地址
        global.redirect = `${global.base_redirect}/${global.APPID}`
        // 判断appid是否匹配，是否需要重新授权
        if (local.getItem('family_appid') !== global.APPID) {
            local.setItem('family_appid', global.APPID)
            location.href = baseURL().URL_WX
        } else if (!local.getItem('rr_uid')) { // 判断本地是否存储uid，不存在就重新授权
            location.href = baseURL().URL_WX
        } else {
            local.setItem('family_appid', global.APPID)
            return Promise.resolve(true)
        }
    } else if (location.href.indexOf('uid') > -1) { // 判断是否是授权回调
        local.setItem('rr_uid', splitUtil('uid='))
        return Promise.resolve(true)
    } else {
        if (local.getItem('family_appid')) {
            global.APPID = local.getItem('family_appid')
        }
        global.redirect = `${global.base_redirect}/${global.APPID}`
        return Promise.resolve(true)
    }
}

/**
 * 获取信息
 */
export function getwxInfo () {
    if (location.href.indexOf('uid') > -1) {
        local.setItem('rr_uid', splitUtil('uid='))
    }
    if (location.href.indexOf('familyId') > -1) {
        local.setItem('family_appid', splitUtil('familyId='))
    }
}
/**
 * 授权回调页面判断
 */
const getEntry = () => {
    if (location.href.indexOf('rr-test.jjshebao.com') > -1) {
        if (location.href.indexOf('FKIndex') > -1) {
            global.entry = 'fktest'
        } else if (location.href.indexOf('ChristmasIndex') > -1) {
            global.entry = 'christmastest'
        } else {
            global.entry = 'rrtest'
        }
    } else {
        if (location.href.indexOf('FKIndex') > -1) {
            global.entry = 'fkonline'
        } else if (location.href.indexOf('ChristmasIndex') > -1) {
            global.entry = 'christmasonline'
        } else {
            global.entry = 'rronline'
        }
    }
}

/**
 * 截取familyId
 */
const splitUtil = (str) => {
    // 截取appid
    let splits = location.href.split(str)[1]
    return splits.indexOf('&') > -1 ? splits.split('&')[0] : splits
}

