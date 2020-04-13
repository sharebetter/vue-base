import {
  encode
} from '../utils/base64'
/**
 * 版本切换
 */
export function configInit() {
  if (location.href.indexOf('rr.jjshebao.com') > -1) {
    // 微信授权回调地址
    global.redirect = 'http://authapi.jjshebao.com/v20/wechat/redirectUrl'
    global.base_redirect = 'http://authapi.jjshebao.com/v20/wechat/redirectUrl'
    // global.APPID = 'wx0e3c9f92fa48e32a'
    global.APPID = 'wx27d40c8111f9af87'
    // 设置默认是人力资源公众号平台
    global.publicPlatform = 'human'
    // global.entry = 'ucontOnline'
    let url = ''
    if (location.href.indexOf('&uid=') > -1) {
      url = location.href.split('&uid=')[0]
    } else {
      url = location.href
    }
    global.redirectUrlBase64 = encode(url)
    global.base = 'http://rr.jjshebao.com/'
    global.env = {
      resourceService: 'http://resourceapi.jjshebao.com/apiUcont/v20',
      otherService: 'https://otherapi.jjshebao.com/v20'
    }
  } else {
    // 微信授权回调地址
    global.redirect = 'http://test-authapi.jjshebao.com/v20/wechat/redirectUrl'
    global.base_redirect = 'http://test-authapi.jjshebao.com/v20/wechat/redirectUrl'
    global.APPID = 'wx9cd70d2eb2642a40'
    // 设置默认是人力资源公众号平台
    global.publicPlatform = 'human'
    // global.entry = 'ucontTest'
    let url = ''
    if (location.href.indexOf('&uid=') > -1) {
      url = location.href.split('&uid=')[0]
    } else {
      url = location.href
    }
    global.redirectUrlBase64 = encode(url)
    global.base = 'http://rr-test.jjshebao.com/'
    global.env = {
      resourceService: 'http://test-resourceapi.jjshebao.com/apiUcont/v20',
      otherService: 'https://tst-otherapi.jjshebao.com/v20'
    }
  }
  if (location.href.indexOf('familyId') > -1) {
    // 设置授权appid
    global.APPID = splitUtil('familyId=')
  }
}

/**
 * 环境切换
 * @param {*} envs
 */
export function setENV(envs) {
  global.shareURL = location.href
  // 资源请求目录
  if (location.href.indexOf('rr.jjshebao.com') > -1) {
    global.env = envs.online
  } else {
    global.env = envs.test
  }
  // 测试连接正式环境
  global.env.resourceService = 'http://resourceapi.jjshebao.com/apiUcont/v20'
  global.env.otherService = 'https://otherapi.jjshebao.com/v20'
  global.env.contentService = 'http://contentapi.jjshebao.com/v20/'
}

/**
 * 截取familyId
 */
const splitUtil = (str) => {
  // 截取appid
  let splits = location.href.split(str)[1]
  return splits.indexOf('&') > -1 ? splits.split('&')[0] : splits
}
