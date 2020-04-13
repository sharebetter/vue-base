import local from '@utils/localUtil.js'
import {
  baseURL
} from '../assets/baseUrls.js'

/**
 * 微信授权逻辑判断
 */
export function getwxAuth() {
  // uid 过期时间
  if (local.getItem('auth_time') > 0) {
    let authTime = local.getItem('auth_time') + 172800000
    let nowTime = new Date().getTime()
    if (authTime < nowTime) {
      local.removeItem('auth_time')
      local.removeItem('rr_uid')
    }
  } else {
    local.removeItem('auth_time')
    local.removeItem('rr_uid')
  }
  if (location.href.indexOf('familyId') > -1) {
    // 设置授权appid
    global.APPID = splitUtil('familyId=')
    // 判断来自哪个公众号
    global.publicPlatform = global.APPID === 'wx27d40c8111f9af87' ? 'human': 'jiajia'
    // 设置授权回调地址
    global.redirect = `${global.base_redirect}/${global.APPID}`
    // 判断appid是否匹配，是否需要重新授权
    if (local.getItem('family_appid') !== global.APPID) {
      local.setItem('family_appid', global.APPID)
      location.href = baseURL().URL_WX
    } else if (location.href.indexOf('uid=') > -1) { // 判断是否是授权回调
      if (location.href.indexOf('timestamp=') > -1) {
        // 授权回来时候的服务器时间
        let timestamp = splitUtil('timestamp=')
        // 页面加载时候的服务器时间
        let serviceTimeStamp = local.getItem('service_time_stamp')
        // 判断时间差，对大于20秒的链接进行过滤
        let disTime = serviceTimeStamp - timestamp
        if (disTime <= 20000) {
          local.setItem('rr_uid', splitUtil('uid='))
          // 记录保存uid时间
          local.setItem('auth_time', new Date().getTime())
        } else {
          if (!local.getItem('rr_uid')) { // 判断本地是否存储uid，不存在就重新授权
            location.href = baseURL().URL_WX
          }
        }
      } else {
        if (!local.getItem('rr_uid')) { // 判断本地是否存储uid，不存在就重新授权
          location.href = baseURL().URL_WX
        }
      }
      return Promise.resolve(true)
    } else if (!local.getItem('rr_uid')) { // 判断本地是否存储uid，不存在就重新授权
      location.href = baseURL().URL_WX
    } else {
      local.setItem('family_appid', global.APPID)
      return Promise.resolve(true)
    }
  } else if (location.href.indexOf('uid=') > -1) { // 判断是否是授权回调
    if (location.href.indexOf('timestamp=') > -1) {
      // 授权回来时候的服务器时间
      let timestamp = splitUtil('timestamp=')
      // 页面加载时候的服务器时间
      let serviceTimeStamp = local.getItem('service_time_stamp')
      // 判断时间差，对大于20秒的链接进行过滤
      let disTime = serviceTimeStamp - timestamp
      if (disTime <= 20000) {
        local.setItem('rr_uid', splitUtil('uid='))
        // 记录保存uid 时间
        local.setItem('auth_time', new Date().getTime())
      }
    }
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
export function getwxInfo() {
  if (location.href.indexOf('uid') > -1) {
    local.setItem('rr_uid', splitUtil('uid='))
  }
  if (location.href.indexOf('familyId') > -1) {
    local.setItem('family_appid', splitUtil('familyId='))
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
