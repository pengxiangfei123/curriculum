import Vue from 'vue'
import Router from 'vue-router'
import manage from '@/components/manage'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () =>
        import('@/components/login')
    },
    {
      path: '/',
      name: 'Manage',
      component: manage,
      redirect: '/login',
      children: [
        {
          path: '/price',
          name: 'Price',
          component: () =>
            import('@/components/price')
        },
        {
          path: '/list',
          name: 'List',
          component: () =>
            import('@/components/list')
        },
        {
          path: '/setting',
          name: 'setting',
          component: () =>
            import('@/components/setting')
        }
      ]
    }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
