import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function logined() {
  return !!sessionStorage.userid
}

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/components/About'),
      meta: {title:'简介'}
    }, {
      path: '/collect',
      component: () => import('@/components/Collect'),
      // meta: {requiresAuth: true}
      meta: {title:'人脸采集'}

    }, {
      path: '/collect-result/:userid',
      component: () => import('@/components/CollectResult'),
      meta: {title:'人脸采集'}
    }, {
      path: '/admin/groups',
      component: () => import('@/components/facelib/Groups'),
      meta: {title:'人脸库-组管理'}

    }, {
      path: '/admin/groups/:id',
      component: () => import('@/components/facelib/Users'),
      meta: {title:'人脸库-用户管理'}
    }, {
      path: '/showing',
      component: () => import('@/components/BigScreen'),
      meta: {title:'签到显示'}
    }, {
      path: '/signing',
      component: () => import('@/components/Signing'),
      meta: {title:'签到'}
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!logined()) {
      Vue.prototype.$message.warning('请先登录~')
      next({
        path: '/',
        query: {redirect: to.fullPath}//把要跳转的地址作为参数传到下一步
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
