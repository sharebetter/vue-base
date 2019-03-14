import Vue from 'vue'
const dayjs = require('dayjs')
Vue.prototype.$day = dayjs

export function strUtilInit () {
    Vue.filter('mobile', function (tel) {
        return String(tel).substr(0, 3) + '****' + String(tel).substr(7, 4);
    })
    Vue.filter('moment', function (value, formatString) {
        formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
        return dayjs(value).format(formatString);
    })
    Vue.filter('name', function (name, str = '*') {
        if (!name) {
            return false;
        } else if (String(name).length === 2) {
            return String(name).substr(0, 1) + str;
        } else if (String(name).length === 3) {
            return String(name).substr(0, 1) + str + String(name).substr(name.length - 1);
        } else {
            return String(name).substr(0, 1) + str + str + String(name).substr(name.length - 1);
        }
    })
    Vue.filter('idcard', function (idcard) {
        if (!idcard) {
            return ''
        } else if (idcard.length === 15) {
            return String(idcard).substr(0, 8) + '******' + String(idcard).substr(idcard.length - 2);
        } else if (idcard.length === 18) {
            return String(idcard).substr(0, 10) + '******' + String(idcard).substr(idcard.length - 2);
        } else if (idcard.length === 16) { // 社会保障号
            return String(idcard).substr(0, 9) + '******' + String(idcard).substr(idcard.length - 2);
        }
    })
    Vue.filter('cardno', function (cardno) {
        if (!cardno) {
            return ''
        } else {
            return String(cardno).substr(0, 3) + '***' + String(cardno).substr(cardno.length - 3);
        }
    })
    Vue.filter('headpic', function (headpic) {
        if (headpic) {
            return headpic
        } else {
            //   return require('@pic/home/ic-step1.png');
            return ''
        }
    })
}
