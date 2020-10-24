<template>
  <div class="manage-content">
    <el-container class="el-container">
      <el-header>
        <el-row class="header-row">
          <el-col
            :span="16"
            class="header"
          >
            <img
              src="../assets/image/heard.png"
              alt=""
            >
            <span>中国xxxx国际工程有限公司国际项目报价系统</span>
          </el-col>
          <el-col
            :span="8"
            class="header-handle"
          >
            <span class="messagePosition">
              <img
                src="../assets/image/default-icon.png"
                alt=""
              >
              您好，{{userInfo.name}}</span>
            <span
              @click="logout"
              class="exit"
            ><img
                src="../assets/image/exit.png"
                alt=""
              > 退出登录</span>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside
          width="200px"
          class="nav"
        >
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item
              index="1"
              @click="routeLike('/home')"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item
              index="2"
              @click="routeLike('/setting')"
            >
              <i class="el-icon-s-shop"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main-wrapper">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.$get('/api/client/getClientShowInfo').then(res => {
        if (res.status === 0) {
          this.userInfo = res.data
        }
      }).catch(err => {
        if (err) {
          throw err
        }
      })
    },
    logout () {
      this.$confirm('您正在退出当前账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/api/client/logout').then(res => {
          this.$cookie.set('token', '')
          this.$router.push('/login')
        })
      }).catch(() => {
      })
    },
    routeLike (path) {
      this.$router.push(path)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.manage-content {
  height: 100%;
}
.el-container {
  height: 100%;
  overflow: auto;
}
.nav {
  background-color: rgb(84, 92, 100);
}
.main-wrapper {
  padding: 0;
  background: #ffffff;
  margin: 10px;
  box-shadow: 1px 2px 6px #b1b1b1;
  position: relative;
}
.el-header {
  padding: 0px;
}
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
.header > span {
  font-size: 20px;
}
.header-row img {
  vertical-align: middle;
}
.header-handle {
  text-align: right;
}
.header-handle span {
  font-size: 16px;
}
.user-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.exit {
  border-left: 1px solid #dddddd;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  margin-left: 10px;
}
.exit:hover {
  cursor: pointer;
}
.exit img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  vertical-align: text-bottom;
}
.is-active {
  background-color: rgb(67, 74, 80) !important;
}
</style>