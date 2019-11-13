import request from '../utils/request'
import {stringify} from 'qs'

// 退出登录
export const logout = () => request.post('/user/logout')

// 获取个人信息
export const getInfo = () => request.get('/user/getInfo')