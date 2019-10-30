import Vue from 'vue'
import Router from 'vue-router'
import Upload from '@/views/vantUpload'
import Index from '@/views/index/index'
import Login from '@/views/login/index'
import ContentDetail from '@/views/contentDetail/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'index', component: Index, meta: { title: '首页' } },
    { path: '/login', name: 'login', component: Login, meta: { title: '登录' } },
    { path: '/upload', name: 'upload', component: Upload, meta: { title: '上传文件测试' } },
    { path: '/detail', name: 'detail', component: ContentDetail, meta: { title: '袋鼠空间' } },
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
