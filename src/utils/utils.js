import { MURL, URL} from './config.js'
import axios from 'axios'

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