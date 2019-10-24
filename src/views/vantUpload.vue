<template>
 <div class="container">
    <header-nav :isBack="false" />
    <div class="content">
    <div class="imgList">
    <div>
        <van-row gutter="5">
            <van-col class="imgItem" span="8" v-for="(item, index) in imgFile" :key="index">
                  <van-image :src="item.content" style="width: 100%;height: 100px; border-top-right-radius: 50px;"></van-image> 
                  <van-icon name="clear" size="18" color="#94979b"  @click="delBtn(index)" class="delete"/>
            </van-col>  
        </van-row> 
    </div>
    <div>
    <van-uploader multiple :max-count="9" :preview-image="true" v-show="imgFile.length < 9" capture="camera" accept="image/*" :after-read="afterRead"></van-uploader>
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
          }
      },
      methods: { 
        afterRead(file, detail) {
            this.imgFile.push(file)  
         },
         submitData(){
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            if(this.imgFile.length > 0) {
                this.imgFile.forEach( (item, index) => {
                const formdata = new FormData()
                formdata.append('file', this.imgFile[index].file)
                axios.post('http://localhost:3001/alioss/uploadOss', formdata, config).then(res => {
                     if(this.imgFile.length === 1 ){
                         this.imgUrl = res.data.data
                     }else{
                         this.backImgList.push(res.data.data)
                         this.imgUrl = this.backImgList.join(',')
                      } 
                    }).catch(err => {
                    console.log(err)
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
         .imgItem{ 
             display: flex;
             flex-direction: row;
             margin: 10px 0;
           .delete{
             margin-left: -10px;
             margin-top: -10px;
             z-index: 100000;
          }
         } 
     }
 }
</style>