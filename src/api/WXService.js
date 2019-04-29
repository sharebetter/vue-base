import axios from './axios.js'
import local from '../utils/localUtil.js'

/**
 * 获取微信验证信息
 * @param {*} url
 */
export const getWxSign = (wxUrl) => axios.post(`${global.env.otherService}/wechat/getWeChatConfig/${global.APPID}`, {
    url: wxUrl,
    isLoading: 'unloading'
})
/**
 * 分享埋点
 * @param {*} scene
 */
export const share = (scene) => axios.post(`${global.env.resourceService}/resource/proxy/share`, {
    uid: local.getItem('rr_uid'),
    scene: scene,
    isLoading: 'unloading'
})
