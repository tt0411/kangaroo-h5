<template>
 <div class="container">
    <header-nav :isBack="false" />
    <div class="content">
    <div class="imgList">
    <div class="imgItem"  v-for="(item, index) in imgFile" :key="index">
        <img :src="item.content">
        <van-icon name="delete" @click="delBtn(index)" class="delete"/>  
    </div>
    <div>
    <van-uploader v-show="imgFile.length < 9" capture="camera" accept="image/*" :after-read="afterRead"></van-uploader>
    </div>
   </div> 
   <div style="text-align: center">
    <van-button type="info" @click="submitData">提交</van-button>
   </div>
   </div>
</div>

</template>

<script>
import axios from "axios"
export default {
      data(){
          return {
            imgFile: [],
            backImgList: [],
            imageUrl: [],
            token: {},
            //这是根据你创建空间时所选择的地区
            domain: 'https://up-z2.qiniup.com',
            // 这是七牛云空间的外链默认域名
            qiniuaddr: 'pyku15h15.bkt.clouddn.com'
          }
      },
      methods: { 
        afterRead(file, detail) {
            this.imgFile.push(file)  
         },
         submitData(){
             let formData = new FormData();  // 为上传文件定义一个formData对象
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                if(this.imgFile.length > 0) {
                    this.imgFile.forEach( (item, index) => {
                    const keyname = Date.parse(new Date()) + Math.floor(Math.random() * 100) + '.png' 
                    axios.get('http://localhost:3001/qiniu/uploadToken').then(res => {
                        const formdata = new FormData()
                        formdata.append('file', this.imgFile[index].file)
                        formdata.append('token', res.data.token)
                        formdata.append('key', keyname)
                        // 获取到凭证之后再将文件上传到七牛云空间
                        axios.post(this.domain, formdata, config).then(res => {
                        let imageUrl = 'http://' + this.qiniuaddr + '/' + res.data.key
                        this.backImgList.push(imageUrl)
                        if(this.backImgList.length > 1) {
                            this.imageUrl = this.backImgList.join(',')
                        }else{
                            this.imageUrl = this.backImgList
                        }
                        })
                    })
                })  
            }
         },
         delBtn(index){
            if(isNaN(index) || index >= this.imgFile.length){
                return false;
            }
            let tmp = [];
            for(let i = 0; i < this.imgFile.length; i++){
                if(this.imgFile[i] !== this.imgFile[index]){
                tmp.push(this.imgFile[i]);
                }
            }
            this.imgFile = tmp;
         }
      }
}
</script>

<style lang="scss"scoped>
 .content{
     padding: 10px;
     .imgList{
         display: flex;
         flex-direction: row;
         flex-wrap: wrap;
         
        //  align-items: center;
         .imgItem{
            img{
             width: 100px;
             height: 100px;
             margin:5px;
          }
          .delete{
              margin-left: -15px;
          }
         } 
     }
 }
</style>