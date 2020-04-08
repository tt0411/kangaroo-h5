import axios from 'axios';
import {URL} from '../utils/config'
import {stringify} from 'qs'

// 登录
export function login(params) {
    return new Promise((resolve, reject) => {
        axios.post(`${URL}/user/login?${stringify(params)}`).then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
}

// 注册
export function register(params) {
    return new Promise((resolve, reject) => {
        axios.post(`${URL}/user/register?${stringify(params)}`).then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}

// 忘记密码
export function resetPwd(params) {
    return new Promise((resolve, reject) => {
        axios.put(`${URL}/user/resetPwd?${stringify(params)}`).then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

// 获取短信验证码
export function getSmsCode(params) {
    return new Promise((resolve, reject) => {
        axios.post(`${URL}/alisms/sendSmsCode?${stringify(params)}`).then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}
