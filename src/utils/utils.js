import { URL} from './config.js'
import axios from 'axios'
const CryptoJS = require("crypto-js");

export function uploadImg(data) {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const formdata = new FormData()
    formdata.append('file', data)
    formdata.append('type', 'avater')
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