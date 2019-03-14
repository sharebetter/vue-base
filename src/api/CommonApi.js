import axios from './axios.js'

/**
 * 微信验证
 * @param {*} wxUrl
 */
// export const getWxSign = (wxUrl) => axios.post(`${global.env.otherService}/wechat/getWeChatConfig/${global.APPID}`, {
//     url: wxUrl
// })

export const getConfig = () => axios.get(`http://config.jjshebao.com/api/getConfig`)

