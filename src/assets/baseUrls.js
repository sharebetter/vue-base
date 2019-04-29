// 协议
export function baseURL () {
    return {
    // 注册协议
        URL_PROTOCOL: 'http://rd.jjshebao.com/ycb/register_protocol.html',
        // 代理服务协议
        URL_SERVICE_PROTOCOL: 'http://rd.jjshebao.com/ycb/service_protocol.html',
        // 微信授权地址
        URL_WX: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${global.APPID}&redirect_uri=${global.redirect}?entry=${global.entry}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`,
        // 支付宝授权地址
        URL_ZFB: `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${global.ALIAPPID}&scope=auth_userinfo&redirect_uri=${global.ali_redirect}?entry=${global.entry}`
    }
}
