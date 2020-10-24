// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import ElementUI from 'element-ui';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import { get, post, postJson } from '@/assets/js/server.js'
import { cookie } from '@/assets/js/common.js'
import qs from 'qs';
Vue.prototype.$axios = Axios
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$postJson = postJson
Vue.prototype.$cookie = cookie
Vue.prototype.$qs = qs
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
