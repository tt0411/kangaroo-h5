<template>
  <common-layout>
      <div slot="content">
          <div class="container">
          <van-cell title="头像"  style="line-height: 55px;height: 67px;">
           <van-uploader  :after-read="uploadImg" accept="image/*" capture="camera"> 
            <template slot="default">
               <van-image width="46px" height="46px"  round :src="imgUrl[0]" @click="isPreview = true" />
            </template>
            </van-uploader>
            <van-icon slot="right-icon" name="arrow" size="16px" color="#969799" style="line-height: 50px;margin-left: 10px" @click="isPreview = true" />
          
          </van-cell>
          <van-image-preview v-model="isPreview" :images="imgUrl" />
          <van-cell title="昵称" is-link :value="nickName" to="/changeNickname"/>
          <van-cell title="性别" is-link :value="genderObj[gender]" @click="genderModal" />
          <van-cell title="账号" :value="phone" />

        </div>
        <van-dialog v-model="show" title="选择性别" show-cancel-button @confirm="pickedGender">
            <van-radio-group v-model="radio" style="padding: 20px;">
                <van-radio name="1" checked-color="#12C3DF" style="margin-bottom: 20px;">男</van-radio>
                <van-radio name="2" checked-color="#12C3DF">女</van-radio>
            </van-radio-group>
       </van-dialog>
      </div>
  </common-layout>
</template>

<script>
import {Toast} from 'vant'
export default {
    data() {
        return{
           imgUrl: ['https://img.yzcdn.cn/vant/cat.jpeg'],
           nickName: '李喋喋',
           gender: '1',
           genderObj:{
               1: '男',
               2: '女'
           },
           phone: '15188211507',
           show: false,
           radio: null, 
           isPreview: false
        }
    },
    created(){
        this.radio = this.gender
    },
    methods: {
        genderModal() {
            this.show = true;
        },
        pickedGender() {
            console.log(this.radio)
        },
       uploadImg(file) {
            this.imgUrl = []
            this.imgUrl[0] = file.content
        },
    }
}
</script>

<style lang="scss" scoped>
.container{
  background-color: #f5f5f5;
  height: calc(100vh - 40px);
    .zhanwei{
    width: 100%;
    height:10px;
  }
}
</style>