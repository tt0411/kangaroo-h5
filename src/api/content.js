import request from '../utils/request'
import {stringify} from 'qs'

// 创建内容
export const createContent = (params) => request.post(`/content/createContent?${stringify(params)}`)