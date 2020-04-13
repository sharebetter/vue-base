import {
  getWxSign,
  share
} from '@api/WXService.js'
import {
  checkVersion
} from '@utils/checkVersion.js';
/* eslint-disable */
/**
 * 微信验证
 */
export async function wxConfig() {
  // let result = await getWxSign(url);
  let url_ = location.href;
  if (checkVersion().ios) {
    url_ = global.shareURL;
  }
  let result = await getWxSign(url_);
  return new Promise((resolve) => {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: global.APPID, // 必填，公众号的唯一标识
      timestamp: result.timestamp, // 必填，生成签名的时间戳
      nonceStr: result.nonceStr, // 必填，生成签名的随机串
      signature: result.signature, // 必填，签名
      jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData', 'onMenuShareWeibo', 'chooseWXPay'] // 必填，需要使用的JS接口列表
    })
    wx.ready(function () {
      resolve()
    })
  })
}
/**
 * 微信支付
 * @param {*} WX_PUB
 */
export function wxPay(WX_PUB) {
  return new Promise((resolve) => {
    WeixinJSBridge.invoke('getBrandWCPayRequest', {
        appId: WX_PUB.appId,
        timeStamp: WX_PUB.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: WX_PUB.nonceStr, // 支付签名随机串，不长于 32 位
        package: WX_PUB.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: WX_PUB.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: WX_PUB.paySign
      },
      function (res) {
        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    )
  })
}
/**
 * 微信分享
 * @param {*} title
 * @param {*} link
 * @param {*} imgUrl
 * @param {*} desc
 */
export function wxShare(title, link, imgUrl, desc) {
  // console.log(title, link, imgUrl, desc, 'share')
  return new Promise((resolve) => {
    wx.updateTimelineShareData({
      title: title, // 分享标题
      link: encodeURI(link), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        share(scene)
        resolve(true)
      },
      fail: function () {
        resolve(false)
      }
    });
    wx.updateAppMessageShareData({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        share(scene)
        resolve(true)
      },
      cancel: function () {
        resolve(false)
      }
    });
    wx.onMenuShareWeibo({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: encodeURI(link), // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        share(scene)
        resolve(true)
      },
      cancel: function () {
        resolve(false)
      }
    });
  })
}
