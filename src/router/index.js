import Vue from 'vue'
import Router from 'vue-router'
import About from '@/views/About'
import Test from '@/views/Test'
import UpLoad from '@/views/uploadImg'
import VantUpload from '@/views/vantUpload'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'about',
      // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      component: About,
      meta: {
        title: '测试about页面'
      }
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: {
        title: '接口测试页面'
      }
    },
    {
    path: '/upload',
    name: 'upload',
    component: UpLoad,
    meta: {
      title: '文件上传测试'
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
    document.title = '测试页面';
  }
  next()
})

export default router
