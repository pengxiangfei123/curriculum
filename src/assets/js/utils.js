
/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass (ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass (ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */
export function formatTime (number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
  var returnArr = []

  var date = new Date(number)
  returnArr.push(date.getFullYear())
  returnArr.push(formatNumber(date.getMonth() + 1))
  returnArr.push(formatNumber(date.getDate()))
  returnArr.push(formatNumber(date.getHours()))
  returnArr.push(formatNumber(date.getMinutes()))
  returnArr.push(formatNumber(date.getSeconds()))

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i])
  }
  return format
}

export function getfilesize (size) {
  if (!size) {
    return ''
  } else {
    var num = 1024.00 // byte
    if (size < num) {
      return size + 'B'
    }
    if (size < Math.pow(num, 2)) {
      return (size / num).toFixed(2) + 'K' // kb
    }
    if (size < Math.pow(num, 3)) {
      return (size / Math.pow(num, 2)).toFixed(2) + 'M' // M
    }
    if (size < Math.pow(num, 4)) {
      return (size / Math.pow(num, 3)).toFixed(2) + 'G' // G
    }
    return (size / Math.pow(num, 4)).toFixed(2) + 'T' // T
  }
}

export function splitString (string){
  if(string.lastIndexOf('.')===-1){
    return string
  }
  return string.substring(0,string.lastIndexOf('.'))
}

export function formatUrl(url){
  let theRequest = {}
  if (url.indexOf("?") !== -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest
}
