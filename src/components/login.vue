<template>
  <div class="login-content">
    <div class="header-row">
      <img
        src="../assets/image/logo.png"
        alt=""
      >
      <span class="header">中国xxxx国际工程有限公司国际项目报价系统</span>
    </div>
    <div>
      <div class="login-wrapper">
        <ul>
          <li>
            <el-input
              size="small"
              v-model="loginForm.account"
              placeholder="请输入用户名"
            ></el-input>
          </li>
          <li>
            <el-input
              size="small"
              v-model="loginForm.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </li>
        </ul>
        <div class="login-btn">
          <el-button
            type="primary"
            size="middle"
            @click="login"
          >登录</el-button>
        </div>
      </div>
    </div>
    <div
      class="verification"
      v-show="isShowCode"
    >
      <p>拖动下方滑块完成拼图 <span
          @click="isShowCode = false"
          class="verificationClose"
        >x</span></p>
      <div class="bobox">
        <img
          :src="'data:image/png;base64,'+bigUrl"
          alt=""
        >
        <img
          class="samll"
          :src="'data:image/png;base64,'+samilUrl"
          alt=""
        >
        <img
          @click="refresh"
          class="shua"
          width="20"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAAAAXNSR0IArs4c6QAAAnRJREFUOBGVVL1rGmEcPkNvsgpKF7vo0Mng1EDHQqfeUIlCqYs43NjN/gNKEUqGgmuQ4lInh9IubpaEQgmmqXQJ1FRI0FRbrcQPlKrX5zneN5hGzd0Pnnt/X89z79edoqwxwzBeAOqaFnsliNGOgcf2mCu6qRaPxw8mk8kPuO+Beyta16dBVIFngIFOQ1XVSS6XKyP8DbwCbq9XWKii+QlQb7Vah6lUao+CEj6fr1WtVvdRbwBxwLFAve6i4flsNmtomlaVIsvGbDb7Eb2019dVRAbFl+Px+HsgEGhQxOVyXeTz+fKioOUZQmx7Op2eeTyeHgV4EPP5/BenwNjWHoJzCzhNJpOfSNZ1/TPic2ALWDzlDwhvPmU0xXq93jeKud3uC8zsJ3L3ESsYafbuIQhv0+m0eZqFQqGM+A3FaPDtfykgnQSDwTr5nU7nCPFDU83iA/0acCagcRZDp9M5oKA4iDsWtcw2CvEQE4nEAX0K9nFF+hSkD1j+CthLDrnYf3L7GwiauHttvm44HPIObtK3aJuCo/j9fmo0KViJxWIUUkql0jkGnb5F0wVHERoVrvNpu90+hIB5bXDBT5F7dJMge9jLq0YuNahFQf5ZauFw+IiFaDT6BTE//pWirLGHveSQi7gGqOZE4ETwz6t7vd4/UlTMdBe1BwA3n6C/y5oUI4dc5COmmHwgsdPtdr9KUS6lWCyWR6MRvxTzBAeDwTFzcpnsJYdcqXM5IrnBAt8ml4+i+XNYNrJHzGyH3Euh/x0UI0CNm5zJZPZCodAJ7ylBnzlxANyzq8uE2NI/Lhq5udsCWxjvArQmUAHeEQ6H4y/GK/YPrFpUuPi3q+UAAAAASUVORK5CYII="
          alt=""
        >
      </div>
      <div class="switch">
        <div class="switchValue">
          <span
            @mousedown="startMove"
            class="switchButton"
          >|&nbsp;&nbsp;|&nbsp;&nbsp;|</span>
        </div>
      </div>
    </div>
    <div class="hornsun">系统开发：北京xxx信息科技有限公司
      &nbsp; &nbsp; &nbsp;
      技术支持电话：xxxxxxx</div>
  </div>
</template>

