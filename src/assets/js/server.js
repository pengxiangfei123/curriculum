import axios from 'axios'
axios.defaults.baseURL = '/ccecc/'
axios.defaults.headers = {
  terminal: '1',
  'Content-Type': 'application/json'
}
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

function getCookie (key) {
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
function setCookie (key, val, time) {//设置cookie方法
  var date = new Date(); //获取当前时间
  var expiresDays = time;  //将date设置为n天以后的时间
  date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
  document.cookie = key + "=" + escape(val) + ";expires=" + date.toGMTString();  //设置cookie
}
/**
 * 封装get方法
 * 以下是自己的登录页面
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, params = {}) {
  axios.defaults.headers = {
    terminal: '1',
    'Content-Type': 'application/json',
    token: getCookie('token')
  }
  return new Promise((resolve, reject) => {
    params._t = Math.floor(Math.random() * (1 - 100) + 100)
    axios
      .get(url, { params: params })
      .then(response => {
        if (response.data.status === 2) {
          this.$message.error('账号未登录,请重新登录!')
          setCookie('token', '')
          window.location.href = '/login'
        } else if (response.data.status === 5) {
          this.$message.error('此账号在其他地点登录')
          setCookie('token', '')
          window.location.href = '/login'
        } else if (response.data.status === 3) {
          this.$message.error(response.data.data)
        } else {
          resolve(response.data)
        }
      })
      .catch(err => {
        if (err.response.status === 666) {
          setCookie('token', '')
          var url = window.location.href
          window.location.href = 'http://114.255.150.100/portal?backUrl=' + url + '&rootUrl=/home'
        } else if (err.response.status === 777) {
          this.$message.error('您没有访问权限')
          setCookie('token', '')
          window.location.href = '/login'
          return false
        } else {
          reject(err)
        }
      })
  })
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function postJson (url, data) {
  axios.defaults.headers = {
    terminal: '1',
    'Content-Type': 'application/json',
    token: getCookie('token')
  }
  return new Promise((resolve, reject) => {
    // console.log(this.$qs.stringify(data, { arrayFormat: 'repeat' }))
    axios.post(url, data, { arrayFormat: 'repeat' }).then(
      response => {
        if (response.data.status === 2) {
          this.$message.error('账号未登录,请重新登录!')
          setCookie('token', '')
          window.location.href = '/login'
        } else if (response.data.status === 3) {
          this.$message.error(response.data.data)
        } else if (response.data.status === 5) {
          this.$message.error('此账号在其他地点登录')
          setCookie('token', '')
          window.location.href = '/login'
        } else {
          resolve(response.data)
        }
      },
      err => {
        if (err.response.status === 666) {
          setCookie('token', '')
          window.location.href = '/login'
        } else if (err.response.status === 777) {
          this.$message.error('您没有访问权限')
          setCookie('token', '')
          window.location.href = '/login'
          return false
        } else {
          reject(err)
        }
      }
    )
  })
}
export function post (url, data) {
  axios.defaults.headers = {
    terminal: '1',
    'Content-Type': 'application/x-www-form-urlencoded',
    token: getCookie('token')
  }
  return new Promise((resolve, reject) => {
    axios.post(url, this.$qs.stringify(data, { arrayFormat: 'repeat' })).then(
      response => {
        if (response.data.status === 2) {
          this.$message.error('账号未登录,请重新登录!')
          setCookie('token', '')
          window.location.href = '/login'
        } else if (response.data.status === 3) {
          this.$message.error(response.data.data)
        } else if (response.data.status === 5) {
          this.$message.error('此账号在其他地点登录')
          setCookie('token', '')
          window.location.href = '/login'
        } else {
          resolve(response.data)
        }
      },
      err => {
        if (err.response.status === 666) {
          setCookie('token', '')
          window.location.href = '/login'
        } else if (err.response.status === 777) {
          this.$message.error('您没有访问权限')
          setCookie('token', '')
          window.location.href = '/login'
          return false
        } else {
          reject(err)
        }
      }
    )
  })
}
