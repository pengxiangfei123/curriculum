export const secretKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCaHYzhy5X1FRzC5XY+rI17rz4rj9vttZUX9r7fEuYYdgQhgtOz5XFLCo/Ed9qa2A4VFblw2Am5vNz7626vToMjSVBTgkE/1WmqL4N4mUa5Ow93Cvv36XB//287MuFxJtXAffuvdlzsdsJ2UZCcIBplcFCKHkWBZsezDiw8QZup3wIDAQAB'

var cookie = {
  set: function (key, val, time) {//设置cookie方法
    var date = new Date(); //获取当前时间
    var expiresDays = time;  //将date设置为n天以后的时间
    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
    document.cookie = key + "=" + escape(val) + ";expires=" + date.toGMTString();  //设置cookie
  },
  get: function (key) {//获取cookie方法
    /*获取cookie参数*/
    var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
    var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
    var tips;  //声明变量tips
    for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
      var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
      if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
        tips = arr[1];   //将cookie的值赋给变量tips
        break;   //终止for循环遍历
      }
    }
    return unescape(tips);
  }
}
export const defaultHeader = { 'terminal': '1', token: cookie.get('token'), Accept: '*/*' }
/**
 * 
 * @param {ztree 对应 zTree 的 treeId} treeId 
 * @param {ztree 进行异步加载的父节点 JSON 数据对象} parentNode 
 * @param {ztree 异步加载获取到的数据} responseData 
 */
const filter = function (treeId, parentNode, responseData) {
  // console.log(responseData)
  return responseData.data
}
/**
 * 
 * @param {标准的 js event 对象} event 
 * @param {对应 zTree 的 treeId} treeId 
 * @param {进行异步加载的父节点 JSON 数据对象} treeNode 
 * @param {异步获取的节点数据字符串，主要便于用户调试使用} msg 
 */
const zTreeOnAsyncSuccess = function (event, treeId, treeNode, msg) {
  let message = JSON.parse(msg)
  if (message.status === 2) {
    // window.location.href = '/login'
    var url = window.location.href
    window.location.href = 'http://114.255.150.100/portal?backUrl=' + url + '&rootUrl=/home'
  } else {
    var treeObj = $.fn.zTree.getZTreeObj(treeId)
    var nodes = treeObj.getNodes()
    if (nodes.length > 0) {
      for (var i = 0; i < nodes.length; i++) {
        treeObj.expandNode(nodes[i], true, false, false) // 默认展开第一级节点
      }
    }
    var node = treeObj.getNodeByParam('pid', '')
    treeObj.selectNode(node)
    treeObj.setting.callback.onClick(null, treeId, node) // 调用事件
  }
}

const getDateMounth = function () {
  var now = new Date() //当前日期
  var nowMonth = now.getMonth() //当前月
  var nowYear = now.getYear() //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0
  //格式化日期：yyyy-MM-dd
  function formatDate (date) {
    var myyear = date.getFullYear()
    var mymonth = date.getMonth() + 1
    var myweekday = date.getDate()
    if (mymonth < 10) {
      mymonth = '0' + mymonth
    }
    if (myweekday < 10) {
      myweekday = '0' + myweekday
    }
    return (myyear + '-' + mymonth + '-' + myweekday)
  }
  //获得本季度的开始月份
  function getQuarterStartMonth (theMonth) {
    if (!theMonth) {
      theMonth = nowMonth
    }
    var quarterStartMonth = 0
    if (theMonth < 3) {
      quarterStartMonth = 0
    }
    if (2 < theMonth && theMonth < 6) {
      quarterStartMonth = 3
    }
    if (5 < theMonth && theMonth < 9) {
      quarterStartMonth = 6
    }
    if (theMonth > 8) {
      quarterStartMonth = 9
    }
    return quarterStartMonth
  }

  function getMonthDays (theYear, theMonth) {
    var monthStartDate = new Date(theYear, theMonth, 1)
    var monthEndDate = new Date(theYear, theMonth + 1, 1)
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
    return days
  }
  //获得本季度的开始日期
  function ghGetQuarterStartDate () {
    var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1)
    return formatDate(quarterStartDate)
  }
  //或的本季度的结束日期
  function ghGetQuarterEndDate () {
    var quarterEndMonth = getQuarterStartMonth() + 2
    var quarterStartDate = new Date(nowYear, quarterEndMonth,
      getMonthDays(nowYear, quarterEndMonth))
    return formatDate(quarterStartDate)
  }
  // console.log(ghGetQuarterStartDate())
  return [ghGetQuarterStartDate(), ghGetQuarterEndDate()]
}

//四舍五入保留2位小数（不够位数，则用0替补）
const keepTwoDecimalFull = function (num) {
  var result = parseFloat(num)
  if (isNaN(result)) {
    alert('传递参数错误，请检查！')
    return false
  }
  result = Math.round(num * 100) / 100
  var s_x = result.toString()
  var pos_decimal = s_x.indexOf('.')
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.'
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += '0'
  }
  return s_x
}

export { filter, zTreeOnAsyncSuccess, cookie, getDateMounth, keepTwoDecimalFull }
