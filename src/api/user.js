import request from '../utils/request'
import {stringify} from 'qs'

// 退出登录
export const logout = () => request.post('/user/logout')

// 获取个人信息
export const getInfo = () => request.get('/user/getInfo')

// 修改头像
export const updateAvater = (params) => request.put(`/user/updateAvater?${stringify(params)}`)

// 修改昵称
export const updateNickname = (params) => request.put(`/user/updateNickname?${stringify(params)}`)

// 修改性别
export const updateGender = (params) => request.put(`/user/updateGender?${stringify(params)}`)

// 修改密码
export const updatePwd = (params) => request.put(`/user/updatePwd?${stringify(params)}`)