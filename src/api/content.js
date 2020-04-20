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
export const getMyMarkContent = (id) => request.get(`/content/getMyMarkContent?uid=${id}`)

// 获取用户收藏内容
export const getMySaveContent = (id) => request.get(`/content/getMySaveContent?uid=${id}`)

// 获取某一条内容
export const getContentById = (id) => request.get(`/content/getContentById?id=${id}`)

// 获取某一条内容的评论
export const getCommentById = (id) => request.get(`/comment/commentByCid?id=${id}`)

// 获取某一条内容的点赞
export const getMarkById = (id) => request.get(`/mark/markCountByCid?id=${id}`)

// 获取某一条内容的收藏
export const getSaveById = (id) => request.get(`/save/saveCountByCid?id=${id}`)

// 评论某一内容
export const addComment = (params) => request.post(`/comment/addComment?${stringify(params)}`)

// 点赞取消点赞
export const isMarkContent = (params) =>request.post(`/mark/isMarkContent?${stringify(params)}`)

// 收藏与取消收藏
export const isSaveContent = (params) =>request.post(`/save/isSaveContent?${stringify(params)}`)

// 判断某一内容是否标记喜欢
export const markSign = (cid) => request.get(`/mark/markSign?cid=${cid}`)

// 判断某一内容是否收藏
export const saveSign = (cid) => request.get(`/save/saveSign?cid=${cid}`)

// 获取用户内容数量
export const getcontentCountByUid = (id) => request.get(`/content/getcontentCountByUid?uid=${id}`)

// 用户获得的收藏数
export const getSaveByUid = (id) => request.get(`/save/getSaveByUid?uid=${id}`)

// 用户获得的点赞数
export const getMarkByUid = (id) => request.get(`/mark/getMarkByUid?uid=${id}`)

// 用户删除内容
export const isDelContent = (params) => request.post(`/content/isDelContent?${stringify(params)}`)

// 获取用户所有内容(分类)
export const getcontentByUid = (status) => request.get(`/content/getContentByUid?status=${status}`)

// 用户开启关闭评论
export const isCommentContent = (params) => request.get(`/content/isCommentContent?${stringify(params)}`)

