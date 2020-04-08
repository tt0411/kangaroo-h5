import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index/index'
import Login from '@/views/login/index'
import ContentDetail from '@/views/contentDetail/index'
import Register from '@/views/register/index'
import User from '@/views/user/index'
import InputPhone from '@/views/inputPhone/index'
import ChangePwd from '@/views/changePwd/index'
import Setting from '@/views/toSetting/index'
import Info from '@/views/info/index'
import ChangeNickName from '@/views/info/changeNickname'
import Message from '@/views/message/index'
import Theme from '@/views/theme/index'
import About from '@/views/about/index'
import Search from '@/views/search/index'
import Content from '@/views/content/index'
import ThemeToContent from '@/views/themeTocontent/index'
import SearchList from '@/views/searchList/index'
import WriteContent from '@/views/writeContent/index'
import HomePage from '@/views/homePage/index'
import Addaddress from '@/views/addAddress/index'
import MyContent from '@/views/myContent/index'
import ResetPwd from '@/views/resetPwd/index'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    { path: '/', name: 'index', component: Index, meta: { title: '首页' } },
    { path: '/message', name: 'message', component: Message, meta: { title: '消息' } },
    { path: '/theme', name: 'theme', component: Theme, meta: { title: '主题' } },
    { path: '/login', name: 'login', component: Login, meta: { title: '登录' } },
    { path: '/detail', name: 'detail', component: ContentDetail, meta: { title: '袋鼠空间' } },
    { path: '/register', name: 'register', component: Register, meta: { title: '注册' } },
    { path: '/user', name: 'user', component: User },
    { path: '/inputPhone', name: 'inputPhone', component: InputPhone, meta: { title: ''} },
    { path: '/changePwd', name: 'changePwd', component: ChangePwd, meta: { title: '修改密码'} },
    { path: '/setting', name: 'setting', component: Setting, meta: { title: '设置'} },
    { path: '/info', name: 'info', component: Info, meta: { title: '个人信息'} },
    { path: '/changeNickname', name: 'changeNickname', component: ChangeNickName, meta: { title: '更改昵称'} },
    { path: '/about', name: 'about', component: About, meta: { title: '关于袋鼠空间'} },
    { path: '/search', name: 'search', component: Search, meta: { title: '搜一搜'} },
    { path: '/content', name: 'content', component: Content, meta: { title: '广场'} },
    { path: '/themeToContent', name: 'themeToContent', component: ThemeToContent, meta: { title: ''}},
    { path: '/searchList', name: 'searchList', component: SearchList, meta: { title: '搜索列表'}},
    { path: '/writeContent', name: 'writeContent', component: WriteContent, meta: { title: '写内容'}},
    { path: '/homePage', name: 'homePage', component: HomePage },
    { path: '/addAddress', name: 'addAddress', component: Addaddress },
    { path: '/myContent', name: 'myContent', component: MyContent, meta: { title: '我的内容'} },
    { path: '/resetPwd', name: 'resetPwd', component: ResetPwd, meta: { title: '修改密码'} },
  ]
})

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
    document.title = to.meta.title;
  }else{
    document.title = ''
  }
  next()
})

export default router
