/**
 * Created by wujw on 17/7/23.
 */
/* eslint-disable*/
const mobileRex = /^(((13[0-9]{1})|(16[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(19[0-9]{1})|(14[0-9]{1}))+\d{8})$/; // 手机号
const codeRex = /^\d{6}$/; // 验证码
const cnReg = /^([\u4e00-\u9fa5\·]{2,6})$/; //中文名正则
const regEmail = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/; //邮箱
const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/; //15位和18位身份证号码的正则表达式
const usernameRex = /^[a-zA-Z][\da-zA-Z]{2,19}$/;
/**
 * 校验用户名 字母开头，3-20位
 * @param {*} str 
 */
export function checkUserName(str) {
  return usernameRex.test(str);
}
/**
 * 校验手机号格式
 * @param {*} str 
 */
export function checkMobile(str) {
  return mobileRex.test(str);
}
/**
 * 校验验证码位数
 * @param {*} str 
 */
export function checkCode(str) {
  return codeRex.test(str);
}
/**
 * 校验是否是中文名
 * @param {*} str 
 */
export function checkCN(str) {
  return cnReg.test(str);
}
/**
 * 密码校验大小写+数字
 * @param {*} str 
 */
export function checkPWD(str) {
  let rule1 = /\d+/;
  let rule2 = /[a-z]+/;
  let rule3 = /[A-Z]+/;
  let rule4 = /[~!@#\$%^&*\{\};,.\?\/'"]/;
  let rule5 = /^.{6,20}$/;
  let flag1 = rule1.test(str);
  let flag2 = rule2.test(str);
  let flag3 = rule3.test(str);
  let flag4 = rule4.test(str);
  let flag5 = rule5.test(str);
  if (flag1 && flag5 && (flag2 || flag3)) {
    return true;
  } else {
    return false;
  }
}
/**
 * 金钱格式化
 * @param {*} money 
 */
export function formatCash(money) {
  // 方法一
  return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  // 方法二
  // return money.split('').reverse().reduce((prev, next, index) => {
  //   return ((index % 3) ? next : (next + ',')) + prev
  // })
}

/*
 * 身份证15位编码规则：dddddd yymmdd xx p
 * dddddd：6位地区编码
 * yymmdd: 出生年(两位年)月日，如：910215
 * xx: 顺序编码，系统产生，无法确定
 * p: 性别，奇数为男，偶数为女
 *
 * 身份证18位编码规则：dddddd yyyymmdd xxx y
 * dddddd：6位地区编码
 * yyyymmdd: 出生年(四位年)月日，如：19910215
 * xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
 * y: 校验码，该位数值可通过前17位计算获得
 *
 * 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
 * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
 * 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替
 * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
 * i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置
 */
export function validateIdCard(idCard) {
  let isOK = false;
  //如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length == 18) {
      var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
      var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
      }

      var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
      var idCardLast = idCard.substring(17); //得到最后一位身份证号码

      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          isOK = true;
        } else {
        }
      } else {
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          isOK = true;
        } else {
        }
      }
    } else {
      isOK = true
    }
  }
  return isOK;
}

/**
 * 通过身份证获取东西
 * @param {*} UUserCard 
 * @param {*} type :birth,age,sex
 */
export function getIdCardInfo(UUserCard, type) {
  if (type == 'birth') {
    //获取出生日期
    birth = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
    return birth;
  }
  if (type == 'sex') {
    //获取性别
    if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
      //男
      return "男";
    } else {
      //女
      return "女";
    }
  }
  if (type == 'age') {
    //获取年龄
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
    if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
      age++;
    }
    return age;
  }
}
