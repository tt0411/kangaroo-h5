import { URL } from './config.js'
import axios from 'axios'
const CryptoJS = require("crypto-js");

export function uploadImg(data) {
  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const formdata = new FormData()
  formdata.append('file', data)
  formdata.append('type', 'avater')
  console.log(formdata.get('file'))
  return new Promise((resolve, reject) => {
    axios.post(`${URL}/alioss/uploadOss`, formdata, config).then(res => {
        resolve(res.data)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}


/**
 * CryptoJS解密
 */

export const decryptCode = (afterEncrypt, secretKey = 'smsCodemimashi123') => {
  return CryptoJS.DES.decrypt(afterEncrypt, CryptoJS.enc.Utf8.parse(secretKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);
}


/**  * 设置本地存储 *
 *    @param {string} name key 
 *    @param {*} value value 可以是string、obj等
 *    @param {number} cacheTime 缓存时间(ms)
 *  */
export const setStorage = (name, data, cacheTime) => {
  if (!name) return;
  const storage = {
    createdTime: new Date().getTime(),
    cacheTime,
    data,
  };
  window.localStorage.setItem(name, JSON.stringify(storage));
} 

/**   获取本地存储 
 *    如果未设置缓存时间或者在缓存时间内则返回数据 
 *    如果过期则返回 undefined 
 *   @param {string} name key 
 * */

export const getStorage = name => {
  if (!name) return;
  const storage = JSON.parse(window.localStorage.getItem(name));
  if (!storage) return;
  if (storage.cacheTime && new Date().getTime() - storage.createdTime > storage.cacheTime) {
    clearStorage(name);
    return;
  }
  return storage.data;
} 

/** * 清除本地存储 
 * * @param {string} name key 
 * */
export const clearStorage = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