<script type="text/ecmascript-6">
import $ from '../assets/js/jquery-vender'
import { JSEncrypt } from 'jsencrypt'
import { secretKey } from '../assets/js/common.js'
import { mapMutations } from 'vuex'
import { formatUrl } from '../assets/js/utils'
export default {
  data () {
    return {
      formLabelWidth: '120px',
      dialogChange: false,
      dialogForm: false,
      dialogChangeForm: {},
      loginForm: { account: '', password: '' },
      samilUrl: '',
      bigUrl: '',
      isShowCode: false
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    startMove (event) {
      event = event || window.event
      var ln = event.pageX || event.clientX + document.body.scrollLeft
      var ll = $('.samll').eq(0).position().left
      document.onmousemove = (event) => {
        event = event || window.event
        var moveLeft = event.pageX || event.clientX + document.body.scrollLeft
        var step = moveLeft - ln + ll
        if (step < 0) {
          step = 0
        }
        if (step > 229) {
          step = 229
        }
        $('.switchButton').css({ left: step })
        $('.samll').css({ left: step })
        document.onmouseup = () => {
          document.onmousemove = null
          let encrypt = new JSEncrypt()
          encrypt.setPublicKey(secretKey)
          let encrypted = encrypt.encrypt(this.loginForm.password)
          let pwd = encodeURI(encrypted).replace(/\+/g, '%2B')
          let data = {
            account: this.loginForm.account,
            password: pwd,
            code: $('.samll').eq(0).position().left
          }
          this.$post('admin/v2/login', data).then(res => {
            if (res.status === 0) {
              this.$cookie.set('token', res.data.token)
              this.setUserInfo(res.data.token)
              this.$router.push('/home')
            } else {
              this.$message.error(res.error.message)
            }
          })
          document.onmouseup = null
        }
      }
      // 计算鼠标指针的x轴距离
    },
    enter (event) {
      // console.log(event.keyCode)
      if (event.keyCode === 13) {
        this.login()
      }
    },
    ...mapMutations({
      setUserInfo: 'SET_USER_INFO'
    }),
    refresh () {
      this.$get('/admin/v2/getVerification').then(res => {
        if (res.status === 0) {
          $('.switchButton').css({ left: 0 })
          $('.samll').css({ left: 0 })
          this.bigUrl = res.data.bigImage
          this.samilUrl = res.data.smallImage
          $('.samll').eq(0).css({ top: res.data.yHeight })
        } else {
          this.$message.error(res.error.message)
        }
      }).catch(err => {
        if (err) {
          throw err
        }
      })
    },
    login () {
      // console.log(this.setUserInfo)
      if (this.loginForm.account === '' || this.loginForm.password === '') {
        this.$message.error('请您填写完整信息')
      } else {
        this.isShowCode = true
        // let encrypt = new JSEncrypt()
        // encrypt.setPublicKey(secretKey)
        // let encrypted = encrypt.encrypt(this.loginForm.password)
        // let pwd = encodeURI(encrypted).replace(/\+/g, '%2B')
        // let data = {
        //   account: this.loginForm.account,
        //   password: pwd,
        //   code: this.loginForm.code
        // }
        // this.$post('/admin/login', data).then(res => {
        //   if (res.status === 0) {
        //     if (sessionStorage.getItem('path')) {
        //       this.$router.push({ path: sessionStorage.getItem('path') })
        //     } else {
        //       this.$router.push('/home')
        //     }
        //     window.location.reload()
        //     // console.log(this.setUserInfo)
        //     this.setUserInfo(res.data)
        //   } else {
        //     if (res.error.code === 10016) {
        //       this.dialogChange = true
        //     } else {
        //       this.$message.error(res.error.message)
        //     }
        //     this.refresh()
        //   }
        // })
      }
    },
    submit () {
      let encrypt = new JSEncrypt()
      encrypt.setPublicKey(secretKey)
      let encrypted = encrypt.encrypt(this.dialogChangeForm.password)
      let pwd = encodeURI(encrypted).replace(/\+/g, '%2B')

      let encrypted1 = encrypt.encrypt(this.dialogChangeForm.againPassword)
      let againPwd = encodeURI(encrypted1).replace(/\+/g, '%2B')

      let data = {
        newPwd: pwd,
        pwdAgain: againPwd,
        account: this.loginForm.account
      }

      this.$post('/admin/updateInitPassword', data).then(res => {
        if (res.status === 0) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.dialogForm = false
          this.dialogChange = false
        } else {
          this.$message.error(res.error.message)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
// @import url("../assets/css/rewrite.scss");
.header-row {
  line-height: 60px;
  border-bottom: 1px solid #d8d8d8;
  padding: 0 20px;
  background: #ffffff;
}
.header {
  font-size: 20px;
  color: #516881;
  font-weight: 600;
}
.header-row img {
  vertical-align: middle;
}
.dialog-text {
  text-align: center;
  color: #d75656;
}
.login-wrapper {
  width: 400px;
  border-radius: 10px;
  background: rgba($color: #000000, $alpha: 0.6);
  margin: auto;
  position: absolute;
  top: 250px;
  left: 0;
  right: 0;
  padding: 40px 20px 20px 20px;
}
.login-wrapper ul li {
  margin-bottom: 20px;
}
/deep/ .login-wrapper .el-input__inner {
  width: 100% !important;
}
.login-btn {
  text-align: center;
  margin-top: 40px;
}
.login-btn .el-button {
  width: 200px;
}
.login-wrapper .code .el-input {
  width: 100px !important;
}
.img {
  height: 30px;
  width: 90px;
  vertical-align: middle;
  margin-left: 10px;
}
.login-content {
  background: url("../assets/image/login-bg.jpg");
  height: 100%;
  background-size: 100% 100%;
  min-height: 500px;
}
.verification {
  width: 280px;
  height: 200px;
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 250px auto;
}
.verification > p {
  font-size: 16px;
  height: 40px;
  padding-top: 5px;
  margin: 0;
}
.bobox {
  position: relative;
  height: 110px;
}
.samll {
  position: absolute;
  left: 0;
  top: 0;
}
.switch {
  height: 50px;
}
.switchValue {
  height: 12px;
  width: 100%;
  margin-top: 19px;
  border-radius: 5px;
  background-color: #ddd;
  position: relative;
}
.switchButton {
  position: absolute;
  display: inline-block;
  width: 50px;
  height: 28px;
  color: #fff;
  border-radius: 10px;
  background-color: #4a90e2;
  top: -9px;
  left: 0px;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
}
.verificationClose {
  float: right;
  font-size: 20px;
  cursor: pointer;
}
.shua {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
}
.hornsun {
  width: 100%;
  text-align: center;
  line-height: 50px;
  position: fixed;
  bottom: 0;
  color: #fff;
}
</style>
