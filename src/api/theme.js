import request from '../utils/request'
import {stringify} from 'qs'

// 创建主题
export const createTheme = (params) => request.post(`/theme/createTheme?${stringify(params)}`)

// 获取用户创建的主题
export const fetchUserTheme = () => request.get(`/theme/getThemeByUid`)

// 获取公开主题
export const fetchOpenTheme = () => request.get(`/theme/getOpenTheme`)