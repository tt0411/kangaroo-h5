import Vue from 'vue'
import Router from 'vue-router'
import VantUpload from '@/views/vantUpload'
import Index from '@/views/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        title: '首页'
      }
    },
   {
    path: '/vantUpload',
    name: 'vantUpload',
    component: VantUpload,
    meta: {
      title: 'vant文件上传测试'
    }
   }
  ]
})

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
    document.title = to.meta.title;
  }else{
    document.title = '袋鼠空间';
  }
  next()
})

export default router
