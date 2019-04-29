/**
 * Created by wujw on 17/7/25.
 */
/* eslint-disable*/
export function checkVersion() {
  let ua = window.navigator.userAgent.toLowerCase();

  let version = {
    "ios": ua.indexOf("iphone") > -1,
    "android": ua.indexOf("android") > -1 || ua.indexOf("linux") > -1,
    "safari": ua.indexOf("iphone") > -1,
    "alipay": ua.indexOf("alipayclient") > -1,
    "weixin": (ua.match(/MicroMessenger/i) == 'micromessenger')
  };
  return version;
}
