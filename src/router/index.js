import Vue from 'vue'
import Router from 'vue-router'
import Upload from '@/views/vantUpload'
import Index from '@/views/index/index'
import Login from '@/views/login/index'
import ContentDetail from '@/views/contentDetail/index'
import Register from '@/views/register/index'
import User from '@/views/user/index'
import ForgetPwd from '@/views/forgetPwd/index'
import ChangePwd from '@/views/changePwd/index'
import Setting from '@/views/toSetting/index'
import Info from '@/views/info/index'
import ChangeNickName from '@/views/info/changeNickname'
import Message from '@/views/message/index'
import Theme from '@/views/theme/index'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    { path: '/', name: 'index', component: Index, meta: { title: '广场' } },
    { path: '/message', name: 'message', component: Message, meta: { title: '消息' } },
    { path: '/theme', name: 'theme', component: Theme, meta: { title: '主题' } },
    { path: '/login', name: 'login', component: Login, meta: { title: '登录' } },
    { path: '/upload', name: 'upload', component: Upload, meta: { title: '上传文件测试' } },
    { path: '/detail', name: 'detail', component: ContentDetail, meta: { title: '袋鼠空间' } },
    { path: '/register', name: 'register', component: Register, meta: { title: '注册' } },
    { path: '/user', name: 'user', component: User, meta: { title: '我的' } },
    { path: '/forgetPwd', name: 'forgetPwd', component: ForgetPwd, meta: { title: '忘记密码'} },
    { path: '/changePwd', name: 'changePwd', component: ChangePwd, meta: { title: '修改密码'} },
    { path: '/setting', name: 'setting', component: Setting, meta: { title: '设置'} },
    { path: '/info', name: 'info', component: Info, meta: { title: '个人信息'} },
    { path: '/changeNickname', name: 'changeNickname', component: ChangeNickName, meta: { title: '更改昵称'} },
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
