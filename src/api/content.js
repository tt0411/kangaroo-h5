import request from '../utils/request'
import {stringify} from 'qs'

// 创建内容
export const createContent = (params) => request.post(`/content/createContent?${stringify(params)}`)

// 获取公开主题下的内容
export const getOpencontentByTid = (tid) => request.get(`/content/getOpencontentByTid?tid=${tid}`)

// 获取我的主题下的内容
export const getMycontentByTid = (tid) => request.get(`/content/getMycontentByTid?tid=${tid}`)

// 获取公开内容
export const getAllOpenContent = (limitCount) => request.get(`/content/getAllContents?limitCount=${limitCount}`)

// 获取用户喜欢(点赞)内容
export const getMyMarkContent = () => request.get(`/content/getMyMarkContent`)

// 获取用户收藏内容
export const getMySaveContent = () => request.get(`/content/getMySaveContent`)